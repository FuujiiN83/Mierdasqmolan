import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal de MQM Web - Términos y condiciones de uso del sitio web',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TerminosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Aviso Legal</h1>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <p className="text-blue-800 mb-0">
            En cumplimiento de lo establecido en la Ley 34/2002, de 11 de julio, de Servicios de la 
            Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se proporciona la siguiente 
            información legal del sitio web.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Titularidad del sitio web</h2>
        <p className="text-gray-700 mb-4">
          En cumplimiento de lo establecido en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad 
          de la Información y de Comercio Electrónico (LSSI-CE), se informa que el presente sitio web, 
          accesible desde la URL{' '}
          <a 
            href="https://www.mierdasquemolan.com" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            www.mierdasquemolan.com
          </a>{' '}
          (en adelante, "el Sitio Web"), es titularidad de:
        </p>

        <div className="bg-gray-50 border rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-3">
              <h3 className="font-semibold text-gray-900">Francisco Osma Redondo</h3>
              <p className="text-gray-700 text-sm">
                <strong>DNI:</strong> 02671938M<br />
                <strong>Domicilio:</strong> C/ Las Violetas 4, 45646, San Román de los Montes (Toledo)
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-3">
              <h3 className="font-semibold text-gray-900">Aránzazu Alonso San Segundo</h3>
              <p className="text-gray-700 text-sm">
                <strong>DNI:</strong> 50734460W<br />
                <strong>Domicilio:</strong> C/ Camino 1B, 45646, San Román de los Montes (Toledo)
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900">Joaquín Quílez López</h3>
              <p className="text-gray-700 text-sm">
                <strong>DNI:</strong> 50872153V<br />
                <strong>Domicilio:</strong> C/ Camino 1B, 45646, San Román de los Montes (Toledo)
              </p>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mt-4 pt-4 border-t border-gray-200">
            (en adelante, conjuntamente "los Titulares")
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Datos de contacto</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-gray-700">
            <strong>Correo electrónico:</strong>{' '}
            <a 
              href="mailto:info@mierdasquemolan.com" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              info@mierdasquemolan.com
            </a>
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Objeto</h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 mb-0">
            El Sitio Web tiene como finalidad la publicación de contenidos relacionados con productos 
            de terceros mediante enlaces de afiliación (principalmente Amazon y otras plataformas similares).
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Condiciones de uso</h2>
        <p className="text-gray-700 mb-4">
          El acceso y navegación en el Sitio Web implica la aceptación de los presentes términos. 
          El usuario se compromete a utilizar el Sitio Web de forma lícita, sin infringir la normativa 
          vigente ni los derechos de terceros.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-amber-900 mb-2">Obligaciones del usuario</h3>
          <ul className="text-amber-800 list-disc list-inside space-y-1 text-sm">
            <li>Utilizar el Sitio Web de conformidad con la ley y las presentes condiciones</li>
            <li>No realizar actividades que puedan dañar, inutilizar o sobrecargar el Sitio Web</li>
            <li>No introducir virus, código malicioso o cualquier elemento nocivo</li>
            <li>Respetar los derechos de propiedad intelectual e industrial</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Propiedad intelectual e industrial</h2>
        <p className="text-gray-700 mb-4">
          Todos los contenidos del Sitio Web (textos, imágenes, código fuente, diseño, etc.) están 
          protegidos por la normativa de propiedad intelectual e industrial.
        </p>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800 mb-0">
            <strong>Prohibido:</strong> Queda prohibida la reproducción total o parcial sin autorización 
            expresa de los Titulares.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Exclusión de responsabilidad</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">🔗 Enlaces a sitios de terceros</h3>
            <p className="text-gray-700 text-sm">
              El Sitio Web contiene enlaces de afiliados hacia productos de terceros. Los Titulares 
              no se responsabilizan del correcto funcionamiento, disponibilidad o legalidad de dichos sitios.
            </p>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">⚠️ Limitación de responsabilidad</h3>
            <p className="text-gray-700 text-sm">
              Los Titulares tampoco asumen responsabilidad por los daños derivados del uso del Sitio Web, 
              salvo en los términos previstos por la legislación aplicable.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">📱 Disponibilidad del servicio</h3>
            <p className="text-gray-700 text-sm">
              Los Titulares no garantizan la disponibilidad continua del Sitio Web y se reservan el 
              derecho de suspender temporalmente el acceso por razones técnicas o de mantenimiento.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Enlaces de afiliados</h2>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-purple-900 mb-3">🤝 Programa de afiliación</h3>
          <p className="text-purple-800 mb-3">
            El Sitio Web participa en programas de afiliación. Esto significa que, al hacer clic en 
            ciertos enlaces y realizar una compra en la web de destino (como Amazon), los Titulares 
            pueden recibir una comisión.
          </p>
          <div className="bg-purple-100 rounded-lg p-3">
            <p className="text-purple-800 text-sm mb-0">
              <strong>Importante:</strong> Esta comisión no supone un coste adicional para el usuario. 
              El precio del producto sigue siendo el mismo.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Modificaciones</h2>
        <p className="text-gray-700 mb-6">
          Los Titulares se reservan el derecho de modificar en cualquier momento las condiciones 
          generales de uso del Sitio Web. Dichas modificaciones serán válidas desde su publicación 
          en el Sitio Web.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Legislación aplicable y jurisdicción</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-gray-700 mb-2">
            <strong>Legislación aplicable:</strong> La relación entre usuarios y Titulares se regirá 
            por la normativa española.
          </p>
          <p className="text-gray-700 mb-0">
            <strong>Jurisdicción:</strong> Para la resolución de cualquier controversia, las partes 
            se someten a los juzgados y tribunales del domicilio de los Titulares, renunciando 
            expresamente a cualquier otro fuero que pudiera corresponderles.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">📞 Contacto</h3>
          <p className="text-blue-800 mb-0">
            Para cualquier consulta relacionada con este Aviso Legal, puedes contactar con nosotros 
            en{' '}
            <a 
              href="mailto:info@mierdasquemolan.com" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              info@mierdasquemolan.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}




