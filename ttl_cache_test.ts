import { TtlCache } from "./mod.ts";
import { assertStrictEquals, FakeTime } from "./test_deps.ts";

Deno.test({
  name: "test cache miss 1",
  fn() {
    const cache: TtlCache<number, string> = new TtlCache(1);
    assertStrictEquals(cache.get(1), undefined);
  },
});

Deno.test({
  name: "test cache hit 1",
  fn() {
    const cache: TtlCache<number, string> = new TtlCache(1);
    cache.put(1, "value");
    assertStrictEquals(cache.get(1), "value");
  },
});

Deno.test({
  name: "test cache ttl eviction 1",
  fn() {
    const time = new FakeTime();
    try {
      const cache: TtlCache<number, string> = new TtlCache(1);
      cache.put(1, "value");
      time.tick(2e3);
      assertStrictEquals(cache.get(1), undefined);
    } finally {
      time.restore();
    }
  },
});
