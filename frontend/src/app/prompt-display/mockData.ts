export interface FileNode {
    id: string;
    name: string;
    type: "file" | "folder";
    children?: FileNode[];
    content?: string; // Only for files
}

export const mockFileStructure: FileNode[] = [
    {
        id: "1",
        name: "MyAwesomeProject",
        type: "folder",
        children: [
            {
                id: "2",
                name: "src",
                type: "folder",
                children: [
                    {
                        id: "3",
                        name: "app.py",
                        type: "file",
                        content: `from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)`,
                    },
                    {
                        id: "4",
                        name: "models",
                        type: "folder",
                        children: [
                            {
                                id: "5",
                                name: "user.py",
                                type: "file",
                                content: `# User model definition
class User:
    def __init__(self, id, username):
        self.id = id
        self.username = username`,
                            },
                        ],
                    },
                ],
            },
            {
                id: "6",
                name: "tests",
                type: "folder",
                children: [
                    {
                        id: "7",
                        name: "test_app.py",
                        type: "file",
                        content: `# Test cases for app.py
import unittest
# ... more test code`,
                    },
                ],
            },
            { id: "8", name: "README.md", type: "file", content: "# MyAwesomeProject\nThis is a sample project." },
            { id: "9", name: "requirements.txt", type: "file", content: "Flask==2.0.1" },
        ],
    },
];

export const findFileById = (nodes: FileNode[], id: string): FileNode | null => {
    for (const node of nodes) {
        if (node.id === id) {
            return node;
        }
        if (node.children) {
            const found = findFileById(node.children, id);
            if (found) {
                return found;
            }
        }
    }
    return null;
};
