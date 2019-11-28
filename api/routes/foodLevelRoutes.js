/**
 *  @GET
 *  get food level route
 * 
 *  Created by CPU on 23/11/19
 */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var request = require('request');

router.post("/", (req, res, next) => {

    request
        .get('http://192.168.137.47:3000/foodlevel', function(err, response, body) {
            console.log(body);
            
            res.status(200).send(body);
        });

});

module.exports = router;