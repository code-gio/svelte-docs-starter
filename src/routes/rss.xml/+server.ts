import { getAllDocs, docsConfig } from '$lib/docs/index.js';

export const prerender = true;

export function GET() {
	const docs = getAllDocs();
	const siteUrl = docsConfig.site.url ?? 'https://example.com';
	const siteTitle = docsConfig.site.title;
	const siteDescription = docsConfig.site.description;

	const items = docs
		.filter((doc) => doc.slug !== '')
		.map(
			(doc) => `
    <item>
      <title>${escapeXml(doc.meta.title)}</title>
      <link>${siteUrl}${doc.href}</link>
      <guid>${siteUrl}${doc.href}</guid>
      <description>${escapeXml(doc.meta.description)}</description>
      ${doc.meta.lastUpdated ? `<pubDate>${new Date(doc.meta.lastUpdated).toUTCString()}</pubDate>` : ''}
    </item>`
		)
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${siteUrl}/docs</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>en</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`.trim();

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}

function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
