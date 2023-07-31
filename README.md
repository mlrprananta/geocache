# Bucketed Geolocation Cache
Deno-native in-memory cache for storing geolocated data.

## Use Case

- This cache will store and fetch data for a given longitude and latitude.
- Coordinates are grouped into buckets, and data is cached per bucket. Each bucket represents a block in the graticule.
- The size of the block is determined by the interval in decimal degrees. A lower interval means more accurate geolocation data, but also increases the maximum cache size.
- The underlying cache is a TTL cache (more policies are planned).
