import NodeCache from 'node-cache';

const createCache = (ttl = 3600) => {
  const cache = new NodeCache({ 
    stdTTL: ttl,
    checkperiod: Math.min(ttl * 0.2, 600),
    useClones: false
  });

  return {
    get: (key) => cache.get(key),
    set: (key, value, customTTL) => cache.set(key, value, customTTL || ttl),
    has: (key) => cache.has(key),
    delete: (key) => cache.del(key) > 0,
    flush: () => cache.flushAll(),
    stats: () => cache.getStats()
  };
};

export default createCache;