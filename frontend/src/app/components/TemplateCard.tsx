import React from 'react';
import { CommunityTemplate } from '@/types'; // Assuming @ is configured for src path
import { ExternalLink, Briefcase, Users, Tag, Palette, FileText, Terminal } from 'lucide-react'; // Example icons

interface TemplateCardProps {
  template: CommunityTemplate;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-md shadow-xl rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-purple-500/30 duration-300 ease-in-out h-full flex flex-col">
      {template.imageUrl && (
        <img
          src={template.imageUrl}
          alt={`${template.title} preview`}
          className="w-full h-48 object-cover"
          onError={(e) => {
            // Fallback if image fails to load, e.g., hide or show placeholder
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      )}
      {!template.imageUrl && (
        <div className="w-full h-48 bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
          <FileText size={48} className="text-white opacity-50" />
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold mb-2 text-purple-300">{template.title}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{template.description}</p>

        <div className="mb-4">
          <div className="flex items-center text-xs text-gray-500 mb-1">
            <Users size={14} className="mr-2 text-purple-400" />
            <span>Author: {template.author} (v{template.version})</span>
          </div>
          {template.githubUrl && (
            <a
              href={template.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center transition-colors"
            >
              <ExternalLink size={14} className="mr-1" />
              View on GitHub
            </a>
          )}
        </div>

        <div className="mb-4">
          {template.frameworks && template.frameworks.length > 0 && (
            <div className="flex items-center text-xs text-gray-400 mb-1">
              <Briefcase size={14} className="mr-2 text-purple-400" />
              Frameworks: {template.frameworks.join(', ')}
            </div>
          )}
          {template.technologies && template.technologies.length > 0 && (
             <div className="flex items-center text-xs text-gray-400">
               <Palette size={14} className="mr-2 text-purple-400" />
               <span>Technologies: {template.technologies.join(', ')}</span>
             </div>
          )}
        </div>

        {template.tags && template.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center text-xs text-gray-500 mb-1">
                <Tag size={14} className="mr-2 text-purple-400" />
                Tags:
            </div>
            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-700 text-purple-300 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-gray-800/30 border-t border-gray-700/50">
        {/* Placeholder for action button, e.g., "Use Template" or "View Details" */}
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-150 flex items-center justify-center">
          <Terminal size={16} className="mr-2" />
          Use Template
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
