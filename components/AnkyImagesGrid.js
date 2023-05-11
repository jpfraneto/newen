import React from 'react';
import Image from 'next/image';

function AnkyImagesGrid() {
  const images = [];
  for (let i = 1; i <= 23; i++) {
    images.push(`/images/anky/${i}.png`);
  }

  return (
    <div className='flex flex-wrap  justify-around'>
      {images.map((src, index) => (
        <div key={index} className='relative h-80 w-80 my-2 bg-black pb-full'>
          <Image
            src={src}
            alt={`Anky image ${index + 1}`}
            width={222}
            height={222}
            className=' inset-0 w-full h-full'
          />
        </div>
      ))}
    </div>
  );
}

export default AnkyImagesGrid;
