import { useState } from 'react';
import useFetchMetrics from './use-fetch-metrics';

const DashboardDataService = () => {

	// BUG: This function has memory leaks and doesn't handle errors properly
	const fetchMetrics = useFetchMetrics( dateRange );

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