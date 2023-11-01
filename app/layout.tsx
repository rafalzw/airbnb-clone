import React from 'react';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import RentModal from '@/app/components/modals/RentModal';
import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import ToasterProvider from '@/app/providers/ToasterProvider';
import getCurrentUser from '@/app/actions/getCurrentUser';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
};

export default async function RootLayout(
  {
    children,
  }: {
    children: React.ReactNode
  }) {
  const currentUser = await getCurrentUser();
  return (
    <html lang='en'>
    <body className={font.className}>
    <ClientOnly>
      <ToasterProvider />
      <RentModal />
      <RegisterModal />
      <LoginModal />
      <Navbar currentUser={currentUser} />
    </ClientOnly>
    {children}</body>
    </html>
  );
}
