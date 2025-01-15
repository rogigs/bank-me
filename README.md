# Project Title

A brief description of what this project does and who it's for

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash
 DATABASE_URL=path-to-db
```

## Installation

Install project with npm

```bash
  cd frontend // or cd backend
  npm install 
```
    
## Tech Stack

**Client:** React, NextJS, SWR, React-hook-form, Zod e TailwindCSS

**Server:** Node, NestJS, Prisma, SQLite, Bull, Redis e Swagger


## Lessons Learned

- Acessibility
    - ARIA
    - Manual tests
    - Patterns

Reference: https://web.dev/learn/accessibility

- New features NextJS
    - Parallel Routes
    - Server actions
    - Intercept routes
    - Layout
    - Partial Prerendering
    - Pre fetch routes

Reference: https://nextjs.org/

- SWR
    - SWR devTools
    - Stale-While-Revalidate

Reference: https://swr.vercel.app/

- Techniques
    - Chunk
    - Streams

Reference: https://www.youtube.com/watch?v=-IpRYbL4yMk&pp=ygUUZXJpY2sgd2VuZGVsIHN0cmVhbXM%3D


## Documentation

[Documentation](https://github.com/rogigs/bank-me/wiki) _- Hire have more about brainstorm, performance, acessibility, architecture and tests._


## Run Locally

Clone the project

```bash
  git clone git@github.com:rogigs/bank-me.git
```

Go to the project directory

```bash
  cd frontend // or cd backend
```

Install dependencies

```bash
  npm install
```

Run project

```bash
  npm run dev // or npm run start 
```

Run docker

```bash
  docker-compose -f "docker-compose.yml" up -d --build
```

