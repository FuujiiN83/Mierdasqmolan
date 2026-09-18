import type { Metadata } from 'next';

/**
 * Este layout existe solo para dar metadatos a /categoria/blog.
 *
 * Su `page.tsx` es un componente de cliente ('use client') y esos no pueden
 * exportar `metadata`, así que sin este fichero la página no definía canónica
 * propia y heredaba la de la portada: Google la trataba como duplicada de la
 * home y no la indexaba, justo después de conseguir que los artículos fuesen
 * accesibles.
 */
export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Historias, curiosidades y guías sobre regalos originales, frikis y cosas que molan. Ideas de regalo y contenido del blog de Mierdas que molan.',
  alternates: {
    canonical: '/categoria/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
