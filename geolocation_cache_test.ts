import { GeolocationCache } from "./geolocation_cache.ts";
import { assertStrictEquals } from "./test_deps.ts";

Deno.test({
  name: "test cache miss 1",
  fn() {
    const cache: GeolocationCache<string> = new GeolocationCache(1);
    assertStrictEquals(cache.get(0, 2), undefined);
  },
});

Deno.test({
  name: "test cache miss 2",
  fn() {
    const cache: GeolocationCache<string> = new GeolocationCache(1);
    cache.put(0, 2, "value");
    assertStrictEquals(cache.get(1, 2), undefined);
  },
});

Deno.test({
  name: "test cache hit 1",
  fn() {
    const cache: GeolocationCache<string> = new GeolocationCache(1);
    cache.put(0, 2, "value");
    assertStrictEquals(cache.get(0, 2), "value");
  },
});

Deno.test({
  name: "test cache hit 2",
  fn() {
    const cache: GeolocationCache<string> = new GeolocationCache(1);
    cache.put(0, 2, "value");
    assertStrictEquals(cache.get(0.1, 2.2), "value");
  },
});

Deno.test({
  name: "test cache hit edge case",
  fn() {
    const cache: GeolocationCache<string> = new GeolocationCache(0.3124);
    cache.put(180, 90, "value");
    assertStrictEquals(cache.get(179.8848, 89.9424), "value");
  },
});

Deno.test({
  name: "test cache miss edge case",
  fn() {
    const cache: GeolocationCache<string> = new GeolocationCache(0.3124);
    cache.put(180, 90, "value");
    assertStrictEquals(cache.get(179.8847, 89.9423), undefined);
  },
});
