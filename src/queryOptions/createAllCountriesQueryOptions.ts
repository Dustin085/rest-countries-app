import { queryOptions } from "@tanstack/react-query";
import { z } from "zod"
import type { RestCountriesQueryField } from "@/types/restCountriesQueryField";

const defaultQueryFields: RestCountriesQueryField[] = ["name", "population", "capital", "flags", "region"]

export const CountrySchema = z.object({
    name: z.object({
        common: z.string(),
        official: z.string(),
        nativeName: z.record(
            z.string(),
            z.object({
                official: z.string(),
                common: z.string()
            })
        )
    }),
    capital: z.array(z.string()),
    population: z.number(),
    flags: z.object({
        png: z.string(),
        svg: z.string(),
        alt: z.string()
    }),
    region: z.string()
})

export type Country = z.infer<typeof CountrySchema>

export function createAllCountriesQueryOptions(fields: RestCountriesQueryField[] = defaultQueryFields) {
    return queryOptions(
        {
            queryKey: ['allCountries'],
            queryFn: () => getAllCountriesByFields(fields),
        }
    )
}

async function getAllCountriesByFields(fields: RestCountriesQueryField[]): Promise<Country[]> {
    const response = await fetch(`https://restcountries.com/v3.1/all/?fields=${fields.join(",")}`)
    const data = await response.json()
    const result = CountrySchema.array().safeParse(data);

    if (!result.success) {
        console.error("API type error:", z.treeifyError(result.error));
        throw new Error("API type error.");
    }

    return result.data;
}