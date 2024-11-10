import React, { useState, useCallback } from 'react';
import { convertHtmlToMarkdown, validateHtmlFile } from '../utils/htmlConverter';
import UploadArea from './UploadArea';
import MarkdownOutput from './MarkdownOutput';

export default function Converter() {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file: File) => {
    if (!validateHtmlFile(file)) {
      alert('Please upload only .html, .htm, or .htmx files');
      return;
    }

    setLoading(true);
    try {
      const markdown = await convertHtmlToMarkdown(file);
      setMarkdown(markdown);
    } catch (error) {
      console.error('Error converting file:', error);
      alert('Error converting file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      alert('Copied to clipboard!');
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">HTML to Markdown Converter</h1>
          <p className="text-gray-600">Convert your HTML files to clean Markdown format</p>
        </div>

        <UploadArea
          dragActive={dragActive}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onFileInput={handleFileInput}
        />

        <MarkdownOutput
          markdown={markdown}
          loading={loading}
          onCopy={copyToClipboard}
          onDownload={downloadMarkdown}
          onChange={setMarkdown}
        />
      </div>
    </div>
  );
}