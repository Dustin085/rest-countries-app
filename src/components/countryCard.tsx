import type { Country } from "@/queryOptions/createAllCountriesQueryOptions";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "./ui/card";
import { Link } from "react-router-dom";

function CountryCard({ country }: { country: Country }) {
    return (
        <Link className="self-center" to={`/${country.name.official}`}>
            <Card className="gap-4 pt-0 overflow-hidden w-[275px] self-center rounded-sm pb-9 dark:bg-element-dark">
                <CardHeader className="px-0">
                    <img src={country.flags.svg} alt={country.flags.alt} className="aspect-[2/1] object-cover" />
                </CardHeader>
                <CardContent>
                    <CardTitle className="mb-4">{country.name.common}</CardTitle>
                    <CardDescription className="flex flex-col gap-2">
                        <p><span className="dark:text-text-dark">Population: </span>{country.population.toLocaleString()}</p>
                        <p><span className="dark:text-text-dark">Region: </span>{country.region}</p>
                        <p><span className="dark:text-text-dark">Capital: </span>{country.capital}</p>
                    </CardDescription>
                </CardContent>
            </Card>
        </Link>
    );
}

export default CountryCard;