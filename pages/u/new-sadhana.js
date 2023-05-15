import React, { useEffect, useState } from 'react';
import NewSadhana from '@component/components/NewSadhana';
import { getLayout } from '@component/components/AccountLayout';

const NewSadhanaUserPage = ({}) => {
  return <NewSadhana />;
};

NewSadhanaUserPage.getLayout = getLayout;

export default NewSadhanaUserPage;
