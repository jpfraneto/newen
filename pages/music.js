import Layout from '@component/components/Layout';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function Music() {
  return (
    <Layout>
      <div className='text-left'>
        <h1 className='text-center'>Music</h1>
        <p>
          Welcome to the music library of Sadhana. This is where you will get
          the tunes that will fuel your work.
        </p>

        <div className='player-wrapper my-4'>
          <ReactPlayer
            className='react-player aspect-video'
            url='https://soundcloud.com/oliverrottmann/stadtflucht-2022'
            fill
            controls={true}
          />
        </div>
      </div>
    </Layout>
  );
}
