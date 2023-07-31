# Bucketed Geolocation Cache
Deno-native cache for storing geolocated data.

## Use Case

- This cache will store data for a given longitude and latitude.
- To prevent caching every possible coordinate, coordinates will be grouped into buckets. Each bucket represents a block in the graticule.
- The size of the block is determined by the degree-interval.
- The underlying cache is a TTL cache (more policies are planned).
