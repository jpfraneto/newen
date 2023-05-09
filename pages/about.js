import Layout from '@component/components/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <Layout>
      <div className='text-left'>
        <h1 className='text-center'>About Sadhana</h1>
        <p>
          Welcome to the story of Sadhana, a tale of transformation. This
          isn&apos;t just any story. It&apos;s my story. It&apos;s a chronicle
          of how I learned to code, to meditate, and to harness the power of
          consistency to fuel my personal growth. It&apos;s about the journey
          from engineering school through a masters in innovation, and it&apos;s
          about realizing that the world we live in places an overwhelming value
          on birthright opportunities.
        </p>

        <p>
          I reject a world that prioritizes birthright over grit. I envision a
          future where we value people for their resilience, their tenacity, and
          their passion.
        </p>

        <p>
          There&apos;s an image that I want to share with you, a picture from my
          first Sadhana. For 108 days, I programmed a project called "The Open
          Source Factory," vowing to publish a new app every month. This
          journey, though deeply personal, is something I want to share with the
          world. It&apos;s a testament to the value of perseverance and
          consistent effort, and it&apos;s the foundation upon which Sadhana is
          built.
        </p>

        <div className='flex flex-col items-center mb-4'>
          <Image
            src='/images/sadhanajp.png' // replace with your image path
            alt='The Open Source Factory Last Sprint'
            width={500} //
            height={900} //
            className='rounded'
          />
          <small className='text-center mt-2'>
            My first sadhana - 108 days of programming a project called "The
            Open Source Factory"
          </small>
        </div>

        <p>
          Writing for me is a stream of consciousness, a liberation of words
          held captive in my mind. Often, I find myself in a maze of thoughts,
          trying to articulate ideas that refuse to be contained within the
          boundaries of language. But the story that needs to be told is clear -
          it&apos;s the story of suppressed childhoods, of unexplored dreams, of
          stifled creativity.
        </p>

        <p>
          We all carry the burden of societal and parental expectations, of
          having to mold ourselves into a preconceived idea of who we should be.
          This burden often overshadows our potential for creativity, our
          natural tendency to play, and our inherent need to be ourselves.
        </p>

        <p>But it&apos;s time for a new narrative.</p>

        <p>
          Sadhana is not about dwelling on past pain or unfulfilled
          expectations. It&apos;s about embracing our past and using it as a
          stepping stone towards a new future. It&apos;s about kindling the
          creative spark within each one of us, about rekindling our connection
          with our inner child.
        </p>

        <p>
          I envision a world where creativity and play take precedence. Where,
          for instance, if you admire a chef, you can join them in a 3-day
          challenge to cook a new meal every day, from scratch. A world where we
          celebrate the process of creation without the pressure of doing things
          &apos;right.
        </p>

        <p>
          Creativity is not about right or wrong. It&apos;s about exploration,
          about pushing boundaries, about being pleasantly surprised by the
          outcome. It&apos;s about playing.
        </p>

        <p>
          Through play, we can learn to be present, to just &apos;be.&apos; This
          is the essence of Sadhana, the vision that I want to bring into
          reality. I believe that creativity and play are the keys to our true
          selves, to our inner children.
        </p>

        <p>
          I invite you to join me in this journey. Let&apos;s write a new story
          together, a story of acceptance and creativity. Let&apos;s build a
          world where our children are seen as the wise ones, where we learn
          from them rather than dictating their paths.
        </p>

        <p>
          It&apos;s time to show up. For ourselves, for our children, for all
          children of the world. They need us.
        </p>

        <p>Thank you for being who you are.</p>

        <p>
          If you resonate with these words, please share your thoughts below.
          Your feedback and support mean the world to me. And, if you&apos;re
          ready to take the leap, visit
          <Link href='www.sadhana.lat/s/new'>www.sadhana.lat/s/new</Link> to
          create your own challenge. Invite your friends, explore your
          creativity, and together, let&apos;s make something awesome.
        </p>

        <p>We are going to build this together</p>
        <p>jp</p>
      </div>
    </Layout>
  );
}
