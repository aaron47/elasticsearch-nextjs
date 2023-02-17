import { NextApiRequest, NextApiResponse } from 'next';
import { getElasticClient } from '../../utils/elastic';

export default async function tasksSearchHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q: query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).end();
  }

  const elastic = await getElasticClient();

  // rechercher le resultat en basant sur le query parameter, pour qu'il match le nom de la task
  const result = await elastic.search({
    index: 'tasks',
    query: {
      // On utilise multi_match si on veut chercher dans plusieurs champs, ici name et description, et on mentionne aussi le tie_breaker pour donner plus de poids au nom aussi que le type de match

      // multi_match: {
      //   type: 'most_fields',
      //   tie_breaker: 0.3,
      //   query,
      //   fields: ['name', 'description'],
      // },

      // on utilise match si on veut chercher dans un seul champ (ici name)
      match: {
        description: query,
      },

      // bool: {
      //   must: [
      //     {
      //       match: {
      //         name: query,
      //       },
      //     },

      //     {
      //       match: {
      //         description: query,
      //       },
      //     },
      //   ],
      // },
    },
  });

  // retourner la list des documents trouvee
  // const tasks = result.hits.hits.map((item) => item._source);
  const tasks = result.hits.hits.map((item) => item._source);

  return res.json(tasks);
}
