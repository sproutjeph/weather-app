const request = require('request');

const forcast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=57f407eafd10e378a243605ded51ca0c&query=${lat},${long}&units=f`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('network error', undefined);
    } else if (response.body.error) {
      callback('unable to find location', undefined);
    } else {
      const temp = response.body.current.temperature;
      const sentence = `It is currently ${temp} degrees out. there is 0% chance of rain`;
      callback(undefined, sentence);
    }
  });
};

module.exports = forcast;
