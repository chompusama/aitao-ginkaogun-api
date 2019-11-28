/**
 *  @POST
 *  feed route
 * 
 *  Created by CPU on 22/11/19
 */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var request = require('request');

router.post("/:level", (req, res, next) => {

    level = req.params.level;

    request
        .post('http://192.168.137.47:3000/feed/'+ level ) // teema's url
        .on('response', function (response) {
            console.log(response.statusCode) // 200
            console.log(response.headers['content-type'])

            if (response = 'completed') {
                res.status(200).json({
                    status: "completed"
                });
            }
            else {
                res.status(401).json({
                    status: "failed"
                });
            }
        });


});

module.exports = router;