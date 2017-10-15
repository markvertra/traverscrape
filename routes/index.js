const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');
const request = require('request');



/* GET home page. */
router.get('/viator/:city', (req, res, next) => {
  request("http://www.viator.com/" + req.params.city, (request, response, body)=> {
    const $ = cheerio.load(body);
    item = $("body").html();
    res.send(body);
  });
});

router.get('/getyourguide/:city', (req, res, next) => {
  request("http://www.getyourguide.com/" + req.params.city, (request, response, body)=> {
    const $ = cheerio.load(body);
    item = $("body").html();
    res.send(body);
  });
});

module.exports = router;
