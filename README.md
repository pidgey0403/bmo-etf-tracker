# BMO Capital Markets - ETF Price Monitor

A single-page web application for visualizing historical ETF prices and holdings, built for the BMO Capital Markets Data Cognition Team interview challenge.

## Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 19, TypeScript, Vite              |
| Styling   | Tailwind CSS v4                         |
| Charts    | Recharts                                |
| Backend   | Node.js, Express, TypeScript            |
| Parsing   | csv-parse                               |
| Upload    | Multer (memory storage)                 |

## Project Structure
```
etf-price-monitor/
├── client/                        # Vite + React + TypeScript
│   └── src/
│       ├── components/
│       │   ├── chart-tooltip-component/
│       │   ├── file-upload-component/
│       │   ├── holdings-component/
│       │   ├── price-chart-component/
│       │   ├── statistics-component/
│       │   └── top-holdings-component/
│       ├── hooks/
│       │   └── useEtfUpload.ts    # Encapsulates fetch, loading, error state
│       ├── types/
│       │   └── global.types.ts    # Shared TypeScript interfaces
│       ├── utils/
│       │   ├── constants.ts       # Theme colors, chart palette
│       │   └── formatters.ts      # Currency and percent formatters
│       └── App.tsx
└── server/                        # Express + TypeScript
    ├── data/                      
    └── src/
        ├── controllers/
        │   └── etfController.ts   # Handles req/res, delegates to service
        ├── routes/
        │   └── etfRoutes.ts       # Maps routes to /upload to controller
        ├── services/
        │   └── etfService.ts      # ETF computation logic
        ├── data/
        │   └── priceStore.ts      # In-memory price map (data layer)
        ├── types/
        │   └── etf.ts             # Shared server-side interfaces
        ├── utils/
        │   └── csvParser.ts       # Pure CSV string → object parsing
        └── index.ts               # Server bootstrap
```

## Running Locally

### Prerequisites
- Node.js 22+
- npm 9+

### 1. Install dependencies
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Start both services simultaneously
```bash
npm run dev

```
Frontend server running on http://localhost:5173

Backend server running on http://localhost:3001

The Vite dev server proxies `/api` requests to `localhost:3001`.

## How It Works

### Data architecture

`prices.csv` (100 trading days × 26 tickers) is loaded into memory once on server startup as a nested map:
```
priceMap["2017-01-01"]["A"] = 27.657
```

No database is used. The dataset is ~2,600 data points and a database would add latency and complexity with no benefit for a static dataset of this size. However, if prices were streaming in live or the dataset were significantly larger, as is often the case in a real production application, a time-series database would be the appropriate next step.

When a user uploads an ETF CSV the server parses the weights, joins against the in-memory price map, computes the full price series and holdings breakdown, and returns everything in a single response.

### ETF price formula
```
ETF_price(t) = Σ [ weight_i × close_price_i(t) ]
```

### Holding size formula
```
holding_size_i = weight_i × close_price_i(latest_date)
```

## Assumptions

1. **Weights are static** - constituent weights do not change over the historical period, as specified in the challenge
2. **Prices are close prices** - values in `prices.csv` are treated as end-of-day close prices
3. **All dates are valid trading days** - no filtering applied for weekends or holidays
4. **Latest close** - defined as the last row in `prices.csv` by date sort order
5. **Weight normalization** - weights are used as-is without normalization. ETF1 weights sum to ~1.003 due to rounding but for the purposes of this application, this is left as-is
6. **Four column table** - the spec requires three columns (name, weight, latest close). A fourth column for holding size (weight × price) was added as it is directly computable from the required data and provides useful context alongside the bar chart
7. **Uploaded files must match the ETF1/ETF2 schema** - `name` and `weight` columns are required

## Features

- CSV upload with drag-and-drop
- Summary strip showing ETF name, reconstructed price, date range, and constituent count
- Zoomable time series with brush range selector
- Top 5 holdings bar chart by holding size as of latest close
- Sortable holdings table — click any column header to sort

## Screenshots
![Landing page](image.png)
![ETF Price Info](image-1.png)