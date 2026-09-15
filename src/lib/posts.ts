import { getCollection, type CollectionEntry } from 'astro:content';

export type Lang = 'pt' | 'en';
export type Post = CollectionEntry<'posts'>;

export async function getPosts(lang: Lang): Promise<Post[]> {
  return (await getCollection('posts', ({ data }) => data.lang === lang)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function postSlug(post: Post): string {
  return post.id.replace(`${post.data.lang}/`, '');
}

export function postHref(post: Post): string {
  return `/${post.data.lang}/blog/${postSlug(post)}/`;
}

export function readingMinutes(post: Post): number {
  const words = post.body ? post.body.trim().split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 200));
}

export function readingLabel(post: Post): string {
  const minutes = readingMinutes(post);
  return post.data.lang === 'pt' ? `${minutes} min de leitura` : `${minutes} min read`;
}

export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

// Seed estável entre PT e EN: a capa manual (compartilhada) ou a fonte.
export function postSeed(post: Post): string {
  return post.data.image ?? post.data.source ?? post.id;
}

// Nome base da capa SVG (sem pasta e extensão), ou null se o post não tem capa SVG.
export function coverName(post: Post): string | null {
  const match = post.data.image?.match(/^\/posts-images\/([\w-]+)\.svg$/);
  return match ? match[1] : null;
}

// Imagem para og:image. LinkedIn e afins não aceitam SVG, então capas SVG
// apontam para o PNG gerado em src/pages/posts-images/[name].png.ts.
export function socialImage(post: Post): string | undefined {
  const name = coverName(post);
  if (name) return `/posts-images/${name}.png`;
  return post.data.image;
}

// Texto pronto para colar no LinkedIn: o campo `linkedin` do post (ou um texto
// montado a partir de título e descrição), seguido do link e das hashtags.
export function linkedinText(post: Post, site: URL | string): string {
  const { title, description, linkedin, tags, lang } = post.data;
  const url = new URL(postHref(post), site).href;
  const intro = lang === 'pt' ? 'Escrevi sobre isso no blog:' : 'I wrote about it on my blog:';
  const body = linkedin?.trim() || `${title}\n\n${description}\n\n${intro}`;
  const hashtags = tags
    .map((tag) => tag.replace(/[^\p{L}\p{N}]/gu, ''))
    .filter(Boolean)
    .map((tag) => `#${tag}`)
    .join(' ');
  return [body, url, hashtags].filter(Boolean).join('\n\n');
}

// Posts do mesmo idioma ordenados por tags em comum (depois por data).
export function relatedPosts(post: Post, posts: Post[], limit = 2): Post[] {
  const tags = new Set(post.data.tags);
  return posts
    .filter((p) => p.id !== post.id)
    .map((p) => ({ p, score: p.data.tags.filter((t) => tags.has(t)).length }))
    .sort((a, b) => b.score - a.score || b.p.data.pubDate.valueOf() - a.p.data.pubDate.valueOf())
    .slice(0, limit)
    .map(({ p }) => p);
}
