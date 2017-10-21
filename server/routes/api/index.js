const express = require('express');
const router = express.Router();
const GYGProduct = require('../../models/gygProduct');

router.get('/product/:id', (req, res, next) => {
  GYGProduct.findById(req.params.id, (err, doc) => {
    if (err) {
      console.log(err + "ERROR");
    } else {
      res.json(doc);
    }
  });
});

module.exports = router;
