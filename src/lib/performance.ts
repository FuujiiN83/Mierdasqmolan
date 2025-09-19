// Utilidades de rendimiento para optimizar la carga

export const preloadCriticalResources = () => {
  // Preload de fuentes críticas
  if (typeof document !== 'undefined') {
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.href = '/fonts/inter-var.woff2';
    fontPreload.as = 'font';
    fontPreload.type = 'font/woff2';
    fontPreload.crossOrigin = 'anonymous';
    document.head.appendChild(fontPreload);
  }
};

export const lazyLoadNonCriticalScripts = () => {
  // Cargar scripts no críticos de forma diferida
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      // Cargar scripts de terceros solo cuando el navegador esté inactivo
      const scripts = document.querySelectorAll('script[data-lazy]');
      scripts.forEach((script) => {
        const newScript = document.createElement('script');
        newScript.src = script.getAttribute('data-src') || '';
        newScript.async = true;
        script.parentNode?.replaceChild(newScript, script);
      });
    });
  }
};

export const optimizeImages = () => {
  // Optimización de imágenes lazy loading
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach((img) => imageObserver.observe(img));
  }
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
