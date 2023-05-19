// Layout.js

const Layout = ({ children }) => (
  <div className='overflow-y-scroll 0 min-h-screen  text-black py-2 sm:px-8 md:px-16 lg:px-32'>
    <main className='layoutstyle min-h-screen'>{children}</main>
    <footer className='w-full text-center border-t border-grey p-4 pin-b mt-20'>
      <span>© 2023 Sadhana. All rights reserved.</span>
    </footer>
  </div>
);

export default Layout;
