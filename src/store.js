import { promises as fs } from 'fs';
import path from 'path';
import { simpleMatch } from './search.js';

const DATA_DIR = path.join(process.cwd(), '.codesnip'); // simple local dir for now
const DATA_FILE = path.join(DATA_DIR, 'snippets.json');

export async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ seq: 0, items: [] }, null, 2));
  }
}

export async function addSnippet({ title, body, tags = [] }) {
  const db = await read();
  const id = ++db.seq;
  db.items.push({ id, title, body, tags, createdAt: new Date().toISOString() });
  await write(db);
  return id;
}

export async function listSnippets() {
  return (await read()).items;
}

export async function findSnippets(q) {
  q = q.toLowerCase();
  const { items } = await read();
  return items.filter(s =>
    simpleMatch(q, s.title) ||
    simpleMatch(q, s.body) ||
    (s.tags || []).some(t => simpleMatch(q, t))
  );
}

async function read() {
  const raw = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(raw);
}

async function write(db) {
  await fs.writeFile(DATA_FILE, JSON.stringify(db, null, 2));
}
