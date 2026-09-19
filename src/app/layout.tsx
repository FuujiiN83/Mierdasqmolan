import type { Metadata } from 'next';
import { Potta_One, Preahvihear } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { getAvailableCategories } from '@/lib/data';
import { Footer } from '@/components/Footer';
import { CookieConsentBanner } from '@/components/CookieConsentBanner';
import Analytics from '@/components/Analytics';
import { siteConfig } from '@/config/site';
import {
  BRAND,
  generateOrganizationStructuredData,
  generateWebsiteStructuredData,
  toJsonLd,
} from '@/lib/seo';

// Aquí se declaraba también `Inter`, que se descargaba en todas las páginas sin
// aplicarse a ningún `className` (el <body> usa Preahvihear). Era una petición
// de fuente de peso muerto en la ruta crítica.

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
    // El título por defecto lo redefine la portada (`page.tsx`); este es el
    // que hereda cualquier página que no declare el suyo.
    default: `${BRAND}, ${siteConfig.tagline.toLowerCase()}`,
    template: `%s | ${BRAND}`,
  },
  description: "Regalos originales y frikis para parejas, fiestas y cumpleaños. Más de 400 ideas para sorprender. Entra y encuentra tu regalo favorito.",
  keywords: [
    'Regalos originales',
    'regalos divertidos',
    'regalos frikis',
    'regalos para parejas',
    'regalos originales para parejas',
    'regalos para cumpleaños',
    'regalos originales para casa'
  ],
  authors: [{ name: 'Deep code studio' }],
  creator: 'Deep code studio',
  publisher: 'Deep code studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  // NO se pone `alternates.canonical` aquí. Estaba puesto a la portada, y las
  // páginas que no definían el suyo lo heredaban: /categoria/blog, los
  // artículos del blog y las cuatro legales declaraban como canónica la
  // portada, así que Google las trataba como duplicadas y no las indexaba.
  // La canónica se define en cada página (o no hay, que es mucho menos malo
  // que una equivocada).
  openGraph: {
    title: `${BRAND}, ${siteConfig.tagline.toLowerCase()}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: BRAND,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: BRAND,
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND}, ${siteConfig.tagline.toLowerCase()}`,
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
  // Search Console NO está verificado: había un `verification: { google: '' }`
  // que Next omitía por estar vacío, así que no había ni etiqueta ni
  // verificación. Hay que pegar aquí el token real de Search Console:
  // verification: { google: '<token>' },
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
        
        {/* Viewport para compatibilidad móvil - CRÍTICO para SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        
        {/*
          Aquí había dns-prefetch/preconnect a googletagmanager.com,
          google-analytics.com y clarity.ms. Se han quitado: la analítica ahora
          solo se carga si el usuario acepta, así que estos hints solo servían
          para abrir conexión con Google y Microsoft ANTES de que decidiera, sin
          cargar nada. Con el consentimiento previo, además, ya no aceleran nada.
        */}

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/*
          Aquí había meta tags de SEO escritos a mano (title, description,
          keywords, robots, author...). Estaban HARDCODEADOS a los valores de la
          portada y se emitían en TODAS las páginas, a la vez que el
          `export const metadata` de arriba emitía los suyos. Resultado: cada
          página servía dos <meta name="description"> —el de la portada primero—
          y las descripciones propias de producto, blog y legales quedaban
          tapadas. Ahora el `metadata` es la única fuente.
        */}

        {/* Hreflang - Solo español por ahora, pero preparado para futuras versiones multiidioma */}
        {/* Si en el futuro se añaden más idiomas, descomentar y configurar:
        <link rel="alternate" hreflang="es" href="https://www.mierdasquemolan.com" />
        <link rel="alternate" hreflang="x-default" href="https://www.mierdasquemolan.com" />
        */}
        
        {/*
          Schema.org: WebSite + Organization.

          Los dos bloques estaban escritos a mano aquí y con datos que no salían
          de `siteConfig` (nombres distintos entre ellos, URLs duplicadas). Ahora
          se generan desde `lib/seo.ts`, que es la única fuente.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: toJsonLd(generateWebsiteStructuredData()),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: toJsonLd(generateOrganizationStructuredData()),
          }}
        />
      </head>
      <body className={`${preahvihear.className} ${pottaOne.variable} ${preahvihear.variable} antialiased bg-gray-50 dark:bg-gray-900`}>
        <div className="min-h-screen flex flex-col">
          {/*
            Las categorías se calculan aquí, en el servidor, y se pasan al
            Header. Antes el menú las pedía por su cuenta desde un componente de
            cliente, y eso metía `data/products.json` (1,9 MB) en el bundle de
            cliente de TODAS las páginas.
          */}
          <Header categories={getAvailableCategories()} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        
        {/* Banner de consentimiento de cookies */}
        <CookieConsentBanner />
        
        {/* Analytics optimizado - Carga diferida para no bloquear LCP/FCP */}
        <Analytics />
      </body>
    </html>
  );
}
