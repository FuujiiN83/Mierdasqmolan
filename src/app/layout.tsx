import type { Metadata } from 'next';
import { Inter, Potta_One, Preahvihear } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieConsentBanner } from '@/components/CookieConsentBanner';
import { siteConfig } from '@/config/site';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

const pottaOne = Potta_One({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-potta-one',
  display: 'swap',
});

const preahvihear = Preahvihear({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-preahvihear',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'ofertas',
    'productos',
    'afiliación',
    'chollos',
    'descuentos',
    'compras',
    'tecnología',
    'hogar',
    'moda',
    'gaming'
  ],
  authors: [{ name: 'MQM Web' }],
  creator: 'MQM Web',
  publisher: 'MQM Web',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@mqmweb',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '', // Añadir Google Search Console verification
    yandex: '', // Añadir Yandex verification si aplica
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        
               {/* Google Analytics temporalmente deshabilitado para debugging */}
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://amazon.es" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
      </head>
      <body className={`${preahvihear.className} ${pottaOne.variable} ${preahvihear.variable} antialiased bg-gray-50 dark:bg-gray-900`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        
        {/* Banner de consentimiento de cookies */}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
