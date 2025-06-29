export interface CommunityTemplate {
  id: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
  frameworks: string[];
  technologies: string[];
  fileStructurePreview: string; // Could be a simple text tree or a more complex structure later
  usageInstructions: string;
  imageUrl?: string; // Optional image for the template card
  githubUrl?: string; // Optional link to a GitHub repository for the template
  version: string;
}
