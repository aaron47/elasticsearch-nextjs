import { NextApiRequest, NextApiResponse } from 'next';
import { getElasticClient } from '../../utils/elastic';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const elastic = await getElasticClient();

  const tasks = [
    { name: 'Task 1', description: 'Task 1 description' },
    { name: 'Task 2', description: 'Task 2 description' },
    { name: 'Task 3', description: 'Task 3 description' },
    { name: 'Task 4', description: 'Task 4 description' },
    { name: 'Task 5', description: 'Task 5 description' },
    { name: 'Task 6', description: 'Task 6 description' },
    { name: 'Task 7', description: 'Task 7 description' },
    { name: 'Task 8', description: 'Task 8 description' },
    { name: 'Task 9', description: 'Task 9 description' },
    { name: 'Task 10', description: 'Task 10 description' },
  ];

  // creer une task, la fonction est applee index, ici on a cree des dummy tasks, est on utilise map pour les traverser et creer dans la BD elastic
  const promises = tasks.map((task) => {
    return elastic.index({
      index: 'tasks',
      body: {
        name: task.name,
        description: task.description,
      },
    });
  });

  Promise.all(promises);

  res.json({ promises });
}
