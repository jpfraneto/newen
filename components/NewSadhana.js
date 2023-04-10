import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function NewSadhana() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { data: session } = useSession();

  if (!session || !session.user) return null;

  console.log('client side: ', session);

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();

        if (!content) {
          alert('No content');
          return;
        }

        fetch('/api/sadhana', {
          body: JSON.stringify({
            content,
            title,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
      }}
    >
      <div className='flex flex-col w-96 mx-auto'>
        <h2 className='m-0 p-2 text-lg font-medium'>New Sadhana</h2>
        <div className='flex-1 px-1 pt-2 mt-2 mr-1 ml-1'>
          <input
            className='border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary '
            type='text'
            placeholder='What is the title of this sadhana?'
            name='title'
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className='flex-1 px-1 pt-2 mt-2 mr-1 ml-1'>
          <textarea
            className='border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary '
            rows={2}
            cols={50}
            placeholder="What's happening?"
            name='content'
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <div className='flex'>
          <div className='flex-1 mb-5'>
            <button className='border float-right px-8 py-2 mt-0 mr-2 font-bold rounded-full'>
              Tweet
            </button>
            <button onClick={signOut}>Sign out</button>
          </div>
        </div>
      </div>
    </form>
  );
}
