from typing import List
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import select
from sqlalchemy import delete
from uuid import UUID
from app.core.database import SessionDep
from app.models.prompt import Prompt, PromptCreate, PromptRead
from app.models.node import Node
from app.utils.tree_parser import parse_generated_tree
from app.models.node import build_tree
from app.services.llm import LLMService


class DeleteNodesPayload(BaseModel):
    node_ids: List[UUID]


router = APIRouter(prefix="/generate", tags=["Generate"])

# Simulated AI Response (mock, will be replaced later)
mock_ai_structure = {
    "message": "Project generated successfully",
    "prompt_id": "e3cebb4b-4624-43a6-bdb5-664717316e84",
    "tree": [
        {
            "id": "16693273-2e8d-490e-b606-a3ac9b23ffa6",
            "name": "nextjs_fastapi_project",
            "type": "folder",
            "content": None,
            "children": [
                {
                    "id": "51e2d4f3-f906-43f4-ac2e-a424acce1ef9",
                    "name": "frontend",
                    "type": "folder",
                    "content": None,
                    "children": [
                        {
                            "id": "698934c4-f2b0-4744-9a6e-465625567cce",
                            "name": "src",
                            "type": "folder",
                            "content": None,
                            "children": [
                                {
                                    "id": "ca3eaee4-96c8-4886-9b05-d01c8dd0b388",
                                    "name": "pages",
                                    "type": "folder",
                                    "content": None,
                                    "children": [
                                        {
                                            "id": "affbec53-9915-42dc-b149-d059aade433e",
                                            "name": "api",
                                            "type": "folder",
                                            "content": None,
                                            "children": [
                                                {
                                                    "id": "b41565ab-f213-49b2-bd23-0758768f79fa",
                                                    "name": "hello.ts",
                                                    "type": "file",
                                                    "content": "import type { NextApiRequest, NextApiResponse } from 'next';\n\nexport default function handler(\n  req: NextApiRequest,\n  res: NextApiResponse<{ message: string }>\n) {\n  res.status(200).json({ message: 'Hello from Next.js API route!' });\n}",
                                                    "children": None,
                                                }
                                            ],
                                        },
                                        {
                                            "id": "a48b1106-a989-41f1-8448-b4499da0ea13",
                                            "name": "index.tsx",
                                            "type": "file",
                                            "content": "import { useEffect, useState } from 'react';\n\nexport default function Home() {\n  const [message, setMessage] = useState('');\n\n  useEffect(() => {\n    const fetchData = async () => {\n      try {\n        const response = await fetch('/api/backend');\n        const data = await response.json();\n        setMessage(data.message);\n      } catch (error) {\n        console.error('Error fetching data:', error);\n        setMessage('Failed to connect to backend');\n      }\n    };\n    fetchData();\n  }, []);\n\n  return (\n    <div>\n      <h1>Next.js + FastAPI Project</h1>\n      <p>{message}</p>\n    </div>\n  );\n}",
                                            "children": None,
                                        },
                                    ],
                                },
                                {
                                    "id": "74723384-1b2d-4aff-a4af-d93ab0da9908",
                                    "name": "styles",
                                    "type": "folder",
                                    "content": None,
                                    "children": [
                                        {
                                            "id": "e59014e0-c4ee-430e-a2b1-a5168e4a7e1a",
                                            "name": "globals.css",
                                            "type": "file",
                                            "content": "body {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n  padding: 2rem;\n}",
                                            "children": None,
                                        }
                                    ],
                                },
                                {
                                    "id": "32be77c8-47ea-4acb-ae55-fff6223fe7b3",
                                    "name": "pages",
                                    "type": "folder",
                                    "content": None,
                                    "children": [
                                        {
                                            "id": "4a011341-1235-42f8-a621-9c0e8f4cb748",
                                            "name": "_app.tsx",
                                            "type": "file",
                                            "content": "import '../styles/globals.css';\nimport type { AppProps } from 'next/app';\n\nexport default function App({ Component, pageProps }: AppProps) {\n  return <Component {...pageProps} />;\n}",
                                            "children": None,
                                        }
                                    ],
                                },
                            ],
                        },
                        {
                            "id": "107b5e83-a9db-40e9-b249-1acf0daa732d",
                            "name": "public",
                            "type": "folder",
                            "content": None,
                            "children": [
                                {
                                    "id": "9a03366a-167d-46b1-9b28-232540810e74",
                                    "name": "favicon.ico",
                                    "type": "file",
                                    "content": "",
                                    "children": None,
                                }
                            ],
                        },
                        {
                            "id": "94267dbb-d3c1-4544-8502-87128d501ecb",
                            "name": "next.config.js",
                            "type": "file",
                            "content": "/** @type {import('next').NextConfig} */\nconst nextConfig = {\n  reactStrictMode: true,\n  rewrites: async () => [\n    {\n      source: '/api/backend/:path*',\n      destination: 'http://localhost:8000/api/:path*',\n    },\n  ],\n};\n\nmodule.exports = nextConfig;",
                            "children": None,
                        },
                        {
                            "id": "ccd7e8a1-afb6-416b-8a12-81cc6e6d0fe3",
                            "name": "package.json",
                            "type": "file",
                            "content": '{\n  "name": "frontend",\n  "version": "0.1.0",\n  "private": true,\n  "scripts": {\n    "dev": "next dev",\n    "build": "next build",\n    "start": "next start",\n    "lint": "next lint"\n  },\n  "dependencies": {\n    "next": "^14.0.3",\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0"\n  },\n  "devDependencies": {\n    "@types/node": "^20.8.7",\n    "@types/react": "^18.2.33",\n    "@types/react-dom": "^18.2.14",\n    "eslint": "^8.54.0",\n    "eslint-config-next": "^14.0.3",\n    "typescript": "^5.2.2"\n  }\n}',
                            "children": None,
                        },
                        {
                            "id": "0d13bef8-e259-4608-8c45-e1da92801177",
                            "name": "tsconfig.json",
                            "type": "file",
                            "content": '{\n  "compilerOptions": {\n    "target": "es5",\n    "lib": ["dom", "dom.iterable", "esnext"],\n    "allowJs": true,\n    "skipLibCheck": true,\n    "strict": true,\n    "forceConsistentCasingInFileNames": true,\n    "noEmit": true,\n    "esModuleInterop": true,\n    "module": "esnext",\n    "moduleResolution": "node",\n    "resolveJsonModule": true,\n    "isolatedModules": true,\n    "jsx": "preserve",\n    "incremental": true,\n    "baseUrl": ".",\n    "paths": {\n      "@/*": ["src/*"]\n    }\n  },\n  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],\n  "exclude": ["node_modules"]\n}',
                            "children": None,
                        },
                    ],
                },
                {
                    "id": "4b2ee0c3-16fb-4b7c-a3e7-79a8137acb5a",
                    "name": "backend",
                    "type": "folder",
                    "content": None,
                    "children": [
                        {
                            "id": "690600e4-7ae2-4309-901a-b558c3f60276",
                            "name": "src",
                            "type": "folder",
                            "content": None,
                            "children": [
                                {
                                    "id": "35f8284f-84aa-4b4b-b72f-8fc07d6f62a7",
                                    "name": "main.py",
                                    "type": "file",
                                    "content": 'from fastapi import FastAPI\nfrom fastapi.middleware.cors import CORSMiddleware\n\napp = FastAPI()\n\n# Configure CORS\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=["http://localhost:3000"],\n    allow_credentials=True,\n    allow_methods=["*"],\n    allow_headers=["*"],\n)\n\n@app.get("/api/")\nasync def root():\n    return {"message": "Hello from FastAPI backend!"}\n\n@app.get("/api/items/{item_id}")\nasync def read_item(item_id: int, q: str = None):\n    return {"item_id": item_id, "q": q}',
                                    "children": None,
                                },
                                {
                                    "id": "f15942f4-899a-4bef-af44-166ac5bc8462",
                                    "name": "__init__.py",
                                    "type": "file",
                                    "content": "",
                                    "children": None,
                                },
                            ],
                        },
                        {
                            "id": "fe1df077-d9a1-4d12-a910-38fadc065450",
                            "name": "requirements.txt",
                            "type": "file",
                            "content": "fastapi\nuvicorn[standard]",
                            "children": None,
                        },
                        {
                            "id": "03451fef-2f6a-4df7-ab4f-c0ad25bc53d5",
                            "name": "Dockerfile",
                            "type": "file",
                            "content": 'FROM python:3.11-slim\n\nWORKDIR /app\n\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\nCOPY ./src ./src\n\nCMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]',
                            "children": None,
                        },
                    ],
                },
                {
                    "id": "bc38b62c-3973-46b1-af87-9efd013fac67",
                    "name": "docker-compose.yml",
                    "type": "file",
                    "content": 'version: "3.9"\n\nservices:\n  frontend:\n    build:\n      context: ./frontend\n    ports:\n      - "3000:3000"\n    volumes:\n      - ./frontend:/app\n      - /app/node_modules\n    environment:\n      - NODE_ENV=development\n    command: npm run dev\n\n  backend:\n    build:\n      context: ./backend\n    ports:\n      - "8000:8000"\n    volumes:\n      - ./backend:/app\n    environment:\n      - PYTHONUNBUFFERED=1',
                    "children": None,
                },
                {
                    "id": "7caab273-767f-4517-9b5c-23db7b522ecf",
                    "name": "README.md",
                    "type": "file",
                    "content": "# Next.js + FastAPI Project\n\nFull-stack application with Next.js frontend and FastAPI backend.\n\n## Development Setup\n\n### Prerequisites\n- Node.js v18+\n- Python 3.11+\n- Docker (optional)\n\n### Running with Docker\n```bash\ndocker-compose up --build\n```\n\n### Running Manually\n\n**Frontend:**\n```bash\ncd frontend\nnpm install\nnpm run dev\n```\n\n**Backend:**\n```bash\ncd backend\npip install -r requirements.txt\nuvicorn src.main:app --reload\n```\n\n## Access\n- Frontend: http://localhost:3000\n- Backend API: http://localhost:8000/api\n- Swagger Docs: http://localhost:8000/docs\n\n## Project Structure\n```\n.\n├── frontend/      # Next.js app\n├── backend/       # FastAPI app\n├── docker-compose.yml\n└── README.md\n```",
                    "children": None,
                },
                {
                    "id": "98e5baf3-8366-4f38-bd1c-ede58248b43e",
                    "name": ".gitignore",
                    "type": "file",
                    "content": "# Frontend\nfrontend/.next\nfrontend/node_modules\nfrontend/.env\n\n# Backend\nbackend/__pycache__\nbackend/.env\n\n# General\n.DS_Store\n.env\n*.log\n\n# Docker\n**/Dockerfile\n**/docker-compose.yml",
                    "children": None,
                },
            ],
        }
    ],
}


