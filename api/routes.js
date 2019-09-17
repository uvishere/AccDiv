"use strict";

const express = require('express')
const router = new express.Router()

//API for from station

router.get('/', async (req, res) => {
    res.status(200).send({
        message: "API Initialised"
    })
})

module.exports = router
