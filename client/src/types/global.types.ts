export interface Holding {
    name: string;
    weight: number;
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

export interface ETFResponse {
    holdings: Holding[];
    top5: Holding[];
    priceSeries: PricePoint[];
    meta: ETFMeta;
}

export interface UseETFUpload {
    data: ETFResponse | null;
    etfName: string;
    isLoading: boolean;
    error: string | null;
    handleUpload: (file: File) => Promise<void>;
}

export type SortKey = "name" | "weight" | "latestPrice" | "holdingSize";

export type SortDir = "asc" | "desc";