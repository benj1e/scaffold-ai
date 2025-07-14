export interface FileNode {
    name: string;
    type: "file" | "folder";
    children?: FileNode[];
    content?: string; // Only for files
}
