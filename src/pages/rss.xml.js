import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		xmlns: {
			media: 'http://search.yahoo.com/mrss/'
		},
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
			customData: `<media:content
			type="image/jpg"
			width="400"
			height="700"
			medium="image"
			url="${context.site}/blog-placeholder-1.jpg"
		/>`
		})),
	});
}
