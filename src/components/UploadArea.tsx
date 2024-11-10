import React from 'react';
import { FileUp } from 'lucide-react';

interface UploadAreaProps {
  dragActive: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadArea({
  dragActive,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileInput,
}: UploadAreaProps) {
  return (
    <div className="bg-white rounded shadow-md p-6 mb-6">
      <div
        className={`border-2 border-dashed rounded p-8 text-center transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <input
          type="file"
          accept=".html,.htm,.htmx"
          onChange={onFileInput}
          className="hidden"
          id="fileInput"
        />
        <FileUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <label
          htmlFor="fileInput"
          className="block mb-2 text-lg font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
        >
          Drop your HTML file here or click to upload
        </label>
        <p className="text-sm text-gray-500">
          Supports .html, .htm, and .htmx files
        </p>
      </div>
    </div>
  );
}
