const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');
const request = require('request');
const fs = require('fs');
const GYGProduct = require('../../models/gygProduct');

router.get('/save/:city', (req, res, next) => {
  // request("http://www.getyourguide.com/s/?q=" + req.params.city, (request, response, body)=> {
  //   const $ = cheerio.load(body);  
    let $ = cheerio.load(fs.readFileSync('/Users/markallen/Documents/Projects/Travescrape/server/examples/gyg-example.htm'));
    let cards = [];
    $(".activity-card").each((i, elem) => {
      card = {};
      card.mainPageRank = i + 1;
      card.city = req.params.city;
      card.title = $(elem).find('.activity-card-title').text();
      card.shortDescription = $(elem).find('.small-description').text();
      card.link = $(elem).find('.activity-card-link').attr('href');
      card.price = $(elem).find('.price').text();
      card.reviews = (parseInt($(elem).find('.rating-total').text().split(' ')[0]) || 0);
      card.duration = $(elem).find('.activity-duration').text().split(' ')[0];
      cards[i] = card;
    });
    GYGProduct.insertMany(cards, (err, docs) => {
      if (err) {
        next(err);
        res.send(err);
      }
      res.send('<h2>success</h2>');
    });
});

router.get('/:city', (req, res, next) => {
  
   GYGProduct.find({}, (err, docs) => {
     if (err) {
       res.send(err);
     }
    res.json(docs);
   });
});

function scrapeForOwner(link){
  request(link, (request, reponse, body) => {
    let $ = cheerio.load(body);
    return $(".activity-supplier-link").text();
  });
}


module.exports = router;