const fetch = require('node-fetch');
const { getMetadata } = require('page-metadata-parser');
const domino = require('domino');
import { Request, Response } from 'express';

/**
 * Parse url metadata
 */
export let parseUrlMetadata = (req: Request, res: Response) => {
  const metadata = parseURL(req.query.url);
  metadata
    .then(value => res.status(200).send(value))
    .catch(e => res.status(404).send(e));
};

async function parseURL(url) {
  const response = await fetch(url);
  const html = await response.text();
  const doc = domino.createWindow(html).document;
  return await getMetadata(doc, url);
}
