import React, { useState } from 'react';
import { Londrina_Shadow, Luckiest_Guy } from 'next/font/google';
import prisma from '@component/lib/prismaClient';

const luckiestguy = Luckiest_Guy({ weight: '400', subsets: ['latin'] });
const londrinashadow = Londrina_Shadow({ weight: '400', subsets: ['latin'] });

const ContestComponent = props => {
  const [challenge, setChallenge] = useState('');
  const [platform, setPlatform] = useState('');
  const [username, setUsername] = useState('');
  const [preview, setPreview] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [challengeCounter, setChallengeCounter] = useState(
    Number(props.pageProps.counter)
  );
  const [challengeNumber, setChallengeNumber] = useState(null);

  const previewFunction = () => {
    if (!challenge) return alert('Agrega tu desafío.');
    if (!platform) return alert('Agrega la red social donde te contacto');
    if (!username) return alert('Agrega tu nombre de usuario.');
    setPreview(x => !x);
  };

  const shareOnLink = async () => {
    const text = `https://www.sadhana.lat/concurso`;

    await navigator.clipboard.writeText(text);
    alert('El link fue copiado.');
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    // You can call your API here
    console.log({ challenge, platform, username });
    const response = await fetch(`/api/concurso`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        challenge,
        platform,
        username,
      }),
    });
    const data = await response.json();
    console.log('the data is: ', data);
    if (response.ok) {
      console.log('the data is: ', data);
      setChallengeNumber(data.id);
      setChallengeCounter(x => +x + 1);
      setLoading(false);
      setSuccess(true);
    } else {
      console.log('inside the error.', data.message);
      // Handle error
      setErrorMessage(data.message);
      setLoading(false);
      setPreview(false);
    }
  };

  const isValidUsername = username => {
    const pattern = /^@[a-zA-Z0-9_.-]*$/;
    return pattern.test(username);
  };

  return (
    <div className='text-center bg-theorange h-screen w-screen overflow-scroll'>
      <div className='p-5'>
        <div>
          {' '}
          <h6
            className={`${luckiestguy.className} font-bold mb-4 max-w-4xl mx-auto text-3xl md:text-5xl`}
          >
            Participa en el concurso.
          </h6>
          <h6
            className={`${luckiestguy.className} font-bold mb-1 max-w-4xl mx-auto text-5xl md:text-8xl`}
          >
            GANA $100.000 dólares!
          </h6>
          <h6
            className={`${luckiestguy.className} font-bold -mb-2 max-w-4xl mx-auto text-3xl md:text-5xl`}
          >
            Simplemente haciendo un desafío.*
          </h6>
          <small className=''>
            *Para que esto funcione, tengo que yo ganar el concurso donde me van
            a dar $100.000 de premio.
          </small>
          <br />
          <small className='mb-8'>
            Para eso, más de 150.000 personas tienen que agregar un desafío.
            Necesitamos tu ayuda! Sígueme en IG o TikTok para sabe cómo avanza
            este juego: @kithkui
          </small>
          <div className='flex space-x-2 justify-center'>
            <div>
              {challengeCounter && (
                <h4 className='px-4 py-2 bg-thegreenbtn font-bold border-theblack border-2 rounded-full w-fit hover:opacity-40 mt-2'>
                  Desafíos agregados: {challengeCounter}/150.000
                </h4>
              )}
            </div>
            <button
              type='button'
              className='px-4 py-2 bg-thepurple font-bold border-theblack border-2 rounded-full hover:opacity-40 w-fit  mt-2'
              onClick={shareOnLink}
            >
              Compartir
            </button>
          </div>
        </div>
        <div className='mt-6 font-bold max-w-3xl mx-auto border px-2 py-3 rounded-xl'>
          {success ? (
            <div>
              <p>
                Listo {username}, tu desafío fue agregado. Ayúdame a llegar a la
                meta compartiendo todo lo que puedas, para así tener los
                $100.000 dólares para sortear.{' '}
              </p>
              <p>Tu número es el {challengeNumber}.</p>
              <p>
                Comparte una foto/video de ti haciendo tu desafío en {platform},
                con el hashtag #sadhanalat, para ayudarnos a llegar a la meta.
              </p>
              <p>Los resultados van a estar el domingo a las 8pm de Chile.</p>
            </div>
          ) : (
            <div>
              {' '}
              {loading ? (
                <p>Enviando información...</p>
              ) : (
                <div>
                  {preview ? (
                    <div className='p-5 '>
                      <h1 className='font-bold text-2xl mb-4'>
                        Revisa que esté correcta tu info:
                      </h1>
                      <p className='mb-2'>
                        <span className='font-bold text-thered'>Desafío:</span>{' '}
                        {challenge}
                      </p>
                      <p className='mb-2  '>
                        <span className='font-bold text-thered'>
                          Plataforma:
                        </span>{' '}
                        {platform}
                      </p>
                      <p className='mb-2 '>
                        <span className='font-bold text-thered'>Usuario:</span>{' '}
                        {username}
                      </p>
                      <button
                        type='button'
                        className='bg-thepurple hover:opacity-80 text-thewhite font-bold py-2 px-4 rounded m-2'
                        onClick={previewFunction}
                      >
                        Editar
                      </button>
                      <button
                        className='bg-thegreen hover:opacity-80 text-white font-bold py-2 px-4 rounded m-2'
                        onClick={handleFormSubmit}
                        type='button'
                      >
                        Estoy listo para participar por los $100.000 dólares
                      </button>
                    </div>
                  ) : (
                    <div>
                      {' '}
                      {errorMessage && (
                        <p className='text-theredbtn text-3xl font-bold'>
                          {errorMessage}
                        </p>
                      )}
                      <form
                        onSubmit={handleFormSubmit}
                        className='space-y-4 max-w-xl mx-auto'
                      >
                        <label className='block'>
                          Cuál va a ser tu desafío?
                          <input
                            className='px-4 py-2 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
                            type='text'
                            value={challenge}
                            onChange={e => {
                              setErrorMessage('');
                              setChallenge(e.target.value);
                            }}
                            placeholder='Hacer el baile viral de tiktok'
                            required
                          />
                        </label>
                        <label className='block'>
                          Elige una red social para contactarte después.
                          <select
                            className='px-4 py-2 mt-1 mt-1 block w-1/2 mx-auto text-bold rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
                            value={platform}
                            onChange={e => {
                              setErrorMessage('');
                              setPlatform(e.target.value);
                            }}
                            required
                          >
                            <option value=''>--Seleccionar--</option>
                            <option value='TikTok'>TikTok</option>
                            <option value='Instagram'>Instagram</option>
                          </select>
                        </label>
                        <label className='block'>
                          MUY IMPORTANTE: A qué perfil en esa red social te
                          contacto después?
                          <input
                            className='px-4 py-2 mt-1 block w-1/2 mx-auto rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
                            type='text'
                            value={username}
                            onChange={e => {
                              setErrorMessage('');
                              setUsername(e.target.value);
                            }}
                            placeholder='@diosteayuda'
                            required
                          />
                        </label>
                        {!isValidUsername(username) && username && (
                          <small className='text-thered'>
                            El formato debe ser @nombredeusuario
                          </small>
                        )}
                        <br />
                        <button
                          type='button'
                          onClick={previewFunction}
                          className='bg-thegreen hover:opacity-80 mt-0 text-white font-bold py-2 px-4 rounded'
                        >
                          Vista previa
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContestComponent;

export async function getServerSideProps() {
  // Fetch data from your database
  let challengeCount;
  try {
    console.log('in here');
    challengeCount = await prisma.concursoChallenge.count();
    console.log('the challenge count is: ', challengeCount);
  } catch (error) {
    console.log('Error fetching challenges: ', error);
    challengeCount = null;
  }

  return {
    props: {
      counter: JSON.parse(JSON.stringify(challengeCount)),
    }, // will be passed to the page component as props
  };
}
