import React, { useState } from 'react';
import prisma from '@component/lib/prismaClient';

const AllUsers = ({ users }) => {
  const [sortedUsers, setSortedUsers] = useState(users);
  const [sortOrder, setSortOrder] = useState({
    sadhanas: true,
    sessions: true,
  });

  const totalParticipatingUsers = users.filter(
    user => user.sadhanas.length > 0
  ).length;
  const totalSessionSubmittedUsers = users.filter(
    user => user.sadhanaSessions.length > 0
  ).length;

  const sortUsers = type => {
    const order = sortOrder[type];
    const sorted = [...sortedUsers].sort((a, b) => {
      return order
        ? a[type === 'sadhanas' ? 'sadhanas' : 'sadhanaSessions'].length -
            b[type === 'sadhanas' ? 'sadhanas' : 'sadhanaSessions'].length
        : b[type === 'sadhanas' ? 'sadhanas' : 'sadhanaSessions'].length -
            a[type === 'sadhanas' ? 'sadhanas' : 'sadhanaSessions'].length;
    });
    setSortedUsers(sorted);
    setSortOrder({ ...sortOrder, [type]: !order });
  };

  return (
    <div className='container text-black mx-auto py-8'>
      <h1 className='text-2xl font-semibold mb-4'>All Users</h1>
      <div className='mb-4'>
        <span className='mr-4'>
          Total users participating in one or more sadhanas:{' '}
          {totalParticipatingUsers}
        </span>
        <span>
          Total users that have submitted one or more sessions:{' '}
          {totalSessionSubmittedUsers}
        </span>
      </div>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border border-gray-300 px-4 py-2 text-left'>Name</th>
            <th
              className='border border-gray-300 px-4 py-2 text-left cursor-pointer'
              onClick={() => sortUsers('sadhanas')}
            >
              Participated Sadhanas {sortOrder.sadhanas ? '▲' : '▼'}
            </th>
            <th
              className='border border-gray-300 px-4 py-2 text-left cursor-pointer'
              onClick={() => sortUsers('sessions')}
            >
              Total Submitted Sessions {sortOrder.sessions ? '▲' : '▼'}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(user => (
            <tr key={user.id} className='hover:bg-gray-50'>
              <td className='border border-gray-300 px-4 py-2'>x</td>
              <td className='border border-gray-300 px-4 py-2'>
                {user.sadhanas.length}
              </td>
              <td className='border border-gray-300 px-4 py-2'>
                {user.sadhanaSessions.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;

export async function getStaticProps({ params }) {
  let users = await prisma.user.findMany({
    include: {
      sadhanas: true,
      sadhanaSessions: true,
    },
  });

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
    revalidate: 60,
  };
}
