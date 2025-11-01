import './globals.css';

export const metadata = {
  title: 'Telegram Clone',
  description: 'A modern chat application built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
} 