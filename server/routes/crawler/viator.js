const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');
const request = require('request');
const fs = require('fs');

router.get('/:city', (req, res, next) => {
  // request("http://www.viator.com/" + req.params.city, (request, response, body)=> {
  //   const $ = cheerio.load(body);
  //   item = $("body").html();
  //   res.json(body);
  // });
  let $ = cheerio.load(fs.readFileSync('/Users/markallen/Documents/Projects/Travescrape/server/examples/viator-example.htm'));
  let units = []
  $('.unit').each((i, elem) => {
    units[i] = elem
  })
  res.json(units);
});

module.exports = router;