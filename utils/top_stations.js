"use strict";

const data = require('../dataset/dataset.json')
const DEBUG = process.env.DEBUG

//change str to number
const scrubStr = str => str.replace(/,/g,"")


// Get overall top three tations
function getTopStation() {
	const stationByTripDuration = data.reduce(function (agg, current) {
		const currentDurationString = scrubStr(current['tripduration']);
		const currentDuration = Number(currentDurationString) || 0;
		const fromStation = current['from_station_id'];
		const prevDuration = agg[fromStation] || 0;
		agg[fromStation] = prevDuration + currentDuration;
		return agg;
    }, {});	
    
    DEBUG && console.log('Station By Trip Duration: ', stationByTripDuration);
    
	const stations = Object.keys(stationByTripDuration);
	const topThreeStationByTripDuration = stations.sort(function (a, b) {
		return stationByTripDuration[b] - stationByTripDuration[a];
	}).splice(0, 3);
	return topThreeStationByTripDuration;
}

module.exports = getTopStation
