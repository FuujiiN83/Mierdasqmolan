import { Metadata } from 'next';
import { SimpleHeader } from '@/components/Header';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Política de Afiliación',
  description: 'Información sobre nuestro programa de afiliación y comisiones por ventas.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function AffiliatesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Política de Afiliación
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-amber-800 mb-2">
            Aviso Importante sobre Enlaces de Afiliación
          </h2>
          <p className="text-amber-700 mb-0">
            {siteConfig.affiliate.disclaimer}
          </p>
        </div>

        <h2>¿Qué son los enlaces de afiliación?</h2>
        <p>
          Los enlaces de afiliación son enlaces especiales que contienen un código único que nos identifica. 
          Cuando haces clic en uno de estos enlaces y realizas una compra, recibimos una pequeña comisión 
          del vendedor sin que esto suponga ningún coste adicional para ti.
        </p>

        <h2>¿Cómo funcionan?</h2>
        <p>
          Cuando encuentras un producto interesante en nuestro sitio web y decides comprarlo:
        </p>
        <ol>
          <li>Haces clic en nuestro enlace de afiliación</li>
          <li>Eres redirigido al sitio web del vendedor (Amazon, etc.)</li>
          <li>Realizas tu compra normalmente</li>
          <li>El vendedor nos paga una pequeña comisión por la referencia</li>
        </ol>

        <h2>¿Afecta esto al precio que pagas?</h2>
        <p>
          <strong>No, en absoluto.</strong> El precio que pagas es exactamente el mismo que si accedieras 
          directamente al sitio web del vendedor. Las comisiones de afiliación son pagadas por el vendedor 
          como parte de sus costes de marketing, no por el comprador.
        </p>

        <h2>¿Por qué usamos enlaces de afiliación?</h2>
        <p>
          Los ingresos por afiliación nos permiten:
        </p>
        <ul>
          <li>Mantener el sitio web funcionando</li>
          <li>Dedicar tiempo a buscar y seleccionar productos de calidad</li>
          <li>Crear contenido útil y reseñas detalladas</li>
          <li>Ofrecer nuestro servicio de forma gratuita</li>
        </ul>

        <h2>Nuestra política de transparencia</h2>
        <p>
          Nos comprometemos a ser completamente transparentes sobre nuestros enlaces de afiliación:
        </p>
        <ul>
          <li>Todos los enlaces de afiliación están claramente marcados</li>
          <li>Incluimos avisos de afiliación en cada producto</li>
          <li>Nunca recomendamos productos solo por la comisión</li>
          <li>Probamos y evaluamos productos antes de recomendarlos cuando es posible</li>
        </ul>

        <h2>Con qué programas trabajamos</h2>
        <p>
          Actualmente participamos en los siguientes programas de afiliación:
        </p>
        <ul>
          <li><strong>Amazon Associates:</strong> Productos disponibles en Amazon España</li>
          <li><strong>Otros marketplaces:</strong> Según disponibilidad y calidad de productos</li>
        </ul>

        <h2>¿Cómo seleccionamos los productos?</h2>
        <p>
          Nuestro proceso de selección se basa en:
        </p>
        <ul>
          <li>Calidad del producto y reputación de la marca</li>
          <li>Relación calidad-precio</li>
          <li>Reseñas y valoraciones de otros usuarios</li>
          <li>Tendencias y popularidad del producto</li>
          <li>Utilidad real para nuestros visitantes</li>
        </ul>

        <h2>Tu confianza es importante</h2>
        <p>
          Entendemos que la transparencia es fundamental para construir confianza. Por eso:
        </p>
        <ul>
          <li>Siempre seremos honestos sobre nuestras recomendaciones</li>
          <li>No modificaremos nuestras opiniones por motivos económicos</li>
          <li>Incluiremos tanto pros como contras en nuestras reseñas</li>
          <li>Responderemos a todas tus preguntas sobre productos o afiliación</li>
        </ul>

        <h2>Contacto</h2>
        <p>
          Si tienes alguna pregunta sobre nuestra política de afiliación o sobre algún producto específico, 
          no dudes en contactarnos. Estamos aquí para ayudarte a tomar las mejores decisiones de compra.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
          <p className="text-sm text-gray-600 mb-0">
            <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
          </p>
        </div>
      </div>
    </div>
  );
}









