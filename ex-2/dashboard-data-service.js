// dashboard-data-service.js

class DashboardDataService {
	constructor() {
		this.cache = {};
		this.isLoading = false;
		this.lastUpdated = null;
	}
	
	// BUG: This function has memory leaks and doesn't handle errors properly
	async fetchMetrics( dateRange ) {
		this.isLoading = true;
		
		// Create endpoint URL
		let endpoint = '/api/metrics?';
		endpoint += 'start=' + dateRange.start;
		endpoint += '&end=' + dateRange.end;
		
		try {
			// Inefficient - doesn't use caching properly
			const response = await fetch( endpoint );
			const data = await response.json();
			
			// Problematic data transformation
			const transformed = [];
			for ( let i = 0; i < data.metrics.length; i++ ) {
				let metric = data.metrics[i];
				transformed.push( {
					name: metric.name,
					value: metric.value,
					change: metric.previous ? ( metric.value - metric.previous ) / metric.previous : 0,
					trend: metric.trend
				} );
			}
			
			this.cache[dateRange.start + dateRange.end] = transformed;
			this.lastUpdated = new Date();
			return transformed;
		} catch ( error ) {
			// Poor error handling
			console.log( 'Error fetching metrics:', error );
			return [];
		} finally {
			this.isLoading = false;
		}
	}
	
	// BUG: This function doesn't aggregate data correctly
	getAggregatedData( metrics, groupBy ) {
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
	clearCache( dateRange ) {
		// This just clears everything, not specific ranges
		this.cache = {};
		return true;
	}
}

export default DashboardDataService;