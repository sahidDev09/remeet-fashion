import mongoose from 'mongoose';
import { ProductModel } from '../models/Product';
import { OrderModel } from '../models/Order';
import { products as defaultProducts } from '../lib/products';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://iamsahidofficial99_db_user:QaRzh0UpZsEClN0F@cluster0.z4znzxb.mongodb.net/remeet_fashion?retryWrites=true&w=majority';

const enrichedProducts = [
  {
    ...defaultProducts[0],
    images: [
      '/images/products/tshirt1.jpg',
      '/images/products/tshirt2.jpg',
      '/images/products/tshirt3.jpg',
    ],
    description:
      'Heavyweight 240 GSM organic cotton t-shirt engineered for extreme comfort and structure. Features reinforced twin-needle stitching, relaxed drop shoulder fit, and a ribbed crewneck collar.',
    stock: 45,
    rating: 4.9,
    numReviews: 128,
    isFeatured: true,
  },
  {
    ...defaultProducts[1],
    images: [
      '/images/products/tshirt2.jpg',
      '/images/products/tshirt1.jpg',
      '/images/products/tshirt4.jpg',
    ],
    description:
      'Washed black oversized tee tailored with an urban street silhouette. Vintage enzyme-washed finish gives it an authentic lived-in feel and ultimate softness.',
    stock: 32,
    rating: 4.8,
    numReviews: 94,
    isFeatured: true,
  },
  {
    ...defaultProducts[2],
    images: [
      '/images/products/tshirt3.jpg',
      '/images/products/tshirt5.jpg',
      '/images/products/tshirt1.jpg',
    ],
    description:
      'Limited reMeet series graphic print tee. High-density screen printed chest artwork with breathable micro-mesh cotton blend.',
    stock: 20,
    rating: 4.9,
    numReviews: 67,
    isFeatured: true,
  },
  {
    ...defaultProducts[3],
    images: [
      '/images/products/tshirt4.jpg',
      '/images/products/tshirt3.jpg',
      '/images/products/tshirt2.jpg',
    ],
    description:
      'Classic navy crewneck tee built for cold weather layering and daily wear. Pre-shrunk fabric ensures shape retention wash after wash.',
    stock: 55,
    rating: 4.7,
    numReviews: 83,
    isFeatured: false,
  },
  {
    ...defaultProducts[4],
    images: [
      '/images/products/tshirt5.jpg',
      '/images/products/tshirt1.jpg',
      '/images/products/tshirt4.jpg',
    ],
    description:
      'Heavyweight 260 GSM forest green tee crafted for outdoor adventures and high-mobility urban utility.',
    stock: 38,
    rating: 5.0,
    numReviews: 110,
    isFeatured: true,
  },
  {
    ...defaultProducts[5],
    images: [
      '/images/products/tshirt1.jpg',
      '/images/products/tshirt2.jpg',
      '/images/products/tshirt5.jpg',
    ],
    description:
      'Luxurious knitted polo classic featuring a breathable waffle texture and tailored ribbed cuffs for effortless casual sophistication.',
    stock: 25,
    rating: 4.9,
    numReviews: 76,
    isFeatured: true,
  },
  {
    ...defaultProducts[6],
    images: [
      '/images/products/tshirt3.jpg',
      '/images/products/tshirt4.jpg',
      '/images/products/tshirt1.jpg',
    ],
    description:
      'Old money cream white polo shirt. Clean placket design, subtle horn buttons, and high-twist mercerized cotton yarn.',
    stock: 18,
    rating: 5.0,
    numReviews: 92,
    isFeatured: true,
  },
  {
    ...defaultProducts[7],
    images: [
      '/images/products/tshirt4.jpg',
      '/images/products/tshirt2.jpg',
      '/images/products/tshirt5.jpg',
    ],
    description:
      'Heavy-duty thermal base layer tee in charcoal. Designed to insulate warmth in winter conditions without adding unnecessary bulk.',
    stock: 40,
    rating: 4.8,
    numReviews: 54,
    isFeatured: false,
  },
];

async function seed() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGODB_URI);
  console.log('✓ Connected');

  console.log('Seeding products...');
  for (const item of enrichedProducts) {
    await ProductModel.findOneAndUpdate({ id: item.id }, item, {
      upsert: true,
      new: true,
    });
  }
  console.log(`✓ Seeded ${enrichedProducts.length} products`);

  const orderCount = await OrderModel.countDocuments();
  if (orderCount === 0) {
    console.log('Seeding initial sample orders for dashboard...');
    const sampleOrders = [
      {
        orderId: 'RM-2026-1001',
        customer: {
          fullName: 'Tanvir Ahmed',
          phone: '+8801711223344',
          email: 'tanvir@gmail.com',
          address: 'House 42, Road 11, Banani',
          city: 'Dhaka',
          deliveryArea: 'inside_dhaka',
        },
        items: [
          {
            productId: 1,
            name: 'ESSENTIAL T-SHIRT',
            color: 'WHITE',
            size: 'L',
            price: '৳1,490',
            numericPrice: 1490,
            quantity: 2,
            image: '/images/products/tshirt1.jpg',
          },
        ],
        subtotal: 2980,
        deliveryFee: 80,
        totalAmount: 3060,
        paymentMethod: 'bkash',
        paymentStatus: 'paid',
        orderStatus: 'delivered',
        bkashTrxId: '9K28XPA8L',
      },
      {
        orderId: 'RM-2026-1002',
        customer: {
          fullName: 'Nafis Rayhan',
          phone: '+8801812345678',
          email: 'nafis.r@yahoo.com',
          address: 'GEC Circle, Nasirabad',
          city: 'Chittagong',
          deliveryArea: 'outside_dhaka',
        },
        items: [
          {
            productId: 2,
            name: 'OVERSIZED TEE',
            color: 'WASHED BLACK',
            size: 'XL',
            price: '৳1,890',
            numericPrice: 1890,
            quantity: 1,
            image: '/images/products/tshirt2.jpg',
          },
        ],
        subtotal: 1890,
        deliveryFee: 150,
        totalAmount: 2040,
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        orderStatus: 'shipped',
        trackingNumber: 'ST-889021',
      },
      {
        orderId: 'RM-2026-1003',
        customer: {
          fullName: 'Sadiya Khan',
          phone: '+8801919876543',
          email: 'sadiya.k@outlook.com',
          address: 'Sector 4, Uttara',
          city: 'Dhaka',
          deliveryArea: 'inside_dhaka',
        },
        items: [
          {
            productId: 7,
            name: 'OLD MONEY POLO',
            color: 'CREAM WHITE',
            size: 'M',
            price: '৳2,690',
            numericPrice: 2690,
            quantity: 1,
            image: '/images/products/tshirt3.jpg',
          },
        ],
        subtotal: 2690,
        deliveryFee: 80,
        totalAmount: 2770,
        paymentMethod: 'bkash',
        paymentStatus: 'paid',
        orderStatus: 'processing',
        bkashTrxId: '8N76TPL2Q',
      },
    ];

    await OrderModel.insertMany(sampleOrders);
    console.log(`✓ Seeded ${sampleOrders.length} sample orders`);
  }

  await mongoose.disconnect();
  console.log('Done! Database ready.');
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});

