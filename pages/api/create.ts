import { NextApiRequest, NextApiResponse } from 'next';
import { getElasticClient } from '../../utils/elastic';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const elastic = await getElasticClient();

  // creer une task, la fonction est applee index
  const result = await elastic.index({
    index: 'tasks',
    body: {
      name: 'Learn ElasticSearch',
      description: 'Learn ElasticSearch with Next.js',
    },
  });

  res.json({ result });
}
