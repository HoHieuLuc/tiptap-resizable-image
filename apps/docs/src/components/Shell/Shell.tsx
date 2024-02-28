'use client';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import classes from './Shell.module.css';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const Shell = ({ children }: Props) => {
  const [opened, { toggle, close }] = useDisclosure();
  const pathname = usePathname();
  useEffect(() => {
    close();
  }, [pathname]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding='md'
    >
      <AppShell.Header zIndex={102}>
        <Header navbarOpened={opened} onNavbarToggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar py='md' zIndex={102}>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main className={classes.main}>
        <div className='container'>{children}</div>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
};

export default Shell;
