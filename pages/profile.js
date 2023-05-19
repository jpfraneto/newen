import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@component/pages/api/auth/[...nextauth].js';
import { PrismaClient } from '@prisma/client';
import { getLayout } from '../components/AccountLayout';
import Image from 'next/image';
import Button from '@component/components/Button';
import prisma from '@component/lib/prismaClient';
import { useRouter } from 'next/router';

const Profile = ({ user }) => {
  const router = useRouter();
  const now = new Date().getTime();
  console.log('the user is: ', user);
  if (!user) return <p>You need to login to access this page.</p>;
  return (
    <div className='flex flex-row p-12'>
      <div className='flex space-x-2'>
        <div className='relative w-56 h-56 rounded-full overflow-hidden'>
          <Image src={user.image} alt={user.name} fill />
        </div>
        <div className='flex flex-col space-y-2 text-theblack font-bold'>
          <h2>{user.name}</h2>
          <h4>{user.email}</h4>
          {user.username && <h4>@{user.username}</h4>}
          <h2>Created Sadhanas: {user.sadhanas.length}</h2>
          <h2>Participated Sadhanas: {user.participatedSadhanas.length}</h2>
          <h2>
            Points: {user.points} | Level: {user.level}
          </h2>
          <Button
            buttonText='User Settings'
            buttonAction={() => router.push('/u/settings')}
            buttonColor='bg-thegreen'
          />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      props: {},
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      sadhanas: true,
      participatedSadhanas: true,
    },
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

Profile.getLayout = getLayout;

export default Profile;
