import { TtlCache } from "./ttl_cache.ts";

export class GeolocationCache<V> {
  #cache: TtlCache<string, V>;
  #interval: number;

  /**
   * @param interval The interval in degrees which determines
   * the size of the greticule block and the range of the bucket.
   * A lower interval value increases accuracy of geolocated data,
   * but also increases the number
   * of buckets in the cache.
   */
  constructor(interval: number) {
    this.#cache = new TtlCache(60 * 60);
    this.#interval = interval;
  }

  get(lon: number, lat: number) {
    const key = this.#computeKey(lon, lat);
    return this.#cache.get(key);
  }

  put(lon: number, lat: number, value: V) {
    const key = this.#computeKey(lon, lat);
    this.#cache.put(key, value);
  }

  #computeKey(lon: number, lat: number): string {
    const lonBucket = Math.floor((lon + 180) / this.#interval);
    const latBucket = Math.floor((lat + 90) / this.#interval);
    const key = `${lonBucket.toString()}-${latBucket.toString()}`;
    return key;
  }
}