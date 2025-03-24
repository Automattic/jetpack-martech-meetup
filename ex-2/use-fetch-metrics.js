const useFetchMetrics = async ( dateRange ) => {
    let isLoading = false;
	let cache = {};
	let lastUpdated = null;
    
    // Create endpoint URL
    let endpoint = '/api/metrics?';
    endpoint += 'start=' + dateRange.start;
    endpoint += '&end=' + dateRange.end;
    
    try {
        isLoading = true;
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
        return {
            isLoading: false,
            data: transformed,
        }
    } catch ( error ) {
        // Poor error handling
        console.log( 'Error fetching metrics:', error );
        return {
            isLoading: false,
            data: [],
        }

    }
}

export default useFetchMetrics;