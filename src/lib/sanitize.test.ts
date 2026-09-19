import { describe, it, expect } from 'vitest';
import { sanitizeHtml, markdownToHtml, safeUrl } from '@/lib/utils';

describe('safeUrl', () => {
  it('deja pasar http y https', () => {
    expect(safeUrl('https://amzn.to/3abc')).toBe('https://amzn.to/3abc');
    expect(safeUrl('http://example.com/x')).toBe('http://example.com/x');
  });

  it('bloquea javascript:', () => {
    // new URL('javascript:...') NO lanza, así que hay que comprobarlo aparte
    expect(safeUrl('javascript:alert(1)')).toBe('#');
    expect(safeUrl('JaVaScRiPt:alert(1)')).toBe('#');
  });

  it('bloquea data: y vbscript:', () => {
    expect(safeUrl('data:text/html,<script>alert(1)</script>')).toBe('#');
    expect(safeUrl('vbscript:msgbox(1)')).toBe('#');
  });

  it('devuelve el fallback con entradas vacías o basura', () => {
    expect(safeUrl('')).toBe('#');
    expect(safeUrl('no es una url')).toBe('#');
    expect(safeUrl('', '/producto/x')).toBe('/producto/x');
  });
});

describe('sanitizeHtml', () => {
  it('elimina etiquetas script con su contenido', () => {
    const salida = sanitizeHtml('<p>hola</p><script>alert(1)</script>');
    expect(salida).not.toContain('<script');
    expect(salida).not.toContain('alert(1)');
    expect(salida).toContain('<p>hola</p>');
  });

  it('elimina iframes', () => {
    const salida = sanitizeHtml('<iframe src="https://malo.example"></iframe>');
    expect(salida).not.toContain('<iframe');
  });

  it('elimina los manejadores de eventos inline', () => {
    const salida = sanitizeHtml('<img src="/x.webp" onerror="alert(1)">');
    expect(salida).not.toContain('onerror');
    expect(salida).toContain('src="/x.webp"');
  });

  it('neutraliza href/src con javascript:', () => {
    const salida = sanitizeHtml('<a href="javascript:alert(1)">x</a>');
    expect(salida).not.toContain('javascript:');
    expect(salida).toContain('href="#"');
  });

  it('conserva el HTML legítimo que ya usan los productos y el blog', () => {
    // Este es el caso real: 384 de 420 descripciones ya vienen en HTML.
    // Escaparlas en vez de sanearlas dejaría la web llena de etiquetas a la vista.
    const entrada = '<h2>Regalos originales</h2><p>Un texto con <strong>negrita</strong> y <em>cursiva</em>.</p><ul><li>uno</li></ul>';
    expect(sanitizeHtml(entrada)).toBe(entrada);
  });
});

describe('markdownToHtml', () => {
  it('convierte negrita de markdown', () => {
    expect(markdownToHtml('hola **mundo**')).toContain('<strong');
  });

  it('sanea el resultado aunque la entrada traiga un script', () => {
    const salida = markdownToHtml('texto <script>alert(1)</script>');
    expect(salida).not.toContain('<script');
  });

  it('no destroza el HTML que ya venía formateado', () => {
    const salida = markdownToHtml('<p>Ya soy HTML</p>');
    expect(salida).toContain('Ya soy HTML');
    expect(salida).not.toContain('&lt;p&gt;');
  });
});

describe('markdownToHtml con las descripciones reales (ya son HTML)', () => {
  // Regresión: 384 de 420 descripciones de producto ya vienen en HTML y en una
  // sola línea. La regla que envuelve en <p> cada línea suelta no veía un inicio
  // de <h1-6 ni de <li>, así que envolvía el documento ENTERO, y el HTML servido
  // empezaba por "<p class="mb-3"><p>¿Quieres marcha en tu relación…".
  const descripcion = '<p>¿Quieres marcha en tu relación?</p><h2>Características del producto</h2><ul><li>uno</li></ul>';

  it('deja intacto un bloque HTML de una sola línea', () => {
    expect(markdownToHtml(descripcion)).toBe(descripcion);
  });

  it('no anida <p> dentro de <p>', () => {
    expect(markdownToHtml(descripcion)).not.toMatch(/<p[^>]*>\s*<p/);
  });

  it('no mete encabezados dentro de un párrafo', () => {
    expect(markdownToHtml(descripcion)).not.toMatch(/<p[^>]*>[^<]*<h2/);
  });

  it('sigue convirtiendo el texto plano de verdad', () => {
    const salida = markdownToHtml('Una línea suelta con **negrita**');
    expect(salida).toContain('<p class="mb-3">');
    expect(salida).toContain('<strong');
  });
});

