/**
 *  @POST
 *  set timer for feed your dog automatic
 * 
 *  body require
 *      time: "string" 11:30
 *      hour: "string"
 *      minute: "string"
 *      
 *  @GET
 *   sent all timer
 * 
 *  Created by CPU on 23/11/19
 */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var request = require('request');
const cron = require('node-cron');

const dataCollection = require('../models/dataModel');

router.post("/", (req, res, next) => {

    console.log('set timer completed')

    res.status(200).json({
        status: "completed"
    });

    var time = req.body.timer;
    var hour = parseInt(time.slice(0, 2));
    var minute = parseInt(time.slice(3, 5));

    var getDate = new Date(Date.now()).getDate();
    var getMonth = new Date(Date.now()).getMonth() + 1;

    let schedule = minute + ' ' + hour + ' ' + getDate + ' ' + getMonth + ' *';

    / push timer in db /
    dataCollection.updateOne({ name: 'TuaNgok' }, {
        $push: {
            timer: {
                time: time
            }
        }
    }, function (err, docs) {
        console.log(err)
        console.log('add timer in db successful')
    });

    / cron /
    cron.schedule(schedule, () => {
        console.log('running cron');

        / delete timer in db /
        dataCollection.updateOne({ name: 'TuaNgok' }, {
            $pull: {
                timer: {
                    time: time
                }
            }
        }, function (err, docs) {
            console.log(err)
            console.log('delete timer in db successful')
        });

        / feed your dog /
        request
            .post('http://192.168.137.47:3000/feed/1') // teema's url
            .on('response', function (response) {
                console.log(response.statusCode) // 200
                console.log(response.headers['content-type'])
            });
    }, {
            scheduled: true,
            timezone: "Asia/Bangkok"
        });

});


/ for bb /
router.get("/", (req, res, next) => {

    dataCollection.findOne({ name: 'TuaNgok' })
        .exec()
        .then(docs => {
            res.status(200).json(docs.timer);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

module.exports = router;