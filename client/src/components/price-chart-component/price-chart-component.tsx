import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Brush,
    ReferenceLine,
} from "recharts";
import { fmt } from "../../utils/formatters";
import { ETFPriceChartProps } from "./price-chart.types";
import { ChartToolTipComponent } from "../chart-tooltip-component/chart-tooltip-component";

export default function PriceChartComponent({ data, etfName }: ETFPriceChartProps) {
    const prices = data.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const firstPrice = data[0]?.price ?? 0;
    const lastPrice = data[data.length - 1]?.price ?? 0;
    const change = lastPrice - firstPrice;
    const changePct = ((change / firstPrice) * 100).toFixed(2);
    const isPositive = change >= 0;

    return (
        <div className="bg-surface border border-border rounded-xl px-5 pb-4 pt-5 mb-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-5">
                <div>
                    <h2 className="m-0 mb-1 text-[15px] font-semibold">
                        {etfName} — Reconstructed Price
                    </h2>
                    <p className="m-0 text-xs text-text-muted">
                        Weighted sum of constituent close prices · Drag the brush below to zoom
                    </p>
                </div>
                <div className="text-right">
                    <div className="font-mono text-[22px] font-semibold">
                        {fmt.format(lastPrice)}
                    </div>
                    <div
                        style={{ color: isPositive ? "var(--bmo-green)" : "var(--bmo-red)" }}
                        className="font-mono text-[13px] font-medium"
                    >
                        {isPositive ? "+" : ""}{fmt.format(change)} ({isPositive ? "+" : ""}{changePct}%)
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={320}>
                <LineChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: 8 }}>
                    <defs>
                        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--bmo-blue)" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="var(--bmo-blue)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "var(--mono)" }}
                        tickLine={false}
                        axisLine={false}
                        interval={19}
                    />
                    <YAxis
                        domain={[minPrice * 0.98, maxPrice * 1.02]}
                        tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "var(--mono)" }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `$${v.toFixed(0)}`}
                        width={52}
                    />
                    <Tooltip content={<ChartToolTipComponent />} />
                    <ReferenceLine y={firstPrice} stroke="var(--text-muted)" strokeDasharray="4 4" strokeWidth={1} />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="var(--bmo-blue)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, fill: "var(--bmo-blue)", strokeWidth: 0 }}
                    />
                    <Brush
                        dataKey="date"
                        height={24}
                        stroke="var(--border)"
                        fill="var(--surface)"
                        travellerWidth={6}
                        tickFormatter={() => ""}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}