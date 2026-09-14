import { describe, it, expect } from 'vitest';
import { encodeLocalImageSrc } from './image-src';

describe('encodeLocalImageSrc', () => {
  it('percent-encodes non-ASCII characters in local paths', () => {
    expect(encodeLocalImageSrc('/images/kit piñata.webp')).toBe('/images/kit%20pi%C3%B1ata.webp');
    expect(encodeLocalImageSrc('/images/cañon de confeti.webp')).toBe('/images/ca%C3%B1on%20de%20confeti.webp');
  });

  it('encodes spaces in local paths', () => {
    expect(encodeLocalImageSrc('/images/masturbador masculino.webp')).toBe('/images/masturbador%20masculino.webp');
  });

  it('leaves plain ASCII paths untouched', () => {
    expect(encodeLocalImageSrc('/images/tiras-led.webp')).toBe('/images/tiras-led.webp');
    expect(encodeLocalImageSrc('/logo.png')).toBe('/logo.png');
  });

  it('is idempotent for already-encoded paths', () => {
    expect(encodeLocalImageSrc('/images/kit%20pi%C3%B1ata.webp')).toBe('/images/kit%20pi%C3%B1ata.webp');
  });

  it('leaves remote and protocol-relative URLs untouched', () => {
    expect(encodeLocalImageSrc('https://m.media-amazon.com/images/I/61ñ.jpg')).toBe('https://m.media-amazon.com/images/I/61ñ.jpg');
    expect(encodeLocalImageSrc('//cdn.example.com/a b.png')).toBe('//cdn.example.com/a b.png');
  });

  it('returns empty input unchanged', () => {
    expect(encodeLocalImageSrc('')).toBe('');
  });

  it('encodes a literal percent sign that is not a valid escape', () => {
    expect(encodeLocalImageSrc('/images/100%.webp')).toBe('/images/100%25.webp');
  });
});
