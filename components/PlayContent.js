import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import {
  Rubik_80s_Fade,
  Russo_One,
  Londrina_Shadow,
  Luckiest_Guy,
} from 'next/font/google';
import PlayNav from './PlayNav';
import AnkyImagesGrid from './AnkyImagesGrid';
import BiggerLayout from './BiggerLayout';

const luckiestguy = Luckiest_Guy({ weight: '400', subsets: ['latin'] });
const londrinashadow = Londrina_Shadow({ weight: '400', subsets: ['latin'] });

function PlayContent() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [nftdisplay, setNftdisplay] = useState(false);
  const videoIds = ['XpToTEnx2UI', '1pHqm85wumo', 'XW57TsV38UY', 'QSwQQtXrTe4'];

  const handleVideoEnd = () => {
    const nextVideoIndex = (currentVideo + 1) % videoIds.length;
    setCurrentVideo(nextVideoIndex);
  };

  return (
    <>
      <PlayNav setNftdisplay={setNftdisplay} />{' '}
      <div
        className='playcontainer bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/ankywallpaper.png')",
        }}
      >
        {nftdisplay ? (
          <BiggerLayout>
            <h1 className='text-thewhite text-3xl'>Anky&apos;s world.</h1>
            <p className='text-thewhite'>
              Welcome. Each character of this world will be generated with you
              as an inspiraton. You will be an integral part of how this story
              unfolds.
            </p>
            <p className='text-thewhite'>Stay tuned.</p>
            <AnkyImagesGrid />
          </BiggerLayout>
        ) : (
          <div className='h-full max-w-full  overflow-hidden flex-col flex items-center pt-16 px-4'>
            <h1 className='text-6xl md:text-7xl font-bold text-thewhite space-x-4 mb-0'>
              <span className={`${luckiestguy.className}`}>ANKY</span>
              <span className={`${londrinashadow.className} ml-2`}>TV</span>
            </h1>
            <div className='mt-8 wrapper bg-theblack rounded-xl'>
              <ReactPlayer
                className='player'
                url={`https://www.youtube.com/watch?v=${videoIds[currentVideo]}`}
                controls
                playing
                onEnded={handleVideoEnd}
                width='100%'
                height='100%'
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PlayContent;
