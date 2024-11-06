import { describe, expect, it } from 'vitest';

import { createAppURLParams } from './url';

describe('createAppURLParams', () => {
  it('should return the correct URL parameters', () => {
    const url = new URL('https://example.com');
    const params = {
      key1: 'value1',
      key2: 'value2',
      key3: ['value3', 'value4'],
      key4: ['value5', 'value6']
    };
    const urlParams = createAppURLParams({
      key1: true,
      key2: true,
      key3: true,
      key4: true
    });

    expect(urlParams.buildURLParams(url, params)).toBe(
      'key1=value1&key2=value2&key3=value3%2Cvalue4&key4=value5%2Cvalue6'
    );
  });

  it('should delete a parameter', () => {
    const url = new URL('https://example.com?key1=value1&key2=value2');

    const urlParams = createAppURLParams({
      key1: true,
      key2: true
    });
    ;

    expect(urlParams.deleteParam(url, 'key1')).toBe('key2=value2');
  });

  it('should return true for a parameter with a value', () => {
    const url = new URL('https://example.com?key1=value1');

    const urlParams = createAppURLParams({
      key1: true
    });
    expect(urlParams.hasParam(url, ['key1', 'value1'])).toBe(true);
  });

  it('should return true for a parameter with multiple values', () => {
    const url = new URL('https://example.com?key1=value1%2Cvalue2');

    const urlParams = createAppURLParams({
      key1: true
    });
    expect(urlParams.hasParam(url, ['key1', ['value1', 'value2']])).toBe(true);
  });

  it('should return false for a parameter with a different value', () => {
    const url = new URL('https://example.com?key1=value1');

    const urlParams = createAppURLParams({
      key1: true
    });
    expect(urlParams.hasParam(url, ['key1', 'value2'])).toBe(false);
  });

  it('should return false for a key with a different value', () => {
    const url = new URL('https://example.com?key1=value1');

    const urlParams = createAppURLParams({
      key1: true
    });
    expect(urlParams.hasParam(url, ['key2', 'value1'])).toBe(false);
  });
});
