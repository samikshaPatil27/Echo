import Opinion from './models/Opinion.js';

export async function seedOpinions() {

  const count = await Opinion.estimatedDocumentCount();
  if (count) return;            
  await Opinion.insertMany([
    { text: 'Pineapple belongs on pizza.' },
    { text: 'Cats are better than dogs.' },
    { text: 'AI will create more jobs than it destroys.' },
    { text: 'Electric cars are the future.' }
  ]);

  console.log('Seeded starter opinions');
}