@router.post("/")
async def generate_project_structure(prompt_id: UUID, session: SessionDep):

    prompt = session.exec(select(Prompt).where(Prompt.id == prompt_id)).first()

    if not prompt:
        raise HTTPException(404, detail="Prompt not found")

    client = LLMService(prompt=prompt.content)
    try:
        ai_response = client.generate_project_structure()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error generating project structure: {str(e)}"
        )
    # Parse and save AI-generated node tree
    nodes = parse_generated_tree(await ai_response, prompt_id=prompt_id)
    session.add_all(nodes)
    session.commit()

    return {
        "message": "Project generated successfully",
        "prompt_id": str(prompt.id),
        "tree": build_tree(nodes),
    }


@router.get("/{prompt_id}")
async def get_project_structure_by_prompt_id(prompt_id: UUID, session: SessionDep):
    # Fetch all nodes linked to this prompt
    nodes = session.exec(select(Node).where(Node.prompt_id == prompt_id)).all()

    if not nodes:
        return {"message": "No structure found for this prompt"}

    return build_tree(nodes)


@router.delete("/{prompt_id}")
async def delete_project_structure_by_id(session: SessionDep, prompt_id: UUID):
    # First, get all node IDs for the given prompt_id
    node_ids = session.exec(select(Node.id).where(Node.prompt_id == prompt_id)).all()

    if node_ids:
        # Use the column object directly with in_() method
        stmt = delete(Node).where(Node.id.in_(node_ids))  # type: ignore
        session.exec(stmt)  # type: ignore
        session.commit()
        return {"message": f"Deleted {len(node_ids)} nodes."}

    return {"message": "No nodes found for the given prompt_id."}
