import type { Metadata } from 'next';
import { BRAND } from '@/lib/seo';

const descripcion = `Términos y condiciones de uso de ${BRAND}: titularidad del sitio, responsabilidad y propiedad de los contenidos.`;

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: descripcion,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/legal/terminos',
  },
  openGraph: {
    title: 'Aviso Legal',
    description: descripcion,
    url: '/legal/terminos',
    siteName: BRAND,
    locale: 'es_ES',
    type: 'website',
  },
};

export default function TerminosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Aviso Legal</h1>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <p className="text-blue-800 dark:text-blue-200 mb-0">
            En cumplimiento de lo establecido en la Ley 34/2002, de 11 de julio, de Servicios de la 
            Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se proporciona la siguiente 
            información legal del sitio web.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Titularidad del sitio web</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          En cumplimiento de lo establecido en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad 
          de la Información y de Comercio Electrónico (LSSI-CE), se informa que el presente sitio web, 
          accesible desde la URL{' '}
          <a 
            href="https://www.mierdasquemolan.com" 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
          >
            www.mierdasquemolan.com
          </a>{' '}
          (en adelante, "el Sitio Web"), es titularidad de:
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Francisco Osma Redondo</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                <strong>DNI:</strong> 02671938M<br />
                <strong>Domicilio:</strong> C/ Las Violetas 4, 45646, San Román de los Montes (Toledo)
              </p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Aránzazu Alonso San Segundo</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                <strong>DNI:</strong> 50734460W<br />
                <strong>Domicilio:</strong> C/ Camino 1B, 45646, San Román de los Montes (Toledo)
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Joaquín Quílez López</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                <strong>DNI:</strong> 50872153V<br />
                <strong>Domicilio:</strong> C/ Camino 1B, 45646, San Román de los Montes (Toledo)
              </p>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            (en adelante, conjuntamente "los Titulares")
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Datos de contacto</h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Correo electrónico:</strong>{' '}
            <a 
              href="mailto:info@mierdasquemolan.com" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
            >
              info@mierdasquemolan.com
            </a>
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Objeto</h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
          <p className="text-green-800 dark:text-green-200 mb-0">
            El Sitio Web tiene como finalidad la publicación de contenidos relacionados con productos 
            de terceros mediante enlaces de afiliación (principalmente Amazon y otras plataformas similares).
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Condiciones de uso</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          El acceso y navegación en el Sitio Web implica la aceptación de los presentes términos. 
          El usuario se compromete a utilizar el Sitio Web de forma lícita, sin infringir la normativa 
          vigente ni los derechos de terceros.
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">Obligaciones del usuario</h3>
          <ul className="text-amber-800 dark:text-amber-200 list-disc list-inside space-y-1 text-sm">
            <li>Utilizar el Sitio Web de conformidad con la ley y las presentes condiciones</li>
            <li>No realizar actividades que puedan dañar, inutilizar o sobrecargar el Sitio Web</li>
            <li>No introducir virus, código malicioso o cualquier elemento nocivo</li>
            <li>Respetar los derechos de propiedad intelectual e industrial</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Propiedad intelectual e industrial</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Todos los contenidos del Sitio Web (textos, imágenes, código fuente, diseño, etc.) están 
          protegidos por la normativa de propiedad intelectual e industrial.
        </p>
        
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-800 dark:text-red-200 mb-0">
            <strong>Prohibido:</strong> Queda prohibida la reproducción total o parcial sin autorización 
            expresa de los Titulares.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Exclusión de responsabilidad</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🔗 Enlaces a sitios de terceros</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              El Sitio Web contiene enlaces de afiliados hacia productos de terceros. Los Titulares 
              no se responsabilizan del correcto funcionamiento, disponibilidad o legalidad de dichos sitios.
            </p>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⚠️ Limitación de responsabilidad</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Los Titulares tampoco asumen responsabilidad por los daños derivados del uso del Sitio Web, 
              salvo en los términos previstos por la legislación aplicable.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📱 Disponibilidad del servicio</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Los Titulares no garantizan la disponibilidad continua del Sitio Web y se reservan el 
              derecho de suspender temporalmente el acceso por razones técnicas o de mantenimiento.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Enlaces de afiliados</h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-3">🤝 Programa de afiliación</h3>
          <p className="text-purple-800 dark:text-purple-200 mb-3">
            El Sitio Web participa en programas de afiliación. Esto significa que, al hacer clic en 
            ciertos enlaces y realizar una compra en la web de destino (como Amazon), los Titulares 
            pueden recibir una comisión.
          </p>
          <div className="bg-purple-100 dark:bg-purple-800/30 rounded-lg p-3">
            <p className="text-purple-800 dark:text-purple-200 text-sm mb-0">
              <strong>Importante:</strong> Esta comisión no supone un coste adicional para el usuario. 
              El precio del producto sigue siendo el mismo.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Modificaciones</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Los Titulares se reservan el derecho de modificar en cualquier momento las condiciones 
          generales de uso del Sitio Web. Dichas modificaciones serán válidas desde su publicación 
          en el Sitio Web.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Legislación aplicable y jurisdicción</h2>
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Legislación aplicable:</strong> La relación entre usuarios y Titulares se regirá 
            por la normativa española.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-0">
            <strong>Jurisdicción:</strong> Para la resolución de cualquier controversia, las partes 
            se someten a los juzgados y tribunales del domicilio de los Titulares, renunciando 
            expresamente a cualquier otro fuero que pudiera corresponderles.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">📞 Contacto</h3>
          <p className="text-blue-800 dark:text-blue-200 mb-0">
            Para cualquier consulta relacionada con este Aviso Legal, puedes contactar con nosotros 
            en{' '}
            <a 
              href="mailto:info@mierdasquemolan.com" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
            >
              info@mierdasquemolan.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}


















