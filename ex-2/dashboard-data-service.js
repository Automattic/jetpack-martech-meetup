import { useState, useCallback, useMemo } from 'react';
import useFetchMetrics from './use-fetch-metrics';
import { exportDataToFormat } from 'data-export-utils';

const DashboardDataService = () => {
	// Default to last 30 days
	const today = new Date().toISOString().split('T')[0];
	const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
	
	// State for primary date range
	const [startDate, setStartDate] = useState(thirtyDaysAgo);
	const [endDate, setEndDate] = useState(today);
	
	// State for comparison date range (optional)
	const [comparisonStartDate, setComparisonStartDate] = useState(null);
	const [comparisonEndDate, setComparisonEndDate] = useState(null);
	
	// Construct the date range objects from state
	const dateRange = useMemo(() => ({
		start: startDate,
		end: endDate
	}), [startDate, endDate]);
	
	const comparisonDateRange = useMemo(() => {
		if (!comparisonStartDate || !comparisonEndDate) return null;
		return {
			start: comparisonStartDate,
			end: comparisonEndDate
		};
	}, [comparisonStartDate, comparisonEndDate]);
	
	// Use our custom hook for fetching primary metrics
	const { 
		isLoading, 
		data: metrics, 
		error, 
		lastUpdated, 
		clearCache 
	} = useFetchMetrics(dateRange);
	
	// Fetch comparison data if comparison date range is set
	const { 
		data: comparisonMetrics,
	} = useFetchMetrics(comparisonDateRange || { start: null, end: null });

	// Fixed and optimized aggregation function with immutability
	const getAggregatedData = useCallback((metricsData, groupBy) => {
		if (!metricsData || metricsData.length === 0) {
			return [];
		}
		
		// More efficient aggregation using reduce with immutability
		const aggregated = metricsData.reduce((acc, metric) => {
			const key = metric[groupBy];
			
			// Skip invalid keys
			if (!key) return acc;
			
			// Create a new object instead of mutating the existing one
			return {
				...acc,
				[key]: {
					name: key,
					value: (acc[key]?.value || 0) + metric.value,
					count: (acc[key]?.count || 0) + 1
				}
			};
		}, {});
		
		// Convert to array using Object.values for better performance
		return Object.values(aggregated);
	}, []);
	
	// Set comparison date range
	const setComparisonRange = useCallback((start, end) => {
		setComparisonStartDate(start);
		setComparisonEndDate(end);
	}, []);
	
	// Clear comparison
	const clearComparison = useCallback(() => {
		setComparisonStartDate(null);
		setComparisonEndDate(null);
	}, []);
	
	// Data export functionality using external library
	const exportData = useCallback((format = 'csv') => {
		if (!metrics || metrics.length === 0) {
			return { success: false, error: 'No data available to export' };
		}
		
		try {
			// Use the hypothetical library for better export handling
			const result = exportDataToFormat({
				data: metrics,
				format,
				filename: `metrics-${dateRange.start}-to-${dateRange.end}`,
				options: {
					// Configuration options for the export
					includeHeaders: true,
					dateFormat: 'YYYY-MM-DD',
					compression: format === 'json' ? 'gzip' : null,
					encoding: 'utf-8'
				}
			});
			
			return {
				success: true,
				downloadUrl: result.downloadUrl,
				filename: result.filename,
				fileSize: result.fileSize
			};
		} catch (error) {
			console.error('Export failed:', error);
			return {
				success: false,
				error: error.message || 'Failed to export data'
			};
		}
	}, [metrics, dateRange]);
	
	return {
		// Core metrics functionality
		metrics,
		isLoading,
		error,
		lastUpdated,
		
		// Aggregation functionality
		getAggregatedData,
		
		// Caching functionality
		clearCache,
		
		// Date range comparison functionality
		setComparisonRange,
		clearComparison,
		comparisonMetrics,
		
		// Data export functionality
		exportData
	};
};

export default DashboardDataService;