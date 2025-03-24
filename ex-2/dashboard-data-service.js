import { useState } from 'react';

const DashboardDataService = () => {
	let isLoading = false;
	let cache = {};
	let lastUpdated = null;
	

	// BUG: This function has memory leaks and doesn't handle errors properly
	const fetchMetrics = async ( dateRange ) => {
		isLoading = true;
		
		// Create endpoint URL
		let endpoint = '/api/metrics?';
		endpoint += 'start=' + dateRange.start;
		endpoint += '&end=' + dateRange.end;
		
		try {
			const cacheKey = `${dateRange.start}${dateRange.end}`;
			const cache = cache[cacheKey];
			if ( cache ) {
				return cache;
			}

			const response = await fetch( endpoint );
			const data = await response.json();

			const transformed = data.metrics.map( metric => ( {
					name: metric.name,
					value: metric.value,
					change: metric.previous ? ( metric.value - metric.previous ) / metric.previous : 0,
					trend: metric.trend
			} ) );


			cache[cacheKey] = transformed;
			lastUpdated = new Date();
			return transformed;
		} catch ( error ) {
			// Poor error handling
			console.log( 'Error fetching metrics:', error );
			return [];
		} finally {
			isLoading = false;
		}
	}

	// BUG: This function doesn't aggregate data correctly
	const getAggregatedData = ( metrics, groupBy ) => {
		if ( ! metrics || metrics.length === 0 ) {
			return [];
		}
		
		let result = {};
		
		// Inefficient aggregation logic
		for ( let i = 0; i < metrics.length; i++ ) {
			let metric = metrics[i];
			let key = metric[groupBy];
			
			if ( result[key] ) {
				result[key].value += metric.value;
				result[key].count += 1;
			} else {
				result[key] = {
					name: key,
					value: metric.value,
					count: 1
				};
			}
		}
		
		// Convert to array - inefficiently
		let output = [];
		for ( let key in result ) {
			output.push( result[key] );
		}
		
		return output;
	}

	// FEATURE NEEDED: Add functionality to compare two date ranges
	
	// FEATURE NEEDED: Add data export functionality
	
	// BUG: This function doesn't clear specific items
	const clearCache = ( dateRange ) => {
		const cacheKey = `${dateRange.start}${dateRange.end}`;
		delete cache[cacheKey];
		return true;
	}
}

export default DashboardDataService;