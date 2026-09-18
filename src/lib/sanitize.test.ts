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
