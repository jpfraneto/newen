import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';

const TV = ({}) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const playerRef = useRef(null);

  const videoIds = ['XpToTEnx2UI', '1pHqm85wumo', 'XW57TsV38UY', 'QSwQQtXrTe4'];

  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      createPlayer();
    };

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  useEffect(() => {
    if (
      playerRef.current &&
      typeof playerRef.current.loadVideoById === 'function'
    ) {
      playerRef.current.loadVideoById(videoIds[currentVideo]);
    }
  }, [currentVideo]);

  function createPlayer() {
    const newPlayer = new window.YT.Player('player', {
      height: '360',
      width: '640',
      videoId: videoIds[currentVideo],
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });

    playerRef.current = newPlayer;
  }

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  function onPlayerStateChange(event) {
    if (event.data === window.YT.PlayerState.ENDED) {
      const nextVideoIndex = (currentVideo + 1) % videoIds.length;
      setCurrentVideo(nextVideoIndex);
      playerRef.current.loadVideoById(videoIds[nextVideoIndex]);
    }
  }

  return (
    <div className='landing-page'>
      <div className='bg-black text-white min-h-screen flex flex-col items-center justify-center'>
        <Script src='https://www.youtube.com/iframe_api' />
        <h1 className='heroanky text-4xl md:text-6xl font-bold'>Sadhana TV</h1>
        <p>24/7 cartoons from the world of Anky</p>
        <div id='player'></div>
      </div>
    </div>
  );
};

export default TV;
