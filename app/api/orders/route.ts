import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { OrderModel } from '@/models/Order';
import { ProductModel } from '@/models/Product';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items, paymentMethod, deliveryArea, bkashTrxId } = body;

    if (!customer?.fullName || !customer?.phone || !customer?.address) {
      return NextResponse.json(
        { success: false, error: 'Full name, phone number, and delivery address are required.' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Your cart is empty.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: { numericPrice: number; quantity: number }) =>
        sum + item.numericPrice * item.quantity,
      0
    );

    const deliveryFee = deliveryArea === 'outside_dhaka' ? 150 : 80;
    const totalAmount = subtotal + deliveryFee;

    // Generate human-friendly order reference: RM-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `RM-${new Date().getFullYear()}-${randomSuffix}`;

    const newOrder = await OrderModel.create({
      orderId,
      customer: {
        fullName: customer.fullName.trim(),
        phone: customer.phone.trim(),
        email: customer.email?.trim() || '',
        address: customer.address.trim(),
        city: customer.city?.trim() || 'Dhaka',
        deliveryArea: deliveryArea || 'inside_dhaka',
        notes: customer.notes || '',
      },
      items,
      subtotal,
      deliveryFee,
      totalAmount,
      paymentMethod: paymentMethod || 'cod',
      paymentStatus: paymentMethod === 'bkash' && bkashTrxId ? 'paid' : 'pending',
      orderStatus: 'pending',
      bkashTrxId: bkashTrxId || '',
    });

    // Optionally decrement stock in MongoDB
    for (const item of items) {
      await ProductModel.findOneAndUpdate(
        { id: item.productId },
        { $inc: { stock: -item.quantity } }
      ).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      orderId,
      order: newOrder,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to place order';
    console.error('Order creation error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');

    await connectToDatabase();

    if (orderId) {
      const order = await OrderModel.findOne({ orderId });
      if (!order) {
        return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, order });
    }

    // Default: return recent 20 orders for admin dashboard
    const orders = await OrderModel.find().sort({ createdAt: -1 }).limit(20);
    return NextResponse.json({ success: true, orders });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Database error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

