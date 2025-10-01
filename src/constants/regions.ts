export const regions = [
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
] as const

export type Region = typeof regions[number]