describe('enlaces de afiliado dentro del contenido', () => {
  // 18 enlaces del blog salían como dofollow porque el rel venía escrito a mano
  // en data/blog.json con "noopener noreferrer". Google exige calificar los
  // enlaces de afiliado: sin `sponsored`, eso es una acción manual por link spam.
  it('reescribe el rel que ya traía el enlace', () => {
    const salida = sanitizeHtml(
      '<p>Mira este <a href="https://amzn.to/3abc" rel="noopener noreferrer">juego</a></p>'
    );

    expect(salida).toContain('rel="sponsored nofollow noopener"');
    expect(salida).not.toContain('noopener noreferrer"');
    // Un solo atributo rel: si se añadiese sin quitar el viejo, el navegador se
    // quedaría con el primero (el dofollow).
    expect(salida.match(/rel=/g)).toHaveLength(1);
  });

  it('añade rel si el enlace externo no traía ninguno', () => {
    const salida = sanitizeHtml('<a href="https://amzn.to/x" target="_blank">x</a>');
    expect(salida).toContain('rel="sponsored nofollow noopener"');
    expect(salida).toContain('target="_blank"');
  });

  it('no toca los enlaces internos', () => {
    const entrada = '<a href="/producto/bola-disco">ficha</a>';
    expect(sanitizeHtml(entrada)).toBe(entrada);
  });

  it('no toca los enlaces al propio dominio escritos en absoluto', () => {
    const salida = sanitizeHtml('<a href="https://www.mierdasquemolan.com/producto/x">x</a>');
    expect(salida).not.toContain('sponsored');
  });

  it('no toca mailto, teléfono ni anclas', () => {
    for (const href of ['mailto:info@mierdasquemolan.com', 'tel:+34600000000', '#produtos']) {
      const entrada = `<a href="${href}">x</a>`;
      expect(sanitizeHtml(entrada)).toBe(entrada);
    }
  });

  it('marca como sponsored las formas de URL que el navegador resuelve igual', () => {
    // Estos tres casos se colaban como "internos" y quedaban dofollow:
    //  - `//host` es una URL del protocolo actual, o sea externa.
    //  - con un espacio delante, el navegador lo ignora y sigue el enlace.
    //  - `&#104;ttps://` lo decodifica el navegador antes de navegar.
    for (const href of ['//evil.example/x', ' https://amzn.to/x', '&#104;ttps://evil.example/x']) {
      const salida = sanitizeHtml(`<a href="${href}">x</a>`);
      expect(salida, href).toContain('rel="sponsored nofollow noopener"');
    }
  });

  it('no se come los atributos cuyo valor contiene " rel="', () => {
    // Con una regex sobre ` rel=` esto partía la etiqueta y dejaba el href sin
    // cerrar, arrastrando el resto del documento dentro del atributo.
    const salida = sanitizeHtml('<a href="https://amzn.to/x?a=1 rel=2" target="_blank">x</a>');

    expect(salida).toContain('href="https://amzn.to/x?a=1 rel=2"');
    expect(salida).toContain('target="_blank"');
    expect(salida).toContain('rel="sponsored nofollow noopener"');
    // El href sigue cerrado: no hay una comilla suelta al final.
    expect(salida).not.toMatch(/href="[^"]*"[^>]*$/);
  });

  it('conserva el resto de atributos del enlace', () => {
    const salida = sanitizeHtml(
      '<a class="boton" href="https://amzn.to/x" data-id="7" style="color:red">x</a>'
    );

    expect(salida).toContain('class="boton"');
    expect(salida).toContain('data-id="7"');
    expect(salida).toContain('style="color:red"');
    expect(salida).toContain('rel="sponsored nofollow noopener"');
  });

  it('deja el enlace utilizable cuando el href es relativo y lo resuelve el navegador', () => {
    const entrada = '<a href="producto/x">x</a>';
    expect(sanitizeHtml(entrada)).toBe(entrada);
  });
});
