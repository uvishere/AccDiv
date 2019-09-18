"use strict";

const DEBUG = true

const express = require('express')
const router = new express.Router()
const data = require('../dataset/dataset.json')

const { getStationName, getCommonDestination } = require('../utils/station_stats')
const getTopStation = require('../utils/top_stations')
const getBikeNeedRepair = require('../utils/bike_needs_repair')

router.get('/station/:station_id/stats', async (req, res) => {
    const { station_id } = req.params

    const station = getStationName(station_id);

    if (!station) {
        return res.status(404).send({
            error: "station not found"
        })
    }

    const to_station_id = getCommonDestination(station_id)
    const from_station_name = getStationName(station_id)
    const to_station_name = getStationName(to_station_id).from_station_name

    res.status(200).send({
        data: {
            from_station_id: station_id,
            from_station: from_station_name,
            common_destination_id: to_station_id,
            common_destination: to_station_name,    
        },
        message: "data fetched successfully"
    })
})


router.get('/top_stations', async (req, res) => {
    const topStations = getTopStation()
    DEBUG && console.log(topStations)
    
    res.status(200).send({
        data: topStations,
        message: "data fetched successfully"
    })
})


router.get('/bike_needs_repair', async (req, res) => {
    const bikesNeedRepair = getBikeNeedRepair()
    
    res.status(200).send({
        data: bikesNeedRepair,
        message: "data fetched successfully"
    })
})
module.exports = router
