import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { CartProvider } from './_context/cart'
import AuthProvider from './_providers/auth'
import { Toaster } from '@/app/_components/ui/sonner'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>

        <Toaster />
      </body>
    </html>
  )
}
