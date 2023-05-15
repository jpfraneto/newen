import { getLayout as getSiteLayout } from '@component/components/SiteLayout';
import LeftNavbar from '@component/components/LeftNavbar';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

const AccountLayout = ({ children }) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  if (status === 'loading') {
    return (
      <div className=''>
        <Spinner />
      </div>
    );
  }

  if (!session) return;
  return (
    <div className='w-screen flex flex-row'>
      <LeftNavbar user={session?.user} />
      {addPropsToChildren(children, { session })}
    </div>
  );
};

export const getLayout = page => {
  return getSiteLayout(<AccountLayout>{page}</AccountLayout>);
};

function addPropsToReactElement(element, props) {
  if (React.isValidElement(element)) {
    return React.cloneElement(element, props);
  }
  return element;
}

function addPropsToChildren(children, props) {
  if (!Array.isArray(children)) {
    return addPropsToReactElement(children, props);
  }
  return children.map(childElement => {
    return addPropsToReactElement(childElement, props);
  });
}

export default AccountLayout;
