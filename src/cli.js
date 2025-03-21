#!/usr/bin/env node
import { addSnippet, listSnippets, findSnippets, ensureStore } from './store.js';

const args = process.argv.slice(2);
const cmd = args[0];

await ensureStore();

async function main() {
  switch (cmd) {
    case 'add': {
      const [title, ...rest] = args.slice(1);
      const body = rest.join(' ').trim();
      if (!title || !body) {
        console.error('usage: snip add <title> <content>');
        process.exit(1);
      }
      const id = await addSnippet({ title, body, tags: [] });
      console.log(`added: ${id}`);
      break;
    }
    case 'list': {
      const all = await listSnippets();
      for (const s of all) {
        console.log(`- ${s.id} ${s.title}`);
      }
      break;
    }
    case 'find': {
      const q = args[1] || '';
      const hits = await findSnippets(q);
      for (const s of hits) console.log(`- ${s.id} ${s.title}`);
      break;
    }
    default:
      console.log('snip <add|list|find> ...');
  }
}

main();

