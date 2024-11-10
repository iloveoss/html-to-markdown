import React from 'react';
import { marked } from 'marked';
import { X } from 'lucide-react';

interface PreviewWindowProps {
  markdown: string;
  onClose: () => void;
}

export default function PreviewWindow({ markdown, onClose }: PreviewWindowProps) {
  const htmlContent = marked(markdown, { breaks: true });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Markdown Preview</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div 
          className="overflow-auto flex-1 p-6 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}