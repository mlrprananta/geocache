import { TtlCache } from "./ttl_cache.ts";

export class GeolocationCache<V> {
  #cache: TtlCache<string, V>;
  #interval: number;

  /**
   * @param interval Interval in degrees which determines the size of the
   * greticule block and the range of the bucket. A lower interval value
   * increases the accuracy of geolocated data, but also increases the number
   * of buckets in the cache.
   * @param [ttl=3600] Time-to-live in seconds before an item is evicted. 
   * Default is set to one hour (3600 seconds).
   */
  constructor(interval: number, ttl = 3600) {
    this.#cache = new TtlCache(ttl);
    this.#interval = interval;
  }

  get(lat: number, lon: number) {
    const key = this.#computeKey(lat, lon);
    return this.#cache.get(key);
  }

  put(lat: number, lon: number, value: V) {
    const key = this.#computeKey(lat, lon);
    this.#cache.put(key, value);
  }

  #computeKey(lat: number, lon: number): string {
    const latBucket = Math.floor((lat + 90) / this.#interval);
    const lonBucket = Math.floor((lon + 180) / this.#interval);
    const key = `${latBucket.toString()}-${lonBucket.toString()}`;
    return key;
  }
}
