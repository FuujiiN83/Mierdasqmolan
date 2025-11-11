'use client';

import Script from 'next/script';

export default function Analytics() {
  return (
    <>
      {/* Google Analytics 4 - Optimizado para INP: diferido y con prioridad baja */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FCD8D2QZEZ"
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
            gtag('config', 'G-FCD8D2QZEZ');
          `,
        }}
      />

      {/* Microsoft Clarity - Ya optimizado con lazyOnload */}
      <Script
        id="clarity"
        strategy="lazyOnload"
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
    </>
  );
}

