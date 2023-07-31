import { Cache } from "./cache.ts";

interface Item<V> {
  value: V;
  ttl: number;
}

export class TtlCache<K, V> implements Cache<K, V> {
  #items: Map<K, Item<V>>;
  #ttl: number;

  /**
   * @param ttl Time-to-live in seconds.
   */
  constructor(ttl: number) {
    this.#items = new Map();
    this.#ttl = ttl;
  }

  get(key: K) {
    const result = this.#items.get(key);
    if (result !== undefined) {
      const item = result as Item<V>;
      const now = Date.now();
      if (now < item.ttl) {
        return item.value;
      }
      this.delete(key);
    }
    return undefined;
  }

  put(key: K, value: V) {
    this.#items.set(key, { value: value, ttl: Date.now() + this.#ttl * 1e3 });
  }

  delete(key: K) {
    return this.#items.delete(key);
  }
}
