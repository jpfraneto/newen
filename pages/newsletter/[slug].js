import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { remark } from 'remark';
import { html } from 'remark-html';

export default function PostPage({ post }) {
  const router = useRouter();
  console.log('the post is: ', post);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className='max-w-2xl mx-auto px-6'>
        <h1 className='text-4xl font-bold mb-4'>{post.frontmatter.title}</h1>
        <Image
          src={post.frontmatter.image}
          alt={post.frontmatter.title}
          className='mx-auto rounded-xl'
          width={333}
          height={222}
        />
        <p className='text-gray-200 mb-8'>
          {post.frontmatter.date} -{' '}
          <Link href={`/u/clgtinf7j0000js08w6041qqk`}>
            @{post.frontmatter.author}
          </Link>
        </p>
        <div className='text-left'>
          {post.content.split('\n').map((x, i) => (
            <p className='' key={i}>
              {x}
            </p>
          ))}
        </div>
        <Link
          href='/newsletter'
          className='mt-4 mb-0 w-fit mx-auto bg-[#009FE3] py-2 px-6 rounded-lg font-semibold text-xl text-white hover:bg-[#E6007E] hover:text-black transition-colors duration-300'
        >
          Go Back
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const pathToDataDir = path.join(process.cwd(), 'data', 'posts');
  const files = fs.readdirSync(pathToDataDir);

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const pathToDataDir = path.join(process.cwd(), 'data', 'posts');

  const markdownWithMeta = fs.readFileSync(
    path.join(pathToDataDir, `${slug}.md`),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      post: {
        slug,
        frontmatter,
        content: contentHtml,
      },
    },
  };
}
