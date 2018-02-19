export default {
  getFlag(countryName) {
    const source = `https://restcountries.eu/rest/v2/name/${countryName}?fields=flag`;

    return new Promise((resolve, reject) => {
      fetch(source)
        .then((response) => {
          try {
            // Try to parse response as JSON
            response.json()
              .then((data) => {
                console.log('[OK] Fetched country data');
                resolve(data[0].flag);
              })
              .catch(() => {
                reject(new Error('[ERR] Could not parse JSON'));
              });
          } catch (error) {
            reject(new Error('[ERR] Could not parse JSON 2?'));
          }
        })
        .catch(() => {
          reject(new Error('[ERR] Could not fetch country data'));
        });
    });
  },
};
