import FileUpload from "./components/file-upload-component/file-upload-component";
import StatsStrip from "./components/statistics-component/statistics-component";
import ETFPriceChart from "./components/price-chart-component/price-chart-component";
import TopHoldingsBar from "./components/top-holdings-component/top-holdings-component";
import HoldingsTable from "./components/holdings-component/holdings-component";
import { useETFUpload } from "./hooks/useEtfUpload";

export default function App() {
  const { data, etfName, isLoading, error, handleUpload } = useETFUpload();

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-bmo-dark border-b-[3px] border-bmo-blue px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="font-sans font-bold text-[18px] text-white tracking-tight">
            BMO
          </div>
          <div className="w-px h-5 bg-white/20" />
          <div className="text-[13px] text-white/70 font-normal">
            Capital Markets · Data Cognition · ETF Price Monitor
          </div>
        </div>
        <div className="text-[11px] font-mono text-white/40 tracking-[0.05em]">
          ETF VIEWER
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-6 py-8">
        {/* Upload panel */}
        <div
          style={{ gridTemplateColumns: data ? "320px 1fr" : "1fr" }}
          className="grid gap-6 mb-7 transition-all duration-300"
        >
          <div>
            {!data && (
              <div className="mb-5">
                <h1 className="m-0 mb-1.5 text-2xl font-semibold text-bmo-dark">
                  ETF Price Viewer
                </h1>
                <p className="m-0 text-text-secondary text-sm">
                  Upload an ETF constituents file to view reconstructed historical prices and holdings breakdown.
                </p>
              </div>
            )}
            <FileUpload onUpload={handleUpload} isLoading={isLoading} />
            {error && (
              <div className="mt-3 px-3.5 py-2.5 bg-red-50 border border-red-200 rounded-lg text-[13px] text-bmo-red">
                {error}
              </div>
            )}
          </div>

          {data && (
            <div className="self-end">
              <StatsStrip meta={data.meta} etfName={etfName} />
            </div>
          )}
        </div>

        {/* Charts + table */}
        {data && (
          <>
            <ETFPriceChart data={data.priceSeries} etfName={etfName} />
            <TopHoldingsBar top5={data.top5} />
            <HoldingsTable holdings={data.holdings} />
          </>
        )}

        {/* Empty state */}
        {!data && !isLoading && (
          <div className="mt-12 text-center text-text-muted">
            <div className="text-5xl mb-3">📈</div>
            <p className="text-sm">
              Upload <span className="font-mono text-bmo-blue">ETF1.csv</span> or{" "}
              <span className="font-mono text-bmo-blue">ETF2.csv</span> to get started.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}