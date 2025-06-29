import React from 'react';
import Navbar from '@/app/components/Navbar'; // Assuming @ is path alias for ./src
import TemplateCard from '@/app/components/TemplateCard'; // Import the TemplateCard component
import { mockTemplates } from './mock-data'; // Import the mock data

const TemplatesPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-geist">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-400">
          Community Templates
        </h1>
        <p className="text-lg text-gray-300 mb-12 text-center">
          Browse and use templates shared by the Scafold AI community.
        </p>
        {/* Template cards will be rendered here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </main>
      <footer className="py-8 bg-gray-900/50 text-center text-gray-500 mt-12">
        <p>
          &copy; {new Date().getFullYear()} Scafold AI. All rights
          reserved.
        </p>
        {/* Consider adding social links or other footer content here, similar to the main page */}
      </footer>
    </div>
  );
};

export default TemplatesPage;
