CodeSnip

CodeSnip is a tiny, personal “snippet bin” for stashing small code examples and notes from daily tinkering.

Goals (MVP):
- Fast drop-in of short code snippets in various languages
- Tagging and simple search by tag or filename
- Minimal CLI with a local JSON store

This is a solo, nights-and-weekends project. Not production-ready. Expect rough edges.
CLI usage examples:

  snip add "hello" "console.log('hi')"
  snip list
  snip find hello
