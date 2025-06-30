from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.database import init_db
from app.core.settings import settings
from app.core.logger import setup_logger
from app.api.routes import prompt, file_structure

# setup_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    lifespan=lifespan,
    version=settings.VERSION,
    debug=settings.DEBUG,
    title="Scaffold AI Backend API",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to restrict origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prompt.router)
app.include_router(file_structure.router)

@app.get("/")
async def hello_world():
    return {"message": "Hello World"}
