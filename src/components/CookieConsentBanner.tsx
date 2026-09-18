'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  readConsent,
  saveConsent,
  onOpenConsentSettings,
  ACCEPT_ALL,
  DENY_ALL,
  type CookieSettings,
} from '@/lib/consent';

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>(DENY_ALL);

  useEffect(() => {
    const saved = readConsent();

    // Si aún no ha elegido nada, se muestra el banner
    if (!saved) {
      setShowBanner(true);
      return;
    }

    setCookieSettings(saved);
    applyCookieSettings(saved);
  }, []);

  // El botón "Configuración de cookies" del footer pide reabrir el panel.
  // Hace falta para poder retirar el consentimiento, que el RGPD exige tan
  // fácil como darlo.
  useEffect(() => {
    return onOpenConsentSettings(() => {
      setShowBanner(true);
      setShowSettings(true);
    });
  }, []);

  const applyCookieSettings = (settings: CookieSettings) => {
    if (typeof window !== 'undefined' && window.gtag) {
      // Configurar todos los tipos de consentimiento
      window.gtag('consent', 'update', {
        analytics_storage: settings.analytics ? 'granted' : 'denied',
        ad_storage: settings.marketing ? 'granted' : 'denied',
        personalization_storage: settings.personalization ? 'granted' : 'denied',
        functionality_storage: 'granted', // Siempre permitida (necesaria)
        security_storage: 'granted' // Siempre permitida (necesaria)
      });
    }

  };

  // `saveConsent` persiste y emite el evento al que se suscribe Analytics,
  // así que la analítica solo arranca después de que el usuario decida.
  const acceptAll = () => {
    setCookieSettings(ACCEPT_ALL);
    saveConsent(ACCEPT_ALL);
    applyCookieSettings(ACCEPT_ALL);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptNecessaryOnly = () => {
    setCookieSettings(DENY_ALL);
    saveConsent(DENY_ALL);
    applyCookieSettings(DENY_ALL);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptCustom = () => {
    const settings: CookieSettings = { ...cookieSettings, necessary: true };
    saveConsent(settings);
    applyCookieSettings(settings);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSettingChange = (setting: keyof CookieSettings) => {
    if (setting === 'necessary') return; // No se puede cambiar
    
    setCookieSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      
      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-primary-500 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {!showSettings ? (
            // Vista principal del banner
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <span className="text-2xl">🍪</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      ¡Usamos cookies para mejorar tu experiencia!
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Utilizamos cookies propias y de terceros para analizar el tráfico, personalizar contenido 
                      y mostrarte publicidad relevante. Puedes aceptar todas las cookies, solo las necesarias, 
                      o personalizar tu configuración.{' '}
                      <Link 
                        href="/legal/cookies" 
                        className="text-primary-600 hover:text-primary-700 underline font-medium"
                        target="_blank"
                      >
                        Más información
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  ⚙️ Personalizar
                </button>
                <button
                  onClick={acceptNecessaryOnly}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Solo necesarias
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  ✅ Aceptar todas
                </button>
              </div>
            </div>
          ) : (
            // Vista de configuración personalizada
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  🔧 Configuración de cookies
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Cerrar configuración"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Cookies Necesarias */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">🔧 Cookies Necesarias</h4>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">Siempre activas</span>
                      <div className="relative inline-block w-10 h-6 bg-primary-600 rounded-full">
                        <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full transition-transform" />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Esenciales para el funcionamiento básico del sitio web, navegación y acceso a áreas seguras.
                  </p>
                </div>

                {/* Cookies de Análisis */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">📊 Cookies de Análisis</h4>
                    <button
                      onClick={() => handleSettingChange('analytics')}
                      className={`relative inline-block w-10 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        cookieSettings.analytics ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          cookieSettings.analytics ? 'translate-x-4' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Google Analytics para entender cómo usas nuestro sitio y mejorar tu experiencia.
                  </p>
                </div>

                {/* Cookies de Personalización */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">⚙️ Cookies de Personalización</h4>
                    <button
                      onClick={() => handleSettingChange('personalization')}
                      className={`relative inline-block w-10 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        cookieSettings.personalization ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          cookieSettings.personalization ? 'translate-x-4' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Recordar tus preferencias como idioma, región y configuraciones personalizadas.
                  </p>
                </div>

                {/* Cookies de Marketing */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">📢 Cookies de Marketing</h4>
                    <button
                      onClick={() => handleSettingChange('marketing')}
                      className={`relative inline-block w-10 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        cookieSettings.marketing ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          cookieSettings.marketing ? 'translate-x-4' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Mostrarte anuncios relevantes basados en tus intereses y comportamiento de navegación.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Cancelar
                </button>
                <button
                  onClick={acceptCustom}
                  className="px-6 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  💾 Guardar configuración
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Tipos para Google Analytics
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      parameters?: Record<string, any>
    ) => void;
  }
}
