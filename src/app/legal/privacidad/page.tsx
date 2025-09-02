import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de MQM Web - Información sobre el tratamiento de datos personales',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <p className="text-blue-800 mb-0">
            En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), 
            te informamos sobre el tratamiento de los datos personales que puedas facilitarnos a través 
            de este sitio web.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Responsables del tratamiento</h2>
        <p className="text-gray-700 mb-4">
          De conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), 
          se informa que los responsables del tratamiento de los datos recogidos a través del presente 
          Sitio Web son:
        </p>

        <div className="bg-gray-50 border rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-3">
              <h3 className="font-semibold text-gray-900">Francisco Osma Redondo</h3>
              <p className="text-gray-700 text-sm">
                <strong>DNI:</strong> 02671938M<br />
                <strong>Dirección:</strong> C/ Las Violetas 4, 45646 San Román de los Montes (Toledo)
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-3">
              <h3 className="font-semibold text-gray-900">Aránzazu Alonso San Segundo</h3>
              <p className="text-gray-700 text-sm">
                <strong>DNI:</strong> 50734460W<br />
                <strong>Dirección:</strong> C/ Camino 1B, 45646 San Román de los Montes (Toledo)
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900">Joaquín Quílez López</h3>
              <p className="text-gray-700 text-sm">
                <strong>DNI:</strong> 50872153V<br />
                <strong>Dirección:</strong> C/ Camino 1B, 45646 San Román de los Montes (Toledo)
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-700">
              <strong>Correo de contacto:</strong>{' '}
              <a 
                href="mailto:info@mierdasquemolan.com" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                info@mierdasquemolan.com
              </a>
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Datos que se tratan</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-amber-800 mb-0">
            <strong>Importante:</strong> El Sitio Web no dispone de formularios de contacto ni de suscripción. 
            La única vía de comunicación es el correo electrónico proporcionado por el usuario al contactar 
            directamente con la dirección indicada.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Finalidad</h2>
        <p className="text-gray-700 mb-6">
          Los datos facilitados voluntariamente por el usuario a través del correo electrónico se tratarán 
          con la finalidad de responder a la consulta o solicitud planteada.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Legitimación</h2>
        <p className="text-gray-700 mb-6">
          La base legal para el tratamiento es el consentimiento del usuario, otorgado al enviar voluntariamente 
          un correo electrónico.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Conservación</h2>
        <p className="text-gray-700 mb-6">
          Los datos se conservarán únicamente el tiempo necesario para atender la consulta planteada y durante 
          los plazos legales que resulten aplicables.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Destinatarios</h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 mb-0">
            <strong>No se cederán datos a terceros</strong>, salvo obligación legal.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Derechos de los usuarios</h2>
        <p className="text-gray-700 mb-4">
          Los usuarios podrán ejercer sus derechos dirigiendo un escrito al correo{' '}
          <a 
            href="mailto:info@mierdasquemolan.com" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            info@mierdasquemolan.com
          </a>, 
          indicando en el asunto <strong>"Protección de Datos"</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🔍 Derecho de acceso</h3>
            <p className="text-gray-600 text-sm">
              Conocer qué datos personales tenemos sobre ti y cómo los tratamos.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">✏️ Derecho de rectificación</h3>
            <p className="text-gray-600 text-sm">
              Corregir datos inexactos o incompletos.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🗑️ Derecho de supresión</h3>
            <p className="text-gray-600 text-sm">
              Solicitar la eliminación de tus datos personales.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🚫 Derecho de oposición</h3>
            <p className="text-gray-600 text-sm">
              Oponerte al tratamiento de tus datos personales.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">⏸️ Derecho de limitación</h3>
            <p className="text-gray-600 text-sm">
              Solicitar la limitación del tratamiento de tus datos.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">📦 Derecho de portabilidad</h3>
            <p className="text-gray-600 text-sm">
              Recibir tus datos en un formato estructurado y de uso común.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Medidas de seguridad</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 mb-0">
            Los Titulares aplican las medidas de seguridad técnicas y organizativas necesarias para 
            garantizar la confidencialidad e integridad de los datos tratados conforme a la normativa 
            vigente de protección de datos.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Contacto para ejercer derechos</h3>
          <p className="text-gray-700 mb-2">
            Para ejercer cualquiera de estos derechos, envía un email a:
          </p>
          <p className="text-gray-900 font-semibold">
            <a 
              href="mailto:info@mierdasquemolan.com?subject=Protección de Datos" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              info@mierdasquemolan.com
            </a>
          </p>
          <p className="text-gray-600 text-sm mt-2">
            <strong>Asunto:</strong> Protección de Datos
          </p>
        </div>
      </div>
    </div>
  );
}



