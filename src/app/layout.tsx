import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Container, Stack } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Solace Candidate Assignment',
  description: 'Show us what you got',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container maxWidth="xl">
          <Stack alignItems="start" py={2} spacing={2} width="100%">
            {children}
          </Stack>
        </Container>
      </body>
    </html>
  );
}
