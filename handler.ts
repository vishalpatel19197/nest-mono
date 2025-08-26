import type { Handler } from 'aws-lambda';
import serverlessExpress from '@codegenie/serverless-express';
import { createNestServer } from './src/main-lambda';

let server: ReturnType<typeof serverlessExpress> | null = null;

export const handler: Handler = async (event, context) => {
  if (!server) {
    const app = await createNestServer();
    server = serverlessExpress({ app });
  }
  // Optional: helps when DB drivers keep the event loop open
  // @ts-ignore
  context.callbackWaitsForEmptyEventLoop = false;

  return server(event, context, () => {});
};
