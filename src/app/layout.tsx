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
    'regalos originales',
    'regalos divertidos',
    'regalos para todos los públicos',
    'juguetes sexuales',
    'productos originales',
    'regalos curiosos',
    'regalos para parejas',
    'gadgets originales',
    'regalos únicos',
    'tienda de regalos',
    'ideas de regalo',
    'regalos creativos',
    'productos divertidos',
    'regalos sorpresa',
    'ofertas',
    'chollos',
    'descuentos',
    'Amazon afiliados'
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
        
        {/* DNS Prefetch y Preconnect para dominios críticos */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://scripts.clarity.ms" />
        
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/* Schema.org structured data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Mierdas que molan - Regalos originales y mucho más",
              "alternateName": "MQM",
              "url": "https://www.mierdasquemolan.com",
              "description": "Regalos originales frikis, para parejas, fiestas, grandes ratos de diversión y mucho. Entra y busca tu regalo favorito.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.mierdasquemolan.com/?search={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Mierdas que molan - Regalos originales y mucho más",
                "url": "https://www.mierdasquemolan.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.mierdasquemolan.com/logo.png"
                }
              }
            })
          }}
        />
        
        {/* Schema.org structured data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Mierdas que molan",
              "alternateName": "MQM",
              "url": "https://www.mierdasquemolan.com",
              "logo": "https://www.mierdasquemolan.com/logo.png",
              "description": "Tienda online de regalos originales y divertidos para todos los públicos",
              "sameAs": [
                "https://www.facebook.com/mierdasquemolan",
                "https://www.instagram.com/mierdasquemolan"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@mierdasquemolan.com",
                "availableLanguage": "Spanish"
              }
            })
          }}
        />
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
        
        {/* Google Analytics - Cargado con estrategia afterInteractive para no bloquear */}
        <Script
          id="gtag-base"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-FCD8D2QZEZ"
        />
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FCD8D2QZEZ', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        
        {/* Microsoft Clarity - Cargado con estrategia afterInteractive */}
        <Script
          id="clarity-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "tmauglnsdb");
            `,
          }}
        />
      </body>
    </html>
  );
}
