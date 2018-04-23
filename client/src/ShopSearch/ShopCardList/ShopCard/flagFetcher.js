import cachedFetch from '../../cachedFetch';

export default {
/**
 * Retrieve a country flag from restcountries.eu in SVG format.
 * @param {string} countryName Non full name of a country to fetch.
 */
  getFlag(countryName) {
    const source = `https://restcountries.eu/rest/v2/name/${countryName}?fields=flag`;

    return new Promise((resolve, reject) => {
      cachedFetch(source, 86400) // One day cache
        .then((response) => {
          try {
            // Try to parse response as JSON
            response.json()
              .then((data) => {
                resolve(data[0].flag);
              })
              .catch(() => {
                reject(new Error('Flag is not a JSON object'));
              });
          } catch (error) {
            reject(new Error(error));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
