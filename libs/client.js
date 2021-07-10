import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'pei-blog',
  apiKey: process.env.API_KEY,
});