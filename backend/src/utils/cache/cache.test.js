import { createCache } from './cache.js';

describe('cache', () => {
  let cache;
  
  beforeEach(() => {
    cache = createCache();
  });
  
  test('basic cache operations', () => {
    cache.set('key', 'value');
    expect(cache.get('key')).toBe('value');
    expect(cache.get('missing')).toBeUndefined();
    
    expect(cache.has('key')).toBe(true);
    expect(cache.has('missing')).toBe(false);
    
    cache.delete('key');
    expect(cache.has('key')).toBe(false);
    
    cache.set('a', 1);
    cache.set('b', 2);
    cache.flush();
    expect(cache.has('a')).toBe(false);
    expect(cache.has('b')).toBe(false);
  });
});