import 'dotenv/config';
import { db } from './index';
import { techniques, effectivenessStats, useCases } from './schema';

async function seed() {
  console.log('Starting database seed...');

  try {
    const insertedTechniques = await db
      .insert(techniques)
      .values([
        {
          name: 'Pomodoro Technique',
          shortDescription:
            'Work in 25-minute intervals separated by short breaks.',
          fullDescription:
            'The Pomodoro Technique is a time management method that uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. This technique can help improve focus and reduce mental fatigue.',
          category: 'time-management',
        },
        {
          name: 'Spaced Repetition',
          shortDescription:
            'Review material at increasing intervals to improve retention.',
          fullDescription:
            'Spaced repetition is a learning technique that involves reviewing information at increasing intervals over time. This method leverages the spacing effect, which shows that we learn more effectively when we space out our learning.',
          category: 'memory',
        },
        {
          name: 'Feynman Technique',
          shortDescription:
            'Strengthen understanding by explaining concepts simply.',
          fullDescription:
            'The Feynman Technique is a mental model and learning method that involves explaining a concept in simple terms as if you were teaching it to a child. This process helps to identify gaps in your own understanding.',
          category: 'comprehension',
        },
        {
          name: 'Black Box Method',
          shortDescription:
            'Focus on inputs and outputs to learn a concept without getting lost in the details.',
          fullDescription:
            'In learning, the black box method is the process of understanding a concept by focusing only on its inputs and outputs, without concerning yourself with the internal complexities. This allows you to start applying the concept quickly and then learn the details later as needed.',
          category: 'comprehension',
        },
        {
          name: 'Active Recall',
          shortDescription:
            'Actively retrieve information from memory to enhance learning.',
          fullDescription:
            'Active recall, also known as retrieval practice, is a study method that involves actively stimulating your memory for a piece of information. This is more effective than passive review, where you simply re-read or listen to the material.',
          category: 'memory',
        },
        {
          name: 'Interleaving',
          shortDescription:
            'Mix different topics or subjects in a single study session to improve learning.',
          fullDescription:
            'Interleaving is a study technique that involves mixing different topics or subjects within a single study session. This is the opposite of "blocking," where you focus on one topic for an extended period. Interleaving can help you to better discriminate between different types of problems.',
          category: 'comprehension',
        },
      ])
      .returning();

    console.log(`Inserted ${insertedTechniques.length} techniques.`);

    await db.insert(effectivenessStats).values([
      {
        techniqueId: insertedTechniques[0]?.id,
        condition: 'ADHD',
        effectivenessRating: 9,
        sampleSize: 150,
        notes:
          'Effective for individuals with ADHD due to structured intervals and frequent breaks.',
      },
      {
        techniqueId: insertedTechniques[0]?.id,
        condition: 'Neurotypical',
        effectivenessRating: 8,
        sampleSize: 500,
        notes: 'Helps maintain focus and reduce burnout for most users.',
      },
    ]);

    console.log('Inserted effectiveness stats.');

    await db.insert(useCases).values([
      {
        techniqueId: insertedTechniques[0]?.id,
        scenarioTitle: 'Studying for Exams',
        description:
          'Organize study sessions into 25-minute focus periods with short breaks to improve concentration and retention.',
        recommendedFor:
          'Students who struggle with focus or become overwhelmed during long study sessions.',
      },
    ]);

    console.log('Inserted use cases.');
    console.log('Database seeding complete.');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();