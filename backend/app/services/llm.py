from typing import Dict
from app.core.settings import settings
import re, aiohttp
import json, pprint


def extract_json_from_markdown(text: str) -> dict:
    match = re.search(r"```json\s*(\{.*\})\s*```", text, re.DOTALL)
    if not match:
        raise ValueError("Could not find valid JSON block in the AI response.")
    return json.loads(match.group(1))


node_schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string", "description": "The name of the file or folder"},
        "type": {
            "type": "string",
            "enum": ["file", "folder"],
            "description": "The type of the node, either 'file' or 'folder', must be either one of these two",
        },
        "content": {
            "type": "string",
            "description": "The content of the file, if the node is a file. This field is required for files.",
        },
        "children": {
            "type": "array",
            "items": {"$ref": "#"},
            "description": "The children of the folder, if the node is a folder. This field is required for folders.",
        },
    },
    "required": ["name", "type"],
    "if": {"properties": {"type": {"const": "file"}}},
    "then": {"required": ["content"]},
    "else": {"required": ["children"]},
}


class LLMService:
    BASE_URL = "https://openrouter.ai/api/v1/chat/completions"

    def __init__(self, prompt: str):
        self.api_key = settings.OPENROUTER_API_KEY
        self.headers = {
            "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
        }
        self.prompt = prompt

    async def generate_project_structure(self) -> Dict:
        payload = {
            "model": "deepseek/deepseek-r1-0528",
            "temperature": 0.5,
            "messages": [
                {
                    "role": "system",
                    "content": r"You're an expert software architect who uses framework recommended procedure/commands. For every user request, you will extract the framework's the user has specified, use the required commands to generate the project structure, and return the result in a JSON format that represents a project file/folder tree. The JSON should be structured as follows: 'Each file should have a 'name', 'type' (file or folder), and 'content' (for files) or 'children' (for folders), and the content should be valid code depending on what the user asks for. The file names should match the content and the folder names should be descriptive. Within folders, the 'content' field should be omitted., but the children field should be present with an array of child nodes. The root node should not have a 'content' field. While for files, the 'content' field should be present with the code content.' Think clearly, go over each step completely, write the content of each file ensuring that it is valid code, and ensure that the folder structure is logical and well-organized."
                },
                {
                    "role": "user",
                    "content": self.prompt,
                },
            ],
            "response_format": {"type": "json_schema", "json_schema": node_schema},
        }

        async with aiohttp.ClientSession() as session:
            async with session.post(
                self.BASE_URL, json=payload, headers=self.headers
            ) as response:
                if response.status != 200:
                    text = await response.text()
                    raise RuntimeError(f"OpenRouter error {response.status}: {text}")

                data = await response.json()
                pprint.pprint(data, indent=4)
                raw_content = data["choices"][0]["message"]["content"]
                project_structure = extract_json_from_markdown(raw_content)
                return project_structure
