// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getElasticClient } from '../../utils/elastic';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await getElasticClient();
  res.json({ client });
}
