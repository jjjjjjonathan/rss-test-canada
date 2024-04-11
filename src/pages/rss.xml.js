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
			media: 'https://rss-test-canada.vercel.app/'
		},
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
			customData: `<media:content
			type="image/jpg"
			medium="image"
			url="${context.site}placeholder-1.jpg"
		/>`
		})),
	});
}
