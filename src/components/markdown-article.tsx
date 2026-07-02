import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

interface MarkdownArticleProps {
  content: string;
}

const mdxComponents = {
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="my-10 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_24px_90px_rgba(0,0,0,0.28)]">
      <div className="flex items-center justify-between border-b border-white/8 bg-black/30 px-5 py-3">
        <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
          Structured Notes
        </p>
        <p className="text-xs text-slate-500">左右滑動可檢視完整欄位</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[720px] border-collapse text-sm">{children}</table>
      </div>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-white/7">{children}</thead>
  ),
  tbody: ({ children }: { children: React.ReactNode }) => (
    <tbody className="divide-y divide-white/8 bg-black/10">{children}</tbody>
  ),
  tr: ({ children }: { children: React.ReactNode }) => (
    <tr className="border-b border-white/8 transition-colors duration-200 hover:bg-white/5 last:border-b-0">{children}</tr>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border-b border-white/10 px-4 py-3 text-left text-[11px] tracking-[0.18em] text-stone-200 uppercase">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="align-top px-4 py-3 leading-7 text-slate-300">{children}</td>
  ),
  caption: ({ children }: { children: React.ReactNode }) => (
    <caption className="px-5 py-3 text-left text-xs tracking-[0.05em] text-slate-500 caption-bottom">
      {children}
    </caption>
  ),
};

export function MarkdownArticle({ content }: MarkdownArticleProps) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/4 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8 lg:p-10">
      <div className="prose prose-invert prose-headings:font-serif prose-headings:text-stone-100 prose-h2:mt-10 prose-h2:border-l-2 prose-h2:border-amber-500/70 prose-h2:pl-4 prose-h2:text-2xl prose-h3:text-xl prose-p:text-[15px] prose-p:leading-8 prose-p:text-slate-300 prose-strong:text-amber-100 prose-a:text-amber-300 prose-a:no-underline hover:prose-a:text-amber-200 prose-blockquote:rounded-r-[1.2rem] prose-blockquote:border-l-2 prose-blockquote:border-amber-500/60 prose-blockquote:bg-white/4 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:text-stone-300 prose-code:rounded prose-code:bg-white/8 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-amber-100 prose-code:before:content-[''] prose-code:after:content-[''] prose-li:text-slate-300 prose-hr:border-white/8 max-w-none overflow-hidden">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </div>
    </article>
  );
}
