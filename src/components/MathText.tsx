import React from 'react';
import katex from 'katex';

interface MathTextProps {
  children: string;
  className?: string;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4';
}

/**
 * Parses a string containing LaTeX inline ($...$) and block ($$...$$) math expressions
 * and renders them safely using KaTeX with fallback.
 */
export const MathText: React.FC<MathTextProps> = ({
  children,
  className = '',
  as = 'span',
}) => {
  if (!children) return null;

  // Split by block math first: $$...$$
  const parts: React.ReactNode[] = [];
  const blockRegex = /\$\$([\s\S]*?)\$\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const textToProcess = children;

  while ((match = blockRegex.exec(textToProcess)) !== null) {
    const beforeBlock = textToProcess.substring(lastIndex, match.index);
    if (beforeBlock) {
      parts.push(...parseInlineMath(beforeBlock, `inline-${lastIndex}`));
    }

    const mathContent = match[1].trim();
    let renderedHtml = '';
    try {
      renderedHtml = katex.renderToString(mathContent, {
        displayMode: true,
        throwOnError: false,
      });
    } catch {
      renderedHtml = `<span class="text-rose-600 font-mono">[Formula error: ${escapeHtml(mathContent)}]</span>`;
    }

    parts.push(
      <span
        key={`block-${match.index}`}
        className="block my-2 overflow-x-auto text-center"
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    );

    lastIndex = match.index + match[0].length;
  }

  const remaining = textToProcess.substring(lastIndex);
  if (remaining) {
    parts.push(...parseInlineMath(remaining, `tail-${lastIndex}`));
  }

  const Component = as;
  return <Component className={className}>{parts}</Component>;
};

function parseInlineMath(text: string, keyPrefix: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  const inlineRegex = /\$([^\$\n]+?)\$/g;
  let lastIdx = 0;
  let m: RegExpExecArray | null;

  while ((m = inlineRegex.exec(text)) !== null) {
    const textSegment = text.substring(lastIdx, m.index);
    if (textSegment) {
      result.push(renderPlainTextWithLineBreaks(textSegment, `${keyPrefix}-t-${lastIdx}`));
    }

    const mathContent = m[1].trim();
    let rendered = '';
    try {
      rendered = katex.renderToString(mathContent, {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      rendered = `<span class="text-rose-600 font-mono">[${escapeHtml(mathContent)}]</span>`;
    }

    result.push(
      <span
        key={`${keyPrefix}-m-${m.index}`}
        className="inline-block px-0.5 align-middle"
        dangerouslySetInnerHTML={{ __html: rendered }}
      />
    );

    lastIdx = m.index + m[0].length;
  }

  const remainingText = text.substring(lastIdx);
  if (remainingText) {
    result.push(renderPlainTextWithLineBreaks(remainingText, `${keyPrefix}-end`));
  }

  return result;
}

function renderPlainTextWithLineBreaks(raw: string, baseKey: string): React.ReactNode {
  const lines = raw.split('\n');
  return (
    <React.Fragment key={baseKey}>
      {lines.map((line, idx) => (
        <React.Fragment key={`${baseKey}-l-${idx}`}>
          {line}
          {idx < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
