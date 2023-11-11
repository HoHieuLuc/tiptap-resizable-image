'use client';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import classes from './Shell.module.css';

interface Props {
  children: React.ReactNode;
}

const Shell = ({ children }: Props) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding='md'
    >
      <AppShell.Header>
        <Header navbarOpened={opened} onNavbarToggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar py='md'>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main className={classes.main}>
        {children}
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
};

export default Shell;
