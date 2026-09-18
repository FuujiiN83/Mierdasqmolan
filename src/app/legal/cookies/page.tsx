import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies de MQM Web - Información sobre el uso de cookies en nuestro sitio web',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/legal/cookies',
  },
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Política de Cookies</h1>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <p className="text-blue-800 dark:text-blue-200 mb-0">
            Si quieres saber más sobre el uso de cookies que realiza este sitio web{' '}
            <strong>https://mierdasquemolan.com</strong>, estás en el lugar indicado. A continuación, 
            vamos a explicarte qué son exactamente las cookies; qué tipo de cookies utilizamos y para qué; 
            y cómo puedes ejercer tu derecho para configurar tu navegador y desestimar el uso de cualquiera de ellas.
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
          <p className="text-amber-800 dark:text-amber-200 mb-0">
            <strong>Importante:</strong> Si decides no utilizar algunas cookies, este sitio web puede 
            no funcionar perfectamente, afectando a tu experiencia de usuario.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">¿Qué es una cookie?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Una cookie es un fichero que se descarga en tu ordenador al acceder a determinadas páginas web o blogs.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Las cookies permiten a esa página, entre otras cosas, almacenar y recuperar información sobre tus 
          hábitos de navegación o de tu equipo, y dependiendo de la información que contengan y de la forma 
          en que utilices tu equipo, pueden utilizarse para reconocerte.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          El navegador del usuario memoriza cookies en el disco duro solamente durante la sesión actual 
          ocupando un espacio de memoria mínimo y no perjudicando al ordenador. Las cookies no contienen 
          ninguna clase de información personal específica, y la mayoría de las mismas se borran del disco 
          duro al finalizar la sesión de navegador (las denominadas cookies de sesión).
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Aceptación de las cookies: Normativa vigente</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Al acceder a este sitio web, y de acuerdo a la normativa vigente en materia de protección de datos, 
          te informamos del uso de cookies, dándote la opción de aceptarlas expresamente y de acceder a más 
          información a través de esta Política de Cookies.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Debes saber que, en el caso de continuar navegando, estarás prestando tu consentimiento para el 
          empleo de estas cookies. Pero, en cualquier momento, podrás cambiar de opinión y bloquear su 
          utilización a través de tu navegador.
        </p>
        
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
          <p className="text-green-800 dark:text-green-200 mb-2">
            <strong>Para tu total tranquilidad</strong>, este sitio web cumple con lo estipulado en la normativa vigente:
          </p>
          <ul className="text-green-800 dark:text-green-200 list-disc list-inside space-y-1">
            <li>El reglamento LSSI-CE (Ley de la sociedad de la información y del comercio electrónico)</li>
            <li>El RGPD (Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016)</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Tipos de cookies</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Para poder ofrecerte una mejor experiencia de usuario, obtener datos analíticos, almacenar y 
          recuperar información sobre tus hábitos de navegación o de tu equipo y desarrollar su actividad, 
          este sitio web utiliza cookies propias y de terceros.
        </p>

        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">🔧 Cookies técnicas (Necesarias)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Son aquellas que permiten al usuario la navegación a través de una página web, plataforma o 
              aplicación y la utilización de las diferentes opciones o servicios que en ella existan como, 
              por ejemplo, controlar el tráfico y la comunicación de datos, identificar la sesión, acceder 
              a partes de acceso restringido, recordar los elementos que integran un pedido, etc.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <p className="text-blue-800 dark:text-blue-200 text-sm font-medium mb-2">Cookies específicas incluidas:</p>
              <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                <li>• <strong>Session cookies:</strong> Para mantener la sesión del usuario activa</li>
                <li>• <strong>Authentication cookies:</strong> Para verificar la identidad del usuario</li>
                <li>• <strong>Security cookies:</strong> Para proteger contra ataques CSRF y otros</li>
                <li>• <strong>Functionality cookies:</strong> Para características básicas del sitio</li>
              </ul>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">⚙️ Cookies de personalización</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Son aquellas que permiten al usuario acceder al servicio con algunas características de 
              carácter general predefinidas en función de una serie de criterios en el terminal del usuario 
              como por ejemplo el idioma, el tipo de navegador, la configuración regional, etc.
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <p className="text-green-800 dark:text-green-200 text-sm font-medium mb-2">Cookies específicas incluidas:</p>
              <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                <li>• <strong>Language preference:</strong> Para recordar el idioma seleccionado</li>
                <li>• <strong>Region settings:</strong> Para configuraciones regionales</li>
                <li>• <strong>UI preferences:</strong> Para preferencias de interfaz de usuario</li>
                <li>• <strong>Cookie consent:</strong> Para recordar las preferencias de cookies</li>
              </ul>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">📊 Cookies de análisis (Google Analytics)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Son aquellas que bien tratadas por nosotros o por terceros, nos permiten cuantificar el número 
              de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los 
              usuarios del servicio ofertado.
            </p>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
              <p className="text-purple-800 dark:text-purple-200 text-sm font-medium mb-2">Cookies específicas de Google Analytics (G-FCD8D2QZEZ):</p>
              <ul className="text-purple-800 dark:text-purple-200 text-sm space-y-1">
                <li>• <strong>_ga:</strong> Se usa para distinguir usuarios únicos (duración: 2 años)</li>
                <li>• <strong>_gid:</strong> Se usa para distinguir usuarios únicos (duración: 24 horas)</li>
                <li>• <strong>_gat:</strong> Se usa para limitar la tasa de solicitudes (duración: 1 minuto)</li>
                <li>• <strong>_ga_[CONTAINER_ID]:</strong> Se usa para persistir la sesión del estado (duración: 2 años)</li>
                <li>• <strong>_gac_[PROPERTY_ID]:</strong> Se usa para información de campañas (duración: 90 días)</li>
              </ul>
              <p className="text-purple-800 dark:text-purple-200 text-sm mt-2">
                <strong>Propósito:</strong> Analizar el tráfico del sitio, entender el comportamiento del usuario, 
                medir el rendimiento de las páginas y mejorar la experiencia del usuario.
              </p>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">📢 Cookies publicitarias</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Son aquellas que, bien tratadas por nosotros o por terceros, nos permiten gestionar de la forma 
              más eficaz posible la oferta de los espacios publicitarios que hay en la página web, adecuando 
              el contenido del anuncio al contenido del servicio solicitado.
            </p>
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
              <p className="text-orange-800 dark:text-orange-200 text-sm font-medium mb-2">Cookies específicas incluidas:</p>
              <ul className="text-orange-800 dark:text-orange-200 text-sm space-y-1">
                <li>• <strong>Google Ads cookies:</strong> Para mostrar anuncios relevantes</li>
                <li>• <strong>Facebook Pixel cookies:</strong> Para seguimiento de conversiones</li>
                <li>• <strong>Retargeting cookies:</strong> Para recordar productos visitados</li>
                <li>• <strong>Affiliate cookies:</strong> Para seguimiento de enlaces de afiliación</li>
              </ul>
            </div>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">🎯 Cookies de publicidad comportamental</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Son aquellas que permiten la gestión, de la forma más eficaz posible, de los espacios 
              publicitarios. Estas cookies almacenan información del comportamiento de los usuarios obtenida 
              a través de la observación continuada de sus hábitos de navegación.
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-red-800 dark:text-red-200 text-sm font-medium mb-2">Cookies específicas incluidas:</p>
              <ul className="text-red-800 dark:text-red-200 text-sm space-y-1">
                <li>• <strong>User behavior tracking:</strong> Para analizar patrones de navegación</li>
                <li>• <strong>Interest-based ads:</strong> Para mostrar contenido relevante</li>
                <li>• <strong>Conversion tracking:</strong> Para medir efectividad de campañas</li>
                <li>• <strong>Audience segmentation:</strong> Para segmentar usuarios por intereses</li>
              </ul>
            </div>
          </div>

          <div className="border-l-4 border-gray-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">🔗 Cookies de terceros</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Esta web utiliza servicios de terceros que recopilan información con fines estadísticos, 
              de uso del sitio por parte del usuario y para la prestación de otros servicios.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Google Analytics (G-FCD8D2QZEZ)</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                Este sitio web utiliza Google Analytics, un servicio analítico de web prestado por Google, Inc. 
                con domicilio en los Estados Unidos con sede central en 1600 Amphitheatre Parkway, Mountain View, California 94043.
              </p>
              <div className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded p-3">
                <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Información recopilada:</p>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Páginas visitadas y tiempo de permanencia</li>
                  <li>• Origen del tráfico (buscadores, enlaces directos, redes sociales)</li>
                  <li>• Dispositivo y navegador utilizado</li>
                  <li>• Ubicación geográfica aproximada (país/ciudad)</li>
                  <li>• Comportamiento de navegación y interacciones</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded p-3 mt-3">
                <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Finalidad del tratamiento:</p>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Análisis estadístico del uso del sitio web</li>
                  <li>• Mejora de la experiencia del usuario</li>
                  <li>• Optimización del rendimiento del sitio</li>
                  <li>• Análisis de tendencias y comportamiento de usuarios</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Microsoft Clarity</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                Este sitio web utiliza Microsoft Clarity, un servicio de análisis de comportamiento web 
                proporcionado por Microsoft Corporation con domicilio en One Microsoft Way, Redmond, WA 98052, Estados Unidos.
              </p>
              <div className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded p-3">
                <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Información recopilada por Clarity:</p>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Grabaciones de sesiones de usuario (clicks, scrolls, movimientos del mouse)</li>
                  <li>• Mapas de calor (heatmaps) de interacciones en la página</li>
                  <li>• Tiempo de permanencia en cada sección</li>
                  <li>• Rutas de navegación y flujos de usuario</li>
                  <li>• Errores de JavaScript y problemas de rendimiento</li>
                  <li>• Información del dispositivo y navegador</li>
                  <li>• Ubicación geográfica aproximada</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded p-3 mt-3">
                <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Cookies específicas de Microsoft Clarity:</p>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• <strong>_clck:</strong> Persiste la ID de Clarity (duración: 1 año)</li>
                  <li>• <strong>_clsk:</strong> Conecta múltiples vistas de página por sesión (duración: 1 día)</li>
                  <li>• <strong>_cltk:</strong> Almacena la configuración de Clarity (duración: 1 año)</li>
                  <li>• <strong>_clck:</strong> Identificador único de sesión (duración: 1 año)</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded p-3 mt-3">
                <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Finalidad del tratamiento:</p>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Análisis del comportamiento de navegación de los usuarios</li>
                  <li>• Identificación de problemas de usabilidad en el sitio web</li>
                  <li>• Mejora de la experiencia del usuario basada en datos reales</li>
                  <li>• Optimización del diseño y funcionalidad del sitio</li>
                  <li>• Detección de errores técnicos y problemas de rendimiento</li>
                </ul>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-3 mt-3">
                <p className="text-blue-800 dark:text-blue-200 text-sm font-medium mb-2">🔒 Privacidad y protección de datos:</p>
                <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                  <li>• Los datos se procesan de forma anónima y agregada</li>
                  <li>• No se recopilan datos personales identificables</li>
                  <li>• Las grabaciones de sesión se almacenan de forma segura en servidores de Microsoft</li>
                  <li>• Los datos se utilizan únicamente para fines analíticos y de mejora del sitio</li>
                  <li>• Cumple con las normativas de protección de datos (RGPD, CCPA)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Gestión del consentimiento de cookies</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Este sitio web utiliza un sistema de gestión de consentimiento de cookies que te permite controlar 
          qué tipos de cookies aceptas. Al acceder al sitio, verás un banner que te permite:
        </p>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
          <ul className="text-green-800 dark:text-green-200 space-y-2">
            <li>• <strong>Aceptar todas las cookies:</strong> Incluye cookies técnicas, de análisis, personalización y marketing</li>
            <li>• <strong>Aceptar solo las necesarias:</strong> Solo cookies técnicas esenciales para el funcionamiento del sitio</li>
            <li>• <strong>Personalizar configuración:</strong> Control granular sobre cada tipo de cookie</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Consentimiento específico para servicios de análisis</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Las cookies de Google Analytics y Microsoft Clarity solo se activan cuando das tu consentimiento explícito a través del banner. 
          Sin este consentimiento, estos servicios no recopilan datos de tu navegación.
        </p>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">Google Analytics</h4>
          <p className="text-purple-800 dark:text-purple-200 text-sm mb-2">
            Se utiliza para análisis estadísticos y medición del rendimiento del sitio web.
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Microsoft Clarity</h4>
          <p className="text-blue-800 dark:text-blue-200 text-sm mb-2">
            Se utiliza para análisis de comportamiento de usuario, grabaciones de sesión y mapas de calor 
            para mejorar la experiencia del usuario.
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            <strong>Importante:</strong> Puedes cambiar tu consentimiento en cualquier momento haciendo clic en 
            el enlace "Configuración de cookies" en el pie de página del sitio web.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Gestionar y rechazar el uso de cookies</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          En cualquier momento, puedes adaptar la configuración del navegador para gestionar, desestimar el 
          uso de cookies y ser notificado antes de que se descarguen.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          También puedes adaptar la configuración de forma que el navegador rechace todas las cookies, o 
          únicamente las cookies de terceros. Y también puedes eliminar cualquiera de las cookies que ya 
          se encuentren en tu equipo.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Duración y almacenamiento de cookies</h3>
        <div className="bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cookies de sesión:</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Se eliminan automáticamente al cerrar el navegador</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cookies persistentes:</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Permanecen hasta su fecha de expiración o eliminación manual</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded">
            <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Duración específica por tipo:</p>
            <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
              <li>• <strong>Cookies técnicas:</strong> Hasta 1 año o hasta el cierre de sesión</li>
              <li>• <strong>Google Analytics (_ga):</strong> 2 años</li>
              <li>• <strong>Google Analytics (_gid):</strong> 24 horas</li>
              <li>• <strong>Preferencias de usuario:</strong> 1 año</li>
              <li>• <strong>Consentimiento de cookies:</strong> 1 año</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Configuración por navegador:</h3>
          <ul className="space-y-2">
            <li>
              <a 
                href="https://support.google.com/chrome/answer/95647?hl=es-419" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a 
                href="https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies#ie=ie-10" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
              >
                Internet Explorer
              </a>
            </li>
            <li>
              <a 
                href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a 
                href="https://support.apple.com/es-es/HT201265" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
              >
                Apple Safari
              </a>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Tus derechos y cómo ejercerlos</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Como usuario, tienes derecho a controlar el uso de cookies en este sitio web. Puedes ejercer estos derechos de las siguientes maneras:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">🎯 Derecho de consentimiento</h4>
            <ul className="text-yellow-800 dark:text-yellow-200 text-sm space-y-1">
              <li>• Aceptar o rechazar cookies no esenciales</li>
              <li>• Cambiar tu consentimiento en cualquier momento</li>
              <li>• Revocar consentimientos previamente otorgados</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">🗑️ Derecho de eliminación</h4>
            <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
              <li>• Eliminar cookies existentes de tu navegador</li>
              <li>• Configurar el navegador para rechazar cookies</li>
              <li>• Limpiar datos de navegación regularmente</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">¿Tienes dudas?</h3>
          <p className="text-blue-800 dark:text-blue-200 mb-2">
            Si tienes cualquier duda sobre esta Política de Cookies o quieres ejercer tus derechos, 
            puedes contactar con nosotros:
          </p>
          <ul className="text-blue-800 dark:text-blue-200 space-y-1">
            <li>• <strong>Email:</strong> <a 
              href="mailto:info@mierdasquemolan.com" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
            >
              info@mierdasquemolan.com
            </a></li>
            <li>• <strong>Formulario de contacto:</strong> A través de la página de contacto del sitio web</li>
            <li>• <strong>Configuración de cookies:</strong> Haciendo clic en "Configuración de cookies" en el pie de página</li>
          </ul>
        </div>
      </div>
    </div>
  );
}







