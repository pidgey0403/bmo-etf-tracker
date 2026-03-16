/**
 * Service layer
 *
 * All business logic for ETF computation lives here.
 * No knowledge of HTTP (no req/res), no knowledge of how data is stored.
 * Depends on the data layer (priceStore) and utils (csvParser).
 */

import { getDateRange, getLatestDate, getLatestPrices, getPriceMap, getSortedDates } from "../data/priceStore";
import { EnrichedHolding, ETFAnalysisResult, ETFHolding, PricePoint } from "../types/etf.types";
import { parseETFWeights } from "../utils/csvParser";


function computePriceSeries(holdings: ETFHolding[]): PricePoint[] {
    const priceMap = getPriceMap();
    return getSortedDates().map((date) => {
        const dayPrices = priceMap[date] ?? {};
        const price = holdings.reduce((sum, h) => {
            return sum + h.weight * (dayPrices[h.name] ?? 0);
        }, 0);
        return { date, price: parseFloat(price.toFixed(4)) };
    });
}

function enrichHoldings(holdings: ETFHolding[]): EnrichedHolding[] {
    const latestPrices = getLatestPrices();
    return holdings.map((h) => {
        const latestPrice = latestPrices[h.name] ?? null;
        const holdingSize =
            latestPrice !== null
                ? parseFloat((h.weight * latestPrice).toFixed(4))
                : null;
        return { ...h, latestPrice, holdingSize };
    });
}

function getTop5(enriched: EnrichedHolding[]): EnrichedHolding[] {
    return [...enriched]
        .filter((h) => h.holdingSize !== null)
        .sort((a, b) => (b.holdingSize ?? 0) - (a.holdingSize ?? 0))
        .slice(0, 5);
}

export function analyzeETF(csvContent: string): ETFAnalysisResult {
    const holdings = parseETFWeights(csvContent);

    if (!holdings.length) {
        throw new Error("CSV contains no holdings");
    }

    const enriched = enrichHoldings(holdings);
    const priceSeries = computePriceSeries(holdings);
    const latestETFPrice = priceSeries[priceSeries.length - 1]?.price ?? 0;

    return {
        holdings: enriched,
        top5: getTop5(enriched),
        priceSeries,
        meta: {
            latestDate: getLatestDate(),
            dateRange: getDateRange(),
            totalHoldings: holdings.length,
            latestETFPrice,
        },
    };
}