// Versão PNG (1200×630) de cada capa SVG, gerada no build. Redes sociais não
// aceitam SVG em og:image, então é esse arquivo que aparece no card do LinkedIn.
import fs from 'node:fs';
import path from 'node:path';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';
import { coverName } from '../../lib/posts';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  const names = new Set(posts.map(coverName).filter((name): name is string => !!name));
  return [...names].map((name) => ({ params: { name } }));
}

export const GET: APIRoute = async ({ params }) => {
  const file = path.join(process.cwd(), 'public', 'posts-images', `${params.name}.svg`);
  // Fora do site as variáveis de tema não existem: usa as cores de fallback.
  const svg = fs.readFileSync(file, 'utf8').replace(/var\(--[\w-]+,\s*([^)]+)\)/g, '$1');
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
