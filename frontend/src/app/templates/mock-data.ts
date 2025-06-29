import { CommunityTemplate } from '@/types'; // Assuming @ is configured for src path

export const mockTemplates: CommunityTemplate[] = [
  {
    id: 'nextjs-blog-tailwind',
    title: 'Next.js Blog with Tailwind CSS',
    description: 'A simple, clean blog template built with Next.js and styled with Tailwind CSS. Perfect for getting started quickly.',
    author: 'AI Engineer',
    tags: ['Next.js', 'Tailwind CSS', 'Blog', 'Frontend'],
    frameworks: ['Next.js'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Markdown'],
    fileStructurePreview: `
├── public/
│   └── next.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── PostPreview.tsx
│   └── posts/
│       └── example-post.md
├── next.config.js
└── package.json
    `,
    usageInstructions: 'Run `npm install && npm run dev`. Create new blog posts as markdown files in the `src/posts` directory.',
    imageUrl: 'https://via.placeholder.com/400x250/0070f3/ffffff?text=Next.js+Blog', // Placeholder image
    githubUrl: 'https://github.com/vercel/next-learn/tree/main/basics/learn-starter', // Example link
    version: '1.0.0',
  },
  {
    id: 'fastapi-auth-postgres',
    title: 'FastAPI Backend with Auth & Postgres',
    description: 'A robust FastAPI backend setup including JWT authentication, SQLAlchemy for ORM, and PostgreSQL database integration.',
    author: 'Backend Pro',
    tags: ['FastAPI', 'Python', 'Backend', 'Authentication', 'PostgreSQL', 'SQLAlchemy'],
    frameworks: ['FastAPI'],
    technologies: ['Python', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'Docker'],
    fileStructurePreview: `
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── crud.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── security.py
├── tests/
├── alembic/
├── .env.example
├── Dockerfile
├── requirements.txt
└── README.md
    `,
    usageInstructions: 'Setup your .env file based on .env.example. Run `docker-compose up --build` to start the service. API documentation available at /docs.',
    imageUrl: 'https://via.placeholder.com/400x250/009688/ffffff?text=FastAPI+Backend', // Placeholder image
    version: '1.1.0',
  },
  {
    id: 'express-typescript-starter',
    title: 'Express.js TypeScript Starter',
    description: 'A basic starter project for building REST APIs with Express.js and TypeScript, including ESLint and Prettier setup.',
    author: 'Node Dev',
    tags: ['Express.js', 'Node.js', 'TypeScript', 'Backend', 'API'],
    frameworks: ['Express.js'],
    technologies: ['Node.js', 'TypeScript', 'ESLint', 'Prettier'],
    fileStructurePreview: `
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── app.ts
│   └── server.ts
├── .env
├── .eslintrc.js
├── .prettierrc.js
├── package.json
└── tsconfig.json
    `,
    usageInstructions: 'Run `npm install` then `npm run dev`. API endpoints are defined in `src/routes`.',
    imageUrl: 'https://via.placeholder.com/400x250/68A063/ffffff?text=Express+TS', // Placeholder image
    githubUrl: 'https://github.com/Microsoft/TypeScript-Node-Starter', // Example link
    version: '0.9.0',
  },
];
