import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell
} from "recharts";
import { COLORS } from "../../utils/constants";
import { TopHoldingsProps } from "./top-holdings.types";
import { ChartToolTipComponent } from "../chart-tooltip-component/chart-tooltip-component";

export default function TopHoldingsComponent({ top5 }: TopHoldingsProps) {
    return (
        <div className="bg-surface-2 border border-border rounded-xl px-5 pb-4 pt-5 mb-6">
            <div className="mb-5">
                <h2 className="m-0 mb-1 text-[15px] font-semibold">
                    Top 5 Holdings
                </h2>
                <p className="m-0 text-xs text-text-muted">
                    By holding size (weight × latest close price)
                </p>
            </div>

            <ResponsiveContainer width="100%" height={240}>
                <BarChart data={top5} margin={{ top: 4, right: 8, bottom: 4, left: 8 }} barCategoryGap="30%">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 13, fontWeight: 600, fill: "var(--text-primary)", fontFamily: "var(--mono)" }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "var(--mono)" }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `$${v.toFixed(1)}`}
                        width={52}
                    />
                    <Tooltip content={<ChartToolTipComponent />} cursor={{ fill: "var(--surface)" }} />
                    <Bar dataKey="holdingSize" radius={[4, 4, 0, 0]}>
                        {top5.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}