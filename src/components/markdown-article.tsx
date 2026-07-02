import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

interface MarkdownArticleProps {
  content: string;
}

const mdxComponents = {
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="my-8 overflow-x-auto rounded-[1.5rem] border border-white/10 bg-black/20 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
      <table className="min-w-[720px] border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-white/6">{children}</thead>
  ),
  tbody: ({ children }: { children: React.ReactNode }) => (
    <tbody className="divide-y divide-white/8">{children}</tbody>
  ),
  tr: ({ children }: { children: React.ReactNode }) => (
    <tr className="border-b border-white/8 last:border-b-0">{children}</tr>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border-b border-white/10 px-4 py-3 text-left text-[11px] tracking-[0.18em] text-stone-200 uppercase">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="align-top px-4 py-3 leading-7 text-slate-300">{children}</td>
  ),
};

export function MarkdownArticle({ content }: MarkdownArticleProps) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/4 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8 lg:p-10">
      <div className="prose prose-invert prose-headings:font-serif prose-headings:text-stone-100 prose-h2:mt-10 prose-h2:border-l-2 prose-h2:border-amber-500/70 prose-h2:pl-4 prose-h2:text-2xl prose-h3:text-xl prose-p:text-[15px] prose-p:leading-8 prose-p:text-slate-300 prose-strong:text-amber-100 prose-a:text-amber-300 prose-a:no-underline hover:prose-a:text-amber-200 prose-blockquote:border-l-2 prose-blockquote:border-amber-500/60 prose-blockquote:text-stone-300 prose-li:text-slate-300 prose-hr:border-white/8 max-w-none overflow-hidden">
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
