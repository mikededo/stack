import { createClient } from '@clickhouse/client';

import { PAGE_VIEWS_TABLE } from './db';

type Statistics = {
  bytes_read: number;
  elapsed: number;
  rows_read: number;
};

type CHResult<Data, Meta = Record<string, string>> = {
  data: Data[];
  meta: Meta[];
  rows: number;
  statistics: Statistics;
};

export const initClient = async () => {
  const client = createClient({
    password: process.env['DB_PASSOWRD'],
    url: process.env['DB_URL']
  });

  // Check if the database contains all the tables
  const row = await client.query({
    query: 'show tables from default'
  });
  const json = (await row.json()) as CHResult<{ name: string }>;
  if (!json.data || json.data.length === 0) {
    // TODO: Create the different tables
    await client.query({
      query: PAGE_VIEWS_TABLE
    });
  } else {
    console.log(
      '[Server] Fond tables',
      `[${json.data.map((t) => t.name).join(', ')}]`
    );
  }

  return client;
};
