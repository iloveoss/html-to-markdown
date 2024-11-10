import { createTurndownService } from './turndownConfig';

const turndownService = createTurndownService();

export const convertHtmlToMarkdown = async (file: File): Promise<string> => {
  const text = await file.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');

  // Remove script tags and their content
  doc.querySelectorAll('script').forEach(el => el.remove());

  // Remove style tags and their content
  doc.querySelectorAll('style').forEach(el => el.remove());

  // Convert inline styles to appropriate markdown
  doc.querySelectorAll('[style]').forEach(el => {
    const style = el.getAttribute('style');
    if (style?.includes('font-weight: bold') || style?.includes('font-weight:bold')) {
      el.innerHTML = `**${el.innerHTML}**`;
    }
    if (style?.includes('font-style: italic') || style?.includes('font-style:italic')) {
      el.innerHTML = `*${el.innerHTML}*`;
    }
    el.removeAttribute('style');
  });

  // Handle SVGs - convert to markdown image syntax if possible
  doc.querySelectorAll('svg').forEach(svg => {
    const svgData = `data:image/svg+xml;base64,${btoa(svg.outerHTML)}`;
    const img = doc.createElement('img');
    img.src = svgData;
    img.alt = svg.getAttribute('aria-label') || 'SVG Image';
    svg.parentNode?.replaceChild(img, svg);
  });

  // Process images - ensure they have proper alt text
  doc.querySelectorAll('img').forEach(img => {
    if (!img.alt) {
      img.alt = 'Image';
    }
  });

  return turndownService.turndown(doc.body.innerHTML);
};

export const validateHtmlFile = (file: File): boolean => {
  return !!file.name.match(/\.(html|htm|htmx)$/);
};