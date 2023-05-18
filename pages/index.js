// LandingPage.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Londrina_Shadow, Luckiest_Guy } from 'next/font/google';
import { useRouter } from 'next/router';

const luckiestguy = Luckiest_Guy({ weight: '400', subsets: ['latin'] });
const londrinashadow = Londrina_Shadow({ weight: '400', subsets: ['latin'] });

const LandingPage = () => {
  const router = useRouter();

  return (
    <>
      {' '}
      <div className='bg-theorange min-h-screen min-w-screen flex flex-col'>
        <div
          className={`${luckiestguy.className} text-theblack flex-grow g-cover bg-center flex flex-col items-center `}
        >
          <div className='text-center pt-32 mb-8'>
            <h5 className={`${luckiestguy.className} text-7xl font-bold mb-5`}>
              EL FIN DE LA DEPRESIÓN
            </h5>
            <p className='px-4 md:px-0 text-xl md:max-w-xl mx-auto mt-0'>
              Todo lo que estaba pasando en esta página web fue borrado (por
              mientras) para crear el concurso.
            </p>
            <div>
              {' '}
              <Link
                href='/concurso'
                className={`${londrinashadow.className} text-4xl px-4 py-2 font-bold bg-thegreen hover:bg-thegreener hover:text-thewhite border-2 rounded-2xl border-theblack`}
              >
                PARTICIPA ACÁ POR $100.000 DÓLARES
              </Link>
            </div>

            <p className='pt-10'>La funcionalidad normal vuelve el lunes 22.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
