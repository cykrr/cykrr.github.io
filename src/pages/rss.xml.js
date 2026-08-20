import rss from '@astrojs/rss';

const posts = Object.values(import.meta.glob('./blog/*.md', { eager: true }));

export function GET(context) {
  return rss({
    title: 'krr.cl',
    description: 'Notes on systems, speech and whatever else I am taking apart.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.frontmatter.title,
      pubDate: new Date(post.frontmatter.date || '2000-01-01'),
      description: post.frontmatter.description,
      link: post.url,
    })),
  });
}
