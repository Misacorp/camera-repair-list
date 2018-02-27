/**
 * Cache data received by Fetch
 * https://www.sitepoint.com/cache-fetched-ajax-requests/
 * @param {string} url URL to fetch from
 * @param {object} options Fetch options object
 */
function cachedFetch(url, o) {
  // Define an expiry time for cached data.
  let expiry = 60 * 60; // One hour default
  let options = o;
  if (typeof options === 'number') {
    expiry = options;
    options = null;
  } else if (typeof options === 'object') {
    // Special case for 0 second cache duration
    if (options.seconds === 0) expiry = 0;
    expiry = options.seconds || expiry;
  }

  // Use URL as cache key
  const cacheKey = url;
  const cached = localStorage.getItem(cacheKey);
  const whenCached = localStorage.getItem(`${cacheKey}:ts`);
  if (cached !== null && whenCached !== null) {
    // Resource exists in localStorage
    // Check how old it is
    const age = (Date.now() - whenCached) / 1000;
    if (age < expiry) {
      // Resource is still valid. Return it from cache.
      const response = new Response(new Blob([cached]));
      return Promise.resolve(response);
    }
    // Resource is outdated. Clean up old entry and timestamp.
    localStorage.removeItem(cacheKey);
    localStorage.removeItem(`${cacheKey}:ts`);
  }

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        // Only store JSON or non-binary objects in cache.
        if (response.status === 200) {
          const contentType = response.headers.get('Content-Type');
          if (contentType && (contentType.match(/application\/json/i) || contentType.match(/text\//i))) {
            // If we don't clone the response, it will be consumed by the time it's returned.
            // This way we're being un-intrusive.
            response.clone().text()
              .then((content) => {
                // Save response item and timestamp to localStorage
                localStorage.setItem(cacheKey, content);
                localStorage.setItem(`${cacheKey}:ts`, Date.now());
              })
              .catch(() => reject(new Error('Could not parse response as text or JSON, possibly due to CORS')));
          }
          resolve(response);
        }
      })
      .catch(() => reject(new Error('No response from remote data source')));
  });
}

export default cachedFetch;
