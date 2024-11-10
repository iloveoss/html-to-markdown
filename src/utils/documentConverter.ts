import mammoth from 'mammoth';
import { createTurndownService } from './turndownConfig';

const turndownService = createTurndownService();

export const convertDocToMarkdown = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  
  const options = {
    styleMap: [
      "p[style-name='Title'] => h1:fresh",
      "p[style-name='Heading 1'] => h1:fresh",
      "p[style-name='Heading 2'] => h2:fresh",
      "p[style-name='Heading 3'] => h3:fresh",
      "p[style-name='Heading 4'] => h4:fresh",
      "p[style-name='Heading 5'] => h5:fresh",
      "p[style-name='Heading 6'] => h6:fresh",
      "p[style-name='Quote'] => blockquote:fresh",
      "r[style-name='Strong'] => strong",
      "r[style-name='Emphasis'] => em",
      "p[style-name='Code'] => pre:fresh",
    ]
  };

  const result = await mammoth.convertToHtml({ arrayBuffer }, options);
  return turndownService.turndown(result.value);
};

export const validateDocFile = (file: File): boolean => {
  return !!file.name.match(/\.(doc|docx)$/);
};