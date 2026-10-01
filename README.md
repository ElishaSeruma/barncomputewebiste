# Barn Computing Website

Marketing site and documentation surface for Barn Computing, a Next.js App Router
site built around the real `barnCompute` Python package and its current
pre-alpha roadmap.

## Project Content

The site describes:

- `barnCompute==0.1.0a1` on TestPyPI.
- The `barn` CLI for creating a private Barn, enrolling Nodes, importing managed
  files, creating explicit shares, and fetching verified transfers.
- The M1 foundation: coordinator trust, device identity, availability,
  recipient-scoped sharing, resumable transfers, and macOS/Windows evidence.
- The M1 closure gates that still need evidence before accepted release claims.
- The M2 storage-fabric plan: BRG, NBO decisions, Bays, encrypted fragments,
  placement, location-independent retrieval, and repair.

Product, solution, blog, legal, docs, `llms.txt`, and route metadata copy lives
mostly in `src/lib/site/*` and `src/lib/docs/areas/*`.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

## Deployment

This repository is intended to deploy on Vercel from the connected GitHub
repository. Production deployments should follow a clean `npm run build` and a
pushed commit.
