## Architecture rules

- Never use axios, use native fetch for edge compatibility
- Services must be classes
- Server actions go under `services/actions/`
- shadcn components go under `components/ui/` only
- Custom hooks go under `hooks/`, never inline in components
- Types shared across features go under `types/`
- Always consider SEO, use `generateMetadata` where relevant
