import { PrismaClient, UnitStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Projects
  const project1 = await prisma.project.upsert({
    where: { id: 'proj-griya-asri-001' },
    update: {},
    create: {
      id: 'proj-griya-asri-001',
      name: 'Perumahan Griya Asri',
      description:
        'Perumahan modern dengan konsep hijau dan asri. Dilengkapi dengan taman bermain, kolam renang, dan keamanan 24 jam.',
      location: 'Jl. Raya Bogor KM 30, Cibinong, Bogor',
      svgSiteplan: null,
    },
  });

  const project2 = await prisma.project.upsert({
    where: { id: 'proj-puri-harmoni-002' },
    update: {},
    create: {
      id: 'proj-puri-harmoni-002',
      name: 'Puri Harmoni Residence',
      description:
        'Hunian eksklusif dengan desain minimalis modern. Lokasi strategis dekat stasiun dan pusat perbelanjaan.',
      location: 'Jl. Margonda Raya No. 100, Depok',
      svgSiteplan: null,
    },
  });

  const project3 = await prisma.project.upsert({
    where: { id: 'proj-taman-sari-003' },
    update: {},
    create: {
      id: 'proj-taman-sari-003',
      name: 'Taman Sari Indah',
      description:
        'Perumahan subsidi dengan kualitas premium. Cicilan ringan mulai 1 jutaan per bulan.',
      location: 'Jl. Raya Parung, Bogor',
      svgSiteplan: null,
    },
  });

  console.log('✅ Projects created');

  // Unit types
  const unitTypes = [
    { type: 'Type 36/72', basePrice: 350000000 },
    { type: 'Type 45/84', basePrice: 450000000 },
    { type: 'Type 54/96', basePrice: 550000000 },
    { type: 'Type 70/120', basePrice: 750000000 },
  ];

  // Helper to get random status
  const getRandomStatus = (): UnitStatus => {
    const rand = Math.random();
    if (rand < 0.6) return 'AVAILABLE';
    if (rand < 0.85) return 'BOOKED';
    return 'SOLD';
  };

  // Create Units for Project 1 (Griya Asri) - Blok A, B, C
  const blocks1 = ['A', 'B', 'C'];
  for (const block of blocks1) {
    for (let i = 1; i <= 10; i++) {
      const unitType = unitTypes[Math.floor(Math.random() * unitTypes.length)];
      const blockNumber = `${block}-${i.toString().padStart(2, '0')}`;

      await prisma.unit.upsert({
        where: {
          id: `unit-${project1.id}-${blockNumber}`,
        },
        update: {},
        create: {
          id: `unit-${project1.id}-${blockNumber}`,
          projectId: project1.id,
          blockNumber,
          type: unitType.type,
          price: unitType.basePrice + Math.floor(Math.random() * 50000000),
          status: getRandomStatus(),
        },
      });
    }
  }
  console.log('✅ Units for Griya Asri created (30 units)');

  // Create Units for Project 2 (Puri Harmoni) - Blok D, E
  const blocks2 = ['D', 'E'];
  for (const block of blocks2) {
    for (let i = 1; i <= 8; i++) {
      const unitType = unitTypes[Math.floor(Math.random() * unitTypes.length)];
      const blockNumber = `${block}-${i.toString().padStart(2, '0')}`;

      await prisma.unit.upsert({
        where: {
          id: `unit-${project2.id}-${blockNumber}`,
        },
        update: {},
        create: {
          id: `unit-${project2.id}-${blockNumber}`,
          projectId: project2.id,
          blockNumber,
          type: unitType.type,
          price: unitType.basePrice + Math.floor(Math.random() * 100000000),
          status: getRandomStatus(),
        },
      });
    }
  }
  console.log('✅ Units for Puri Harmoni created (16 units)');

  // Create Units for Project 3 (Taman Sari) - Blok F, G, H
  const blocks3 = ['F', 'G', 'H'];
  for (const block of blocks3) {
    for (let i = 1; i <= 12; i++) {
      const unitType = unitTypes[0]; // Only Type 36 for subsidi
      const blockNumber = `${block}-${i.toString().padStart(2, '0')}`;

      await prisma.unit.upsert({
        where: {
          id: `unit-${project3.id}-${blockNumber}`,
        },
        update: {},
        create: {
          id: `unit-${project3.id}-${blockNumber}`,
          projectId: project3.id,
          blockNumber,
          type: unitType.type,
          price: 150000000 + Math.floor(Math.random() * 20000000),
          status: getRandomStatus(),
        },
      });
    }
  }
  console.log('✅ Units for Taman Sari created (36 units)');

  console.log('🎉 Seeding completed!');
  console.log('📊 Summary:');
  console.log('   - 3 Projects');
  console.log('   - 82 Units total');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
