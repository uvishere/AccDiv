"use strict";

const DEBUG = true

const express = require('express')
const router = new express.Router()
const data = require('../dataset/dataset.json')

const { getStation, getCommonDestination } = require('../utils/station_stats')
const getTopStation = require('../utils/top_stations')
const getBikeNeedRepair = require('../utils/bike_needs_repair')

router.get('/station/:station_id/stats', async (req, res) => {
    const { station_id } = req.params

    const station = getStation(station_id);

    /* TODO : If station not available, send proper response */
    if (!station) {
        res.status(404).send({
            error: "station not found"
        })
    }
    else {
        DEBUG && console.log(getCommonDestination(station_id))
        const {to_station_id, to_station_name } = getCommonDestination(station_id)

        res.status(200).send({
            from_station_id: station_id,
            from_station: from_station_name,
            common_destination_id: to_station_id ,
            common_destination: to_station_name,
        })
    }
})

router.get('/top_stations', async (req, res) => {
    const topStations = getTopStation()
    DEBUG && console.log(topStations)

    res.status(200).send({
        message: topStations
    })
})

router.get('/bike_needs_repair', async (req, res) => {
    const bikesNeedRepair = getBikeNeedRepair()
    DEBUG && console.log(bikesNeedRepair)
    if (!bikesNeedRepair) {
        res.status(404).send({
            message: "no bikes found"
        })
    }
    else {
        res.status(200).send({
            total_bikes: bikesNeedRepair.length,
            message: bikesNeedRepair
        })
    }
})
module.exports = router
