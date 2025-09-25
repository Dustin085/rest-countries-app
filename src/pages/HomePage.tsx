import CountryCard from "@/components/countryCard";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { createAllCountriesQueryOptions, type Country } from "@/queryOptions/createAllCountriesQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CheckIcon, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import Fuse, { type IFuseOptions } from "fuse.js"
import { Input } from "@/components/ui/input";

function HomePage() {
    const [region, setRegion] = useState("")
    const [searchTerm, setSearchTerm] = useState("");

    const { data } = useSuspenseQuery(createAllCountriesQueryOptions())


    const filteredCountries = region
        ? data.filter(country => country.region === region)
        : data

    const fuseOptions: IFuseOptions<Country> = {
        findAllMatches: true,
        keys: [
            { name: 'common', getFn: (country) => country.name.common },
            { name: 'official', getFn: (country) => country.name.official }
        ]
    }

    const fuse = new Fuse(filteredCountries, fuseOptions)

    const fuseResult = searchTerm.trim() ?
        fuse.search(searchTerm) :
        filteredCountries.map((item, index) => ({
            item: item,
            refIndex: index
        }))

    return (
        <div className="px-4 pt-8 pb-16 flex flex-col gap-12">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2" />
                <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-12 h-12" placeholder="Search country ..." />
            </div>
            <RegionFilter region={region} setRegion={setRegion} />
            <div className="grid grid-cols-1 justify-items-center gap-12">
                {fuseResult.slice(0, 10).map((result, index) => (
                    <CountryCard key={index} country={result.item} />
                ))}
            </div>
        </div>
    );
}

const regions: string[] = [
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
]

interface RegionFilterProps {
    region: string
    setRegion: React.Dispatch<React.SetStateAction<string>>
}

function RegionFilter({ region, setRegion }: RegionFilterProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between font-light"
                    >
                        {region === "" ? "Filter by Region" : region}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandList>
                            <CommandGroup>
                                {regions.map((regionInArr) => (
                                    <CommandItem
                                        key={regionInArr}
                                        value={regionInArr}
                                        className="font-light"
                                        onSelect={(currentValue) => {
                                            setRegion(currentValue === region ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        <CheckIcon
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                region === regionInArr ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {regionInArr}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default HomePage;