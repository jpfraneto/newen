// components/LastSessions.js
import React, { useEffect, useState } from 'react';

const LastSessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/api/lastsessions');
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error('Error fetching last sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className='container text-black mx-auto px-4'>
      <h1 className='text-4xl font-bold mb-4'>Last 20 Sadhana Sessions</h1>
      <ul className='space-y-4'>
        {sessions.map(session => (
          <li key={session.id} className='border p-4 rounded'>
            <p>
              <span className='font-semibold'>Author:</span>{' '}
              {session.author.name}
            </p>
            <p>
              <span className='font-semibold'>Sadhana:</span>{' '}
              {session.sadhana.title}
            </p>
            <p>
              <span className='font-semibold'>Sadhana Day:</span>{' '}
              {session.sadhanaDay.day}
            </p>
            <p>
              <span className='font-semibold'>Feeling:</span> {session.feeling}
            </p>
            <p>
              <span className='font-semibold'>Notes:</span> {session.notes}
            </p>
            <p>
              <span className='font-semibold'>Completed at:</span>{' '}
              {new Date(session.completedAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastSessions;
