import { ETFMeta } from "../../types/global.types";

export interface StatsStripProps {
    meta: ETFMeta;
    etfName: string;
}

export interface StatsCardProps {
    label: string;
    value: string; mono?: boolean
}