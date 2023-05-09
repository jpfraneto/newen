import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '@component/components/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function Newsletter({ posts }) {
  return (
    <Layout>
      <h1 className='text-4xl font-bold mb-4'>Newsletter</h1>
      <p className='text-lg mb-6'>
        Stay informed and inspired with our weekly newsletter. Here you'll find
        tips, advice, and motivational stories to keep you committed to your
        sadhana.
      </p>
      <div className='space-y-4 bg-black bg-opacity-20'>
        {posts.map(post => (
          <div
            key={post.slug}
            className='border flex flex-col items-center border-gray-300 p-4 rounded-md relative'
          >
            <p className='text-3xl text-gray-300 font-bold mb-2'>
              {post.frontmatter.title}
            </p>
            <Image src={post.frontmatter.image} width={333} height={222} />
            <p className='text-sm text-gray-200 mb-2'>
              {post.frontmatter.date} -{' '}
              <Link href={`/u/clgtinf7j0000js08w6041qqk`}>
                @{post.frontmatter.author}
              </Link>
            </p>
            <p className='text-base'>{post.content.slice(0, 280)}...</p>
            <a
              href={`/newsletter/${post.frontmatter.slug}`}
              className='text-blue-500'
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const pathToDataDir = path.join(process.cwd(), 'data', 'posts');

  const files = fs.readdirSync(pathToDataDir);

  const posts = await Promise.all(
    files.map(async filename => {
      const slug = filename.replace('.md', '');

      const markdownWithMeta = fs.readFileSync(
        path.join(pathToDataDir, filename),
        'utf-8'
      );
      const { data: frontmatter, content } = matter(markdownWithMeta);

      return {
        slug,
        frontmatter,
        content,
      };
    })
  );

  return {
    props: {
      posts: posts
        .slice(0, 3)
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        ),
    },
  };
}
