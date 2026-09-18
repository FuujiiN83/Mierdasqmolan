'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';
import { readConsent, onConsentChange } from '@/lib/consent';

const GA_ID = siteConfig.analytics.googleAnalyticsId;
const CLARITY_ID = 'tmauglnsdb';

/**
 * Analítica con consentimiento previo.
 *
 * ANTES esto cargaba GA4 y Microsoft Clarity nada más entrar, sin mirar si el
 * usuario había aceptado. Clarity además graba la sesión (session replay), así
 * que poner cookies y grabar antes del consentimiento es una violación del
 * RGPD, no un detalle técnico.
 *
 * AHORA no se carga nada hasta que `analytics` está concedido en el banner.
 * Si el usuario elige "Solo necesarias", no sale ni una petición a Google ni a
 * Microsoft. El coste: quien no acepta no cuenta en las métricas (que es
 * justamente lo que dice la ley).
 */
export default function Analytics() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    // Consentimiento ya guardado de una visita anterior
    setAnalyticsAllowed(readConsent()?.analytics === true);

    // Y a partir de aquí, reaccionar a lo que elija ahora
    return onConsentChange((settings) => {
      setAnalyticsAllowed(settings.analytics === true);
    });
  }, []);

  // Clarity se inyecta a mano en vez de con <Script> porque solo debe existir
  // si hay consentimiento, y puede aparecer en mitad de la sesión.
  useEffect(() => {
    if (!analyticsAllowed) return;

    const YA_CARGADO = 'clarity-script';
    if (document.getElementById(YA_CARGADO)) return;

    const script = document.createElement('script');
    script.id = YA_CARGADO;
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
    document.head.appendChild(script);
  }, [analyticsAllowed]);

  if (!analyticsAllowed) {
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 - diferido y con prioridad baja */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script
        id="ga4-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'update', {
              analytics_storage: 'granted',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            });
            gtag('config', '${GA_ID}');
          `,
        }}
      />
    </>
  );
}
