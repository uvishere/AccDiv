"use strict";

const data = require('../dataset/dataset.json')
const DEBUG = process.env.DEBUG

//change str to number
const scrubStr = str => str.replace(/,/g,"")


// Get bikes that need repair
function getBikeNeedRepair() {
	const bikeByTripDuration = data.reduce(function (agg, current) {
		const currentBikeId = current['bikeid'];
		const currentDurationString = scrubStr(current['tripduration']);
		const currentTripDuration = Number(currentDurationString) || 0;
		const prevDuration = agg[currentBikeId] || 0;
		agg[currentBikeId] = prevDuration + currentTripDuration;
		return agg;
    }, {});
    
    DEBUG && console.log('Bike By Trip Duration: ', bikeByTripDuration);
    
	const bikes = Object.keys(bikeByTripDuration);
	DEBUG && console.log('Number of Bike By Trip Duration: ', bikes.length);
    
    const filterRepairNeedingBikes = bikes.filter(function (bikeId) {
		const bikeTripDuration = bikeByTripDuration[bikeId];
		return (bikeTripDuration / 60) > 1000;
	});
	return filterRepairNeedingBikes;
}

module.exports = getBikeNeedRepair
