import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 's0d0t3an',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-07-25',
});

async function getImages() {
  const response = await client.fetch('');
  const json = await response.json();
}
