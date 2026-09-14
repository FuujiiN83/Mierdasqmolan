import { describe, it, expect } from 'vitest';
import robots, { CRAWLER_GUESSED_PATHS } from './robots';

describe('robots', () => {
  const rules = robots().rules as { disallow: string[]; allow: string };

  it('keeps the existing private paths disallowed', () => {
    expect(rules.allow).toBe('/');
    expect(rules.disallow).toEqual(expect.arrayContaining(['/admin/', '/api/', '/_next/', '/private/']));
  });

  it('disallows the URLs crawlers fabricate by evaluating template literals with null', () => {
    expect(CRAWLER_GUESSED_PATHS).toEqual(['/producto/null', '/categoria/null', '/null']);
    expect(rules.disallow).toEqual(expect.arrayContaining(CRAWLER_GUESSED_PATHS));
  });

  it('points to the sitemap on the canonical host', () => {
    expect(robots().sitemap).toBe('https://www.mierdasquemolan.com/sitemap.xml');
  });
});
