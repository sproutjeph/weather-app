const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZG9uamVwaCIsImEiOiJja3cyYjl0eTEwZTBxMndwYWZrZzVpNWl1In0.Vkp1_QuzZ9x-YSEVce0lCQ`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('unable to connect to location');
    } else if (response.body.features.length === 0) {
      callback('unable to find location. try another search', undefined);
    } else {
      callback(undefined, {
        long: response.body.features[0].center[0],
        lat: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
