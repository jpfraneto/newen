import Layout from '@component/components/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <Layout>
      <div className='text-left'>
        <h1 className='text-center'>Careers</h1>
        <p>
          Now, you might be looking around and thinking, &quot;Where are all the
          job listings?&quot; Well, this is just starting out, and while there
          aren&apos;t any open positions just yet, there are big plans for the
          future.
        </p>

        <p>
          Sadhana is more than just a project. I envision a future where
          education is not confined to the walls of institutions and the pages
          of degrees. I see a world where individuals are valued for their
          dedication, their creativity, and their willingness to show up and do
          the work. This is the world that I&apos;m striving to build.
        </p>

        <p>
          Perhaps you&apos;re intrigued by this vision. Maybe you&apos;re even
          excited by it. Maybe you see yourself as a part of this future,
          working towards a world where value is placed on the individual rather
          than the credentials they hold. If so, I would love to hear from you.
        </p>

        <p>
          Even though I don&apos;t have any specific roles open right now,
          I&apos;m always interested in hearing from passionate individuals who
          share this vision. If you&apos;re interested in potentially working
          with me in the future, I invite you to connect with me on Twitter at
          @kithkui. Let me know who you are, what drives you, and how you
          envision contributing to this project.
        </p>

        <p>
          Thank you for being part of this. This adventure is in its early
          stages, but with the support of dedicated individuals like you, this
          vision can be transformed into reality. I look forward to possibly
          working together to reshape the future of education.
        </p>
      </div>
    </Layout>
  );
}
