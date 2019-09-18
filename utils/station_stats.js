"use strict";

const data = require('../dataset/dataset.json')
const DEBUG = process.env.DEBUG || true

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


//change str to number
const scrubStr = str => str.replace(/,/g,"")

//calculate total revenue from the given station id
function getRevenue(station_id) {
	const filtredData = data.filter(function ({ from_station_id }) {
		return from_station_id == station_id
	})
	const totalDuration = filtredData.reduce(function (agg, current) {
		const currentDurationString = scrubStr(current['tripduration']);
		const currentDuration = Number(currentDurationString) || 0;
		const prevDuration = agg || 0;
		return prevDuration + currentDuration;
    }, 0);	

	return (totalDuration / 60) * 0.1
	
}


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

/* TODO filter prevalent group of users at the given station id*/

/* TODO trend line for Trip Duration with respect to Start Time */

module.exports = {getStationFromBeginning, getStationFromEnd, getRevenue, getCommonDestination}
