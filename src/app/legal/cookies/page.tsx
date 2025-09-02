import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies de MQM Web - Información sobre el uso de cookies en nuestro sitio web',
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Cookies</h1>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <p className="text-blue-800 mb-0">
            Si quieres saber más sobre el uso de cookies que realiza este sitio web{' '}
            <strong>https://mierdasquemolan.com</strong>, estás en el lugar indicado. A continuación, 
            vamos a explicarte qué son exactamente las cookies; qué tipo de cookies utilizamos y para qué; 
            y cómo puedes ejercer tu derecho para configurar tu navegador y desestimar el uso de cualquiera de ellas.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 mb-0">
            <strong>Importante:</strong> Si decides no utilizar algunas cookies, este sitio web puede 
            no funcionar perfectamente, afectando a tu experiencia de usuario.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">¿Qué es una cookie?</h2>
        <p className="text-gray-700 mb-4">
          Una cookie es un fichero que se descarga en tu ordenador al acceder a determinadas páginas web o blogs.
        </p>
        <p className="text-gray-700 mb-4">
          Las cookies permiten a esa página, entre otras cosas, almacenar y recuperar información sobre tus 
          hábitos de navegación o de tu equipo, y dependiendo de la información que contengan y de la forma 
          en que utilices tu equipo, pueden utilizarse para reconocerte.
        </p>
        <p className="text-gray-700 mb-6">
          El navegador del usuario memoriza cookies en el disco duro solamente durante la sesión actual 
          ocupando un espacio de memoria mínimo y no perjudicando al ordenador. Las cookies no contienen 
          ninguna clase de información personal específica, y la mayoría de las mismas se borran del disco 
          duro al finalizar la sesión de navegador (las denominadas cookies de sesión).
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Aceptación de las cookies: Normativa vigente</h2>
        <p className="text-gray-700 mb-4">
          Al acceder a este sitio web, y de acuerdo a la normativa vigente en materia de protección de datos, 
          te informamos del uso de cookies, dándote la opción de aceptarlas expresamente y de acceder a más 
          información a través de esta Política de Cookies.
        </p>
        <p className="text-gray-700 mb-4">
          Debes saber que, en el caso de continuar navegando, estarás prestando tu consentimiento para el 
          empleo de estas cookies. Pero, en cualquier momento, podrás cambiar de opinión y bloquear su 
          utilización a través de tu navegador.
        </p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 mb-2">
            <strong>Para tu total tranquilidad</strong>, este sitio web cumple con lo estipulado en la normativa vigente:
          </p>
          <ul className="text-green-800 list-disc list-inside space-y-1">
            <li>El reglamento LSSI-CE (Ley de la sociedad de la información y del comercio electrónico)</li>
            <li>El RGPD (Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016)</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Tipos de cookies</h2>
        <p className="text-gray-700 mb-6">
          Para poder ofrecerte una mejor experiencia de usuario, obtener datos analíticos, almacenar y 
          recuperar información sobre tus hábitos de navegación o de tu equipo y desarrollar su actividad, 
          este sitio web utiliza cookies propias y de terceros.
        </p>

        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🔧 Cookies técnicas</h3>
            <p className="text-gray-700">
              Son aquellas que permiten al usuario la navegación a través de una página web, plataforma o 
              aplicación y la utilización de las diferentes opciones o servicios que en ella existan como, 
              por ejemplo, controlar el tráfico y la comunicación de datos, identificar la sesión, acceder 
              a partes de acceso restringido, recordar los elementos que integran un pedido, etc.
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">⚙️ Cookies de personalización</h3>
            <p className="text-gray-700">
              Son aquellas que permiten al usuario acceder al servicio con algunas características de 
              carácter general predefinidas en función de una serie de criterios en el terminal del usuario 
              como por ejemplo el idioma, el tipo de navegador, la configuración regional, etc.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📊 Cookies de análisis</h3>
            <p className="text-gray-700">
              Son aquellas que bien tratadas por nosotros o por terceros, nos permiten cuantificar el número 
              de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los 
              usuarios del servicio ofertado.
            </p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📢 Cookies publicitarias</h3>
            <p className="text-gray-700">
              Son aquellas que, bien tratadas por nosotros o por terceros, nos permiten gestionar de la forma 
              más eficaz posible la oferta de los espacios publicitarios que hay en la página web, adecuando 
              el contenido del anuncio al contenido del servicio solicitado.
            </p>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🎯 Cookies de publicidad comportamental</h3>
            <p className="text-gray-700">
              Son aquellas que permiten la gestión, de la forma más eficaz posible, de los espacios 
              publicitarios. Estas cookies almacenan información del comportamiento de los usuarios obtenida 
              a través de la observación continuada de sus hábitos de navegación.
            </p>
          </div>

          <div className="border-l-4 border-gray-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🔗 Cookies de terceros</h3>
            <p className="text-gray-700 mb-4">
              Esta web puede utilizar servicios de terceros que, por cuenta de Google, recopilarán información 
              con fines estadísticos, de uso del sitio por parte del usuario y para la prestación de otros servicios.
            </p>
            <div className="bg-gray-50 border rounded-lg p-4">
              <p className="text-gray-700 text-sm">
                <strong>Google Analytics:</strong> Este sitio web utiliza Google Analytics, un servicio 
                analítico de web prestado por Google, Inc. con domicilio en los Estados Unidos con sede 
                central en 1600 Amphitheatre Parkway, Mountain View, California 94043.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Gestionar y rechazar el uso de cookies</h2>
        <p className="text-gray-700 mb-4">
          En cualquier momento, puedes adaptar la configuración del navegador para gestionar, desestimar el 
          uso de cookies y ser notificado antes de que se descarguen.
        </p>
        <p className="text-gray-700 mb-6">
          También puedes adaptar la configuración de forma que el navegador rechace todas las cookies, o 
          únicamente las cookies de terceros. Y también puedes eliminar cualquiera de las cookies que ya 
          se encuentren en tu equipo.
        </p>

        <div className="bg-gray-50 border rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración por navegador:</h3>
          <ul className="space-y-2">
            <li>
              <a 
                href="https://support.google.com/chrome/answer/95647?hl=es-419" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a 
                href="https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies#ie=ie-10" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Internet Explorer
              </a>
            </li>
            <li>
              <a 
                href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a 
                href="https://support.apple.com/es-es/HT201265" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Apple Safari
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">¿Tienes dudas?</h3>
          <p className="text-blue-800 mb-0">
            Si tienes cualquier duda sobre esta Política de Cookies, puedes contactar con nosotros 
            enviándonos un email a{' '}
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




