import React, { useState } from 'react';
import { Copy, Download, FileText, Upload, Eye } from 'lucide-react';
import PreviewWindow from './PreviewWindow';

interface MarkdownOutputProps {
  markdown: string;
  loading: boolean;
  onCopy: () => void;
  onDownload: () => void;
  onChange: (value: string) => void;
}

export default function MarkdownOutput({
  markdown,
  loading,
  onCopy,
  onDownload,
  onChange,
}: MarkdownOutputProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="bg-white rounded shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <FileText className="mr-2" />
          Converted Markdown
        </h2>
        <div className="space-x-2">
          <button
            onClick={onCopy}
            disabled={!markdown}
            className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors disabled:opacity-50"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </button>
          <button
            onClick={() => setShowPreview(true)}
            disabled={!markdown}
            className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors disabled:opacity-50"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
          <button
            onClick={onDownload}
            disabled={!markdown}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Upload className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <textarea
          value={markdown}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-96 p-4 border rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Your converted markdown will appear here..."
        />
      )}

      {showPreview && (
        <PreviewWindow
          markdown={markdown}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
