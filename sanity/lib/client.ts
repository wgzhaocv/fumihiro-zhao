import { createClient } from "next-sanity";
import { cache } from "react";

import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
});

export const clientFetch = cache(client.fetch.bind(client));
