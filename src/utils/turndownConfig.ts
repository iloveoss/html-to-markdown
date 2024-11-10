import TurndownService from 'turndown';

export const createTurndownService = () => {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    emDelimiter: '*',
    strongDelimiter: '**',
    bulletListMarker: '-',
  });

  // Enhance heading conversion
  turndownService.addRule('headings', {
    filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    replacement: (content, node) => {
      const level = Number(node.nodeName.charAt(1));
      const hashes = '#'.repeat(level);
      return `\n\n${hashes} ${content}\n\n`;
    }
  });

  // Better handling of code blocks
  turndownService.addRule('codeBlocks', {
    filter: ['pre'],
    replacement: (content) => `\n\`\`\`\n${content}\n\`\`\`\n`
  });

  // Improve list handling
  turndownService.addRule('lists', {
    filter: ['ul', 'ol'],
    replacement: (content, node) => {
      const isOrdered = node.nodeName === 'OL';
      const delimiter = isOrdered ? '1. ' : '- ';
      return `\n\n${content.trim().split('\n').map(line => `${delimiter}${line}`).join('\n')}\n\n`;
    }
  });

  return turndownService;
};