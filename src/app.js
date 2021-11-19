const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forcast');

const app = express();
const port = process.env.PORT || 3000;
//define paths
const htmlFilePath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
//setup static directory
app.use(express.static(htmlFilePath));
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about me',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'help page',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'please provide an address',
    });
  }

  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: `${req.query.address}`,
      });
    });
  });
});

app.get('/products', (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'jeph',
    errorMessage: 'help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'jeph',
    errorMessage: 'page not found',
  });
});
app.listen(port, () => {
  console.log(`server is runing on ${port}`);
});
