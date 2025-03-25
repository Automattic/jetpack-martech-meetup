import { useState, useEffect, useCallback } from 'react';

// Module-level cache to persist between renders
const cache = {};

const useFetchMetrics = (dateRange, cacheTTL = 300000) => { // Default TTL: 5 minutes (300000ms)
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    
    const fetchData = useCallback(async () => {
        // Validate dateRange
        if (!dateRange || !dateRange.start || !dateRange.end) {
            setError('Invalid date range provided');
            return;
        }
        
        // Create endpoint URL
        const endpoint = `/api/metrics?start=${dateRange.start}&end=${dateRange.end}`;
        const cacheKey = `${dateRange.start}-${dateRange.end}`;
        
        try {
            setIsLoading(true);
            
            // Check if cached data exists and is still valid
            if (cache[cacheKey] && cache[cacheKey].lastUpdated) {
                const now = new Date().getTime();
                const cacheAge = now - cache[cacheKey].lastUpdated.getTime();
                
                if (cacheAge < cacheTTL) {
                    setData(cache[cacheKey].data);
                    setIsLoading(false);
                    return;
                }
            }
            
            // Fetch fresh data if cache is invalid or expired
            const response = await fetch(endpoint);
            
            if (!response.ok) {
                throw new Error(`API returned status ${response.status}`);
            }
            
            const responseData = await response.json();
            
            // Transform the data
            const transformed = responseData.metrics.map(metric => ({
                name: metric.name,
                value: metric.value,
                change: metric.previous ? (metric.value - metric.previous) / metric.previous : 0,
                trend: metric.trend
            }));
            
            // Update timestamp
            const currentTime = new Date();
            
            // Update cache
            cache[cacheKey] = {
                data: transformed,
                lastUpdated: currentTime
            };
            
            // Update state
            setData(transformed);
            setError(null);
        } catch (error) {
            setError(error.message || 'Error fetching metrics');
        } finally {
            setIsLoading(false);
        }
    }, [dateRange, cacheTTL]);
    
    // Fetch data when dateRange changes
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    // Cache clearing function
    const clearCache = useCallback((specificDateRange = null) => {
        if (specificDateRange && specificDateRange.start && specificDateRange.end) {
            // Clear specific cache entry
            const cacheKey = `${specificDateRange.start}-${specificDateRange.end}`;
            delete cache[cacheKey];
        } else {
            // Clear all cache entries
            Object.keys(cache).forEach(key => delete cache[key]);
        }
    }, []);
    
    return {
        isLoading,
        data,
        error,
        refetch: fetchData,
        clearCache
    };
};

export default useFetchMetrics;