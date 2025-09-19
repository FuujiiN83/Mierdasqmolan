'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AdSlot } from './AdSlot';
import { SocialIcons } from './SocialIcons';
import { siteConfig } from '@/config/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      {/* Ad space before footer */}
      <div className="py-8">
        <AdSlot position="footer" size="leaderboard" className="text-center" />
      </div>

      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="MQM Web Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold font-potta-one text-header-purple">MQM Web</h3>
                <p className="text-sm text-gray-500">Las mejores ofertas</p>
              </div>
            </div>
            <p className="text-gray-600 font-preahvihear mb-4 max-w-md">
              Descubre las mejores ofertas y productos destacados. Todo lo que mola en un solo lugar, 
              cuidadosamente seleccionado para ti.
            </p>
            
            {/* Social Icons */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Síguenos en redes sociales:</p>
              <SocialIcons size="md" />
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-800">
                <strong>Aviso de afiliación:</strong> {siteConfig.affiliate.disclaimer}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/destacados" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Destacados
                </Link>
              </li>
              <li>
                <Link href="/categoria/viral" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Viral
                </Link>
              </li>
              <li>
                <Link href="/categoria/random" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Random
                </Link>
              </li>
              <li>
                <Link href="/categoria/ofertas" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Ofertas
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Información</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/afiliados" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Política de Afiliación
                </Link>
              </li>
              <li>
                <Link href="/legal/privacidad" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Cookies
                </Link>
              </li>
                            <li>
                <Link href="/legal/terminos" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Términos de uso
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).showCookieSettings) {
                      (window as any).showCookieSettings();
                    }
                  }}
                  className="text-gray-600 hover:text-primary-600 transition-colors text-left w-full"
                >
                  ⚙️ Configuración de cookies
                </button>
              </li>
 
            </ul>
          </div>
        </div>


        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-center items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {currentYear} MQM Web. Hecho con ❤️ para los que saben lo que mola.
          </p>
        </div>
      </div>
    </footer>
  );
}
