import React, { useEffect, useState } from 'react';
import AllSadhanasDisplay from '@component/components/AllSadhanasDisplay';
import { getLayout } from '@component/components/AccountLayout';
import prisma from '@component/lib/prismaClient';

const AllSadhanas = ({ sadhanas }) => {
  return <AllSadhanasDisplay sadhanas={sadhanas} />;
};

export async function getServerSideProps({}) {
  let sadhanas = await prisma.sadhana.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
      participants: true,
    },
  });

  return {
    props: {
      sadhanas: JSON.parse(JSON.stringify(sadhanas)),
    },
  };
}

AllSadhanas.getLayout = getLayout;

export default AllSadhanas;
