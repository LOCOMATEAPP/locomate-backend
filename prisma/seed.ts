import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/password';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create roles
  const superAdminRole = await prisma.role.upsert({
    where: { name: 'SuperAdmin' },
    update: {},
    create: {
      name: 'SuperAdmin',
      description: 'Full system access',
    },
  });

  const mallAdminRole = await prisma.role.upsert({
    where: { name: 'MallAdmin' },
    update: {},
    create: {
      name: 'MallAdmin',
      description: 'Mall management access',
    },
  });

  const storeManagerRole = await prisma.role.upsert({
    where: { name: 'StoreManager' },
    update: {},
    create: {
      name: 'StoreManager',
      description: 'Store management access',
    },
  });

  // Create permissions
  const permissions = [
    { name: 'mall.create', resource: 'mall', action: 'create' },
    { name: 'mall.read', resource: 'mall', action: 'read' },
    { name: 'mall.update', resource: 'mall', action: 'update' },
    { name: 'mall.delete', resource: 'mall', action: 'delete' },
    { name: 'store.create', resource: 'store', action: 'create' },
    { name: 'store.read', resource: 'store', action: 'read' },
    { name: 'store.update', resource: 'store', action: 'update' },
    { name: 'store.delete', resource: 'store', action: 'delete' },
    { name: 'offer.create', resource: 'offer', action: 'create' },
    { name: 'offer.read', resource: 'offer', action: 'read' },
    { name: 'offer.update', resource: 'offer', action: 'update' },
    { name: 'offer.delete', resource: 'offer', action: 'delete' },
    { name: 'user.read', resource: 'user', action: 'read' },
    { name: 'user.block', resource: 'user', action: 'block' },
    { name: 'analytics.read', resource: 'analytics', action: 'read' },
  ];

  for (const perm of permissions) {
    await prisma.permission.upsert({
      where: { name: perm.name },
      update: {},
      create: perm,
    });
  }

  // Create super admin
  const hashedPassword = await hashPassword('admin123');
  await prisma.admin.upsert({
    where: { email: 'admin@locomate.com' },
    update: {},
    create: {
      email: 'admin@locomate.com',
      password: hashedPassword,
      name: 'Super Admin',
      roleId: superAdminRole.id,
    },
  });

  // Create sample mall
  const mall = await prisma.mall.create({
    data: {
      name: 'Central Plaza',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      latitude: 40.7128,
      longitude: -74.006,
      description: 'Premier shopping destination',
    },
  });

  // Create floors
  const floor1 = await prisma.floor.create({
    data: {
      mallId: mall.id,
      name: 'Ground Floor',
      floorNumber: 1,
    },
  });

  const floor2 = await prisma.floor.create({
    data: {
      mallId: mall.id,
      name: 'First Floor',
      floorNumber: 2,
    },
  });

  // Create sample stores
  await prisma.store.createMany({
    data: [
      {
        mallId: mall.id,
        floorId: floor1.id,
        name: 'Fashion Hub',
        category: 'Clothing',
        description: 'Latest fashion trends',
        coordinateX: 10.5,
        coordinateY: 20.3,
      },
      {
        mallId: mall.id,
        floorId: floor1.id,
        name: 'Tech Store',
        category: 'Electronics',
        description: 'Latest gadgets and electronics',
        coordinateX: 30.2,
        coordinateY: 15.8,
      },
      {
        mallId: mall.id,
        floorId: floor2.id,
        name: 'Food Court',
        category: 'Food',
        description: 'Variety of cuisines',
        coordinateX: 25.0,
        coordinateY: 35.5,
      },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
