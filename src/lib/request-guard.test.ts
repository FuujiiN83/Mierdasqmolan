import { describe, it, expect } from 'vitest';
import { isForgedServerActionRequest, SERVER_ACTION_HEADER } from './request-guard';

describe('isForgedServerActionRequest', () => {
  it('flags any request carrying a Next-Action header (this app has no Server Actions)', () => {
    expect(isForgedServerActionRequest(new Headers({ 'Next-Action': 'x' }))).toBe(true);
    expect(isForgedServerActionRequest(new Headers({ [SERVER_ACTION_HEADER]: 'd19729038f450f18724816b6f3be72f61048622f' }))).toBe(true);
  });

  it('accepts ordinary requests', () => {
    expect(isForgedServerActionRequest(new Headers())).toBe(false);
    expect(isForgedServerActionRequest(new Headers({ 'Content-Type': 'text/plain' }))).toBe(false);
  });

  it('ignores an empty header value', () => {
    expect(isForgedServerActionRequest(new Headers({ 'Next-Action': '' }))).toBe(false);
  });
});
