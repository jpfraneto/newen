import Layout from '@component/components/Layout';
import ReactPlayer from 'react-player';

export default function Videos() {
  return (
    <Layout>
      <div className='text-left'>
        <h1 className='text-center'>Motivational Videos</h1>
        <p>
          Welcome to the video library of Sadhana. This is your hub for
          inspiration, learning, and transformation.
        </p>

        <p>
          Our first feature is a motivational video to kick-start your journey:
        </p>
        <div className='player-wrapper my-4'>
          <ReactPlayer
            className='react-player aspect-video'
            url='https://www.youtube.com/watch?v=xDAs21ETTSY&pp=ygUMY29uc2lzdGVuY3kg'
            fill
            controls={true}
          />
        </div>

        <p>
          In the future, this page will be filled with a wide array of videos,
          carefully sorted into categories like Sports, Motivation, Meditation,
          Breathwork, and much more. Each video will be handpicked to serve a
          unique purpose and to aid you in your journey.
        </p>

        <p>
          Whether you&apos;re looking to find a moment of tranquility with a
          guided meditation, seeking to learn a new skill, or just in need of a
          quick dose of motivation, you&apos;ll find it here.
        </p>

        <p>
          And that&apos;s not all! We have some big plans for the future.
          Here&apos;s a sneak peek:
        </p>

        <ul>
          <li>
            <strong>Community Curated Content:</strong> We want to give you the
            power to contribute to this collection. If you have a video that has
            inspired you or taught you something valuable, you&apos;ll be able
            to submit it for consideration.
          </li>
          <li>
            <strong>Creator Spotlights:</strong> We plan to feature videos from
            your favorite creators, giving you a chance to learn from them
            directly.
          </li>
          <li>
            <strong>Interactive Learning:</strong> We aim to introduce features
            that will allow you to interact with the videos, providing a more
            engaging and effective learning experience.
          </li>
        </ul>

        <p>
          We&apos;re excited to build this video library with your help. Keep
          checking back as we continue to add more resources and features.
        </p>
      </div>
    </Layout>
  );
}
