import { ClientOptions } from '@elastic/elasticsearch';
import { Options } from './types/Options';

async function createElasticSearchClient(options: ClientOptions) {
  const { Client } = await import('@elastic/elasticsearch');

  return new Client(options);
}

// retourner les options pour connecter au elasticSearch sur le cloud (utiliser node pour le dev local)
function getOptions(): Options {
  return {
    node: process.env.ELASTIC_NODE,
    cloud: process.env.ELASTIC_CLOUD,
    password: process.env.ELASTIC_PASSWORD,
    username: process.env.ELASTIC_USERNAME,
  };
}

const DEFAULTS: ClientOptions = {
  node: 'http://localhost:9200',
};

// retourner le client elasticSearch
export async function getElasticClient() {
  return createElasticSearchClient(getElasticOptions());
}

// retourner les options pour connecter au elasticSearch sur le cloud (utiliser node pour le dev local)
function getElasticOptions(): ClientOptions {
  const { cloud, password, username } = getOptions();

  if (cloud) {
    if (username && password) {
      return {
        cloud: {
          id: cloud,
        },
        auth: {
          username,
          password,
        },
      };
    }
  }

  // ce branch est pour dev
  return {
    node: DEFAULTS.node,
  };
}
