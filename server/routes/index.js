const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');
const request = require('request');
const fs = require('fs');



/* GET home page. */
router.get('/viator/:city', (req, res, next) => {
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

router.get('/gyg/:city', (req, res, next) => {
  // request("http://www.getyourguide.com/s/?q=" + req.params.city, (request, response, body)=> {
  //   const $ = cheerio.load(body);  
    let $ = cheerio.load(fs.readFileSync('/Users/markallen/Documents/Projects/Travescrape/server/examples/gyg-example.htm'));
    let cards = [];
    $(".activity-card").each((i, elem) => {
      card = {}
      card.number = i + 1;
      card.title = $(elem).find('.activity-card-title').text();
      card.link = $(elem).find('.activity-card-link').attr('href');
      card.price = $(elem).find('.price').text();
      card.reviews = parseInt($(elem).find('.rating-total').text().split(' ')[0]);
      card.duration = $(elem).find('.activity-duration').text().split(' ')[0];
      cards[i] = card;
    });
  res.json(cards);
  // });
});

module.exports = router;
