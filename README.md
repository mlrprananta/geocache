# geocache

In-memory cache for storing bucketed geolocation data in Deno.

# Usage

```
import { GeolocationCache } from "https://deno.land/x/geocache/mod.ts";

const cache = new GeolocationCache<string>(1);

cache.put(51, 3, "data");

let value = cache.get(51, 3);
```

## Use Case

- Data can be stored in the cache and fetched from the cache given a latitude
  and longitude.
- Coordinates are grouped into buckets, and data is cached per bucket. Each
  bucket represents the space between the graticules.
- The space between the graticules is determined by the given interval in
  decimal degrees. A lower interval decreases the distance between the
  graticules and increases the accuracy of geolocation data, but it also
  increases the maximum cache size.
- The underlying cache is a TTL cache (more policies are planned).
