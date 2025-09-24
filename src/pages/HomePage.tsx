import CountryCard from "@/components/countryCard";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { createAllCountriesQueryOptions } from "@/queryOptions/createAllCountriesQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CheckIcon, ChevronDown } from "lucide-react";
import { useState } from "react";

function HomePage() {
    const [region, setRegion] = useState("")

    const { data } = useSuspenseQuery(createAllCountriesQueryOptions())

    return (
        <div className="px-4 pt-8 pb-16 flex flex-col gap-12">
            <RegionFilter region={region} setRegion={setRegion} />
            {region && <p>Filter Region: {region}</p>}
            {data.slice(0, 10).map((coutry, index) => (
                <CountryCard key={index} country={coutry} />
            ))}
        </div>
    );
}

const regions: string[] = [
    "Africa",
    "America",
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
                        {/* <CommandInput placeholder="Search framework..." /> */}
                        <CommandList>
                            {/* <CommandEmpty>No framework found.</CommandEmpty> */}
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