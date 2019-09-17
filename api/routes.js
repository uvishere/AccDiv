"use strict";
const DEBUG = 1
const express = require('express')
const router = new express.Router()
const data = require('../dataset/dataset.json')


function getStationName(id) {
    for (const item of data) {
        if(item.from_station_id == id) { 
            console.log(item.from_station_name)
            return item.from_station_name
        } else if(item.to_station_id == id) {
            return item.to_station_name
        }
    }
}

router.get('/station/:id/stats', async (req, res) => {
    DEBUG && console.log(req.params.id)
    const station_id = req.params.id

    //filter rows containing requested from_station_id
    const filtredData = data.filter(function ( {from_station_id} ) {
        return from_station_id == station_id
    })

    
    const destinationCount = filtredData.reduce((agg, current) => {
        const { to_station_id } = current
        if (agg[to_station_id]) {
            return {...agg, [to_station_id]: + agg[to_station_id]}
        } else {
            return {...agg, [to_station_id]:1}
        }
    }, {})

    const destinations = Object.keys(destinationCount)

    const commonDest = destinations.sort((a, b) => {
        const aVal = destinationCount[a]
        const bVal = destinationCount[b]
        return bVal - aVal
    })[0]

    res.status(200).send({
        length: filtredData.length,
        from_station_id: station_id,
        from_station: getStationName(station_id),
        common_destination_id: commonDest,
        common_destination: getStationName(commonDest),
        message: "done"
    })
})


module.exports = router
