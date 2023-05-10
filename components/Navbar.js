import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Rubik_80s_Fade, Russo_One } from 'next/font/google';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

const Navigation = () => {
  const { data: session, status } = useSession();

  return (
    <Navbar bg='dark' variant='dark' expand='lg' className='px-4'>
      <Navbar.Brand href='/' className={`${russo.className}`}>
        Sadhana
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          <NavDropdown title='Sadhanas' id='sadhana-nav-dropdown'>
            <NavDropdown.Item href='/s'>All Sadhanas</NavDropdown.Item>
            <NavDropdown.Item href='/s/new'>Add New</NavDropdown.Item>
            <NavDropdown.Item href='/inspiration'>
              Get Inspired
            </NavDropdown.Item>
          </NavDropdown>
          {/* <NavDropdown title='Success Stories' id='stories-nav-dropdown'>
            <NavDropdown.Item href='/transformed'>
              People Transformed
            </NavDropdown.Item>
            <NavDropdown.Item href='/newsletter'>Newsletter</NavDropdown.Item>
          </NavDropdown> */}
          <Nav.Link href='/newsletter'>Newsletter</Nav.Link>
          <NavDropdown title='Company' id='company-nav-dropdown'>
            <NavDropdown.Item href='/about'>About Sadhana</NavDropdown.Item>
            <NavDropdown.Item href='/careers'>Careers</NavDropdown.Item>
            <NavDropdown.Item href='/roadmap'>Roadmap</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Resources' id='resources-nav-dropdown'>
            <NavDropdown.Item href='/videos'>
              Motivational Videos
            </NavDropdown.Item>
            <NavDropdown.Item href='/music'>Music</NavDropdown.Item>
          </NavDropdown>
          {/* <NavDropdown title='Community' id='community-nav-dropdown'>
            <NavDropdown.Item href='/community'>Community</NavDropdown.Item>
            <NavDropdown.Item href='/NFTs'>NFT Collection</NavDropdown.Item>
          </NavDropdown> */}
          {!session ? (
            <Nav.Link onClick={() => signIn()}>Sign In</Nav.Link>
          ) : (
            <NavDropdown title={`@${session.user.name}`} id='user-nav-dropdown'>
              <NavDropdown.Item href='/dashboard'>Dashboard</NavDropdown.Item>
              <NavDropdown.Item href='/settings'>Settings</NavDropdown.Item>
              <NavDropdown.Item onClick={() => signOut()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
