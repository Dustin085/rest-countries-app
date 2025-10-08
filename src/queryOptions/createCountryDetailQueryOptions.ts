import type { RestCountriesQueryField } from "@/types/restCountriesQueryField";
import { queryOptions } from "@tanstack/react-query";
import z from "zod";

const defaultCountryDetailFields: RestCountriesQueryField[] = ["name", "borders", "currencies", "flags", "languages", "population", "region", "subregion", "tld", "capital"]

export const CountryDetailSchema = z.object({
    borders: z.array(z.string()),
    capital: z.array(z.string()),
    currencies: z.record(
        z.string(),
        z.object({
            name: z.string(),
            symbol: z.string()
        })
    ),
    flags: z.object({
        alt: z.string(),
        png: z.string().url(),
        svg: z.string().url()
    }),
    languages: z.record(z.string(), z.string()),
    name: z.object({
        common: z.string(),
        nativeName: z.record(
            z.string(),
            z.object({
                official: z.string(),
                common: z.string()
            })
        ),
        official: z.string()
    }),
    population: z.number(),
    region: z.string(),
    subregion: z.string(),
    tld: z.array(z.string())
})

export function createCountryDetailQueryOptions(countryName: string) {
    return queryOptions(
        {
            queryKey: ["country-detail", countryName],
            queryFn: () => getCountryDetail(countryName)
        }
    )
}

async function getCountryDetail(countryName: string, fields: RestCountriesQueryField[] = defaultCountryDetailFields) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=${fields.join(",")}`)
    const data = await response.json()
    const result = CountryDetailSchema.array().safeParse(data)

    if (!result.success) {
        console.error("API type error:", z.treeifyError(result.error));
        throw new Error("API type error.");
    }

    if (result.data.length > 1) { throw new Error("Two Countries share the same name") }

    return result.data[0];
}