/**
 * Shared TypeScript interfaces for the server
 */

export interface ETFHolding {
    name: string;
    weight: number;
}

export interface EnrichedHolding extends ETFHolding {
    latestPrice: number | null;
    holdingSize: number | null;
}

export interface PricePoint {
    date: string;
    price: number;
}

export interface ETFMeta {
    latestDate: string;
    dateRange: { start: string; end: string };
    totalHoldings: number;
    latestETFPrice: number;
}

export interface ETFAnalysisResult {
    holdings: EnrichedHolding[];
    top5: EnrichedHolding[];
    priceSeries: PricePoint[];
    meta: ETFMeta;
}