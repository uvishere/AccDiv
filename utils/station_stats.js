"use strict";

const data = require('../dataset/dataset.json')
const DEBUG = process.env.DEBUG

function getStationFromBeginning(id) {
	return data.find(function ({ from_station_id }) {
		return from_station_id == id
	})
}

function getStationFromEnd(id) {
	return data.find(function ({ to_station_id }) {
		return to_station_id == id
	})
}

/* TODO merge getStationFromBeginning and getStationFromEnd function */

//Get the common destination from the given station_id
function getCommonDestination(station_id) {
	const filtredData = data.filter(function ({ from_station_id }) {
		return from_station_id == station_id
	})
	
	const destinationCount = filtredData.reduce((agg, current) => {
		const { to_station_id } = current
		const prevCount = agg[to_station_id] || 0
		agg[to_station_id] = prevCount + 1

		return agg
	}, {})

	const destinations = Object.keys(destinationCount)

	/* sort the number of destinations by count and return the max value */
	return destinations.sort((a, b) => {
		const aVal = destinationCount[a]
		const bVal = destinationCount[b]
		return bVal - aVal
	})[0]
}


module.exports = {getStationFromBeginning, getStationFromEnd, getCommonDestination}
