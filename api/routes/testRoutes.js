/**
 *  @POST
 *  test route
 * 
 *  Created by CPU on 22/11/19
 */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/", (req, res, next) => {

    res.json({
        status: "successfully",
        message: "ก็ทำได้หนิ"
    })

});

module.exports = router;