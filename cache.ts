export interface Cache<K, V> {
  get(key: K): V | undefined;

  put(key: K, value: V): void;

  delete(key: K): boolean;
}
