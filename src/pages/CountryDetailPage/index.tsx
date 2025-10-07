import TextWithLabel from "@/components/textWithLabel";
import { Button } from "@/components/ui/button";
import { createCountryDetailQueryOptions } from "@/queryOptions/createCountryDetailQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import z from "zod";


function CountryDetailPage() {
    const params = useParams<{ countryName: string }>()

    if (params.countryName === undefined) { throw Error("Country Name in Params should be defined") }

    const { data } = useSuspenseQuery(createCountryDetailQueryOptions(params.countryName))

    const navigate = useNavigate()

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1); // 有上一頁就回去
        } else {
            navigate("/"); // 否則導回首頁
        }
    }

    return (
        <div className="px-6 pt-8 pb-16">
            <Button
                className="flex items-center bg-bg text-text dark:bg-element-dark dark:text-text-dark rounded-xs shadow-all-direction font-light w-[128px] mb-12 cursor-pointer"
                size={"lg"}
                onClick={handleBack}
            >
                <ArrowLeft />
                <span className="translate-y-[1px]">Back</span>
            </Button>
            <img src={data.flags.svg} alt={data.flags.alt} className="mb-10" />
            <h2 className="text-2xl font-extrabold mb-8">{data.name.common}</h2>
            <div className="mb-9">
                <TextWithLabel label={"Native Name"} text={Object.values(data.name.nativeName)[0].common} />
                <TextWithLabel label={"Population"} text={data.population.toLocaleString()} />
                <TextWithLabel label={"Region"} text={data.region} />
                <TextWithLabel label={"Sub Region"} text={data.subregion} />
                <TextWithLabel label={"Capital"} text={data.capital.join(", ")} />
            </div>
            <div className="mb-9">
                <TextWithLabel label={"Top Level Domain"} text={data.tld.join(", ")} />
                <TextWithLabel label={"Currencies"} text={Object.values(data.currencies).map(obj => obj.name).join(", ")} />
                <TextWithLabel label={"Languages"} text={Object.values(data.languages).join(", ")} />
            </div>
            <div>
                <h3 className="text-xl mb-4">Border Countries:</h3>
                {data.borders.length > 0 ?
                    <ul className="flex flex-wrap gap-3">
                        {data.borders.map(border => (
                            <BorderButton key={border} border={border} />
                        ))}
                    </ul> :
                    <span className="text-muted-foreground">No border country ...</span>
                }
            </div>
        </div>
    );
}

function BorderButton({ border }: { border: string }) {
    const { data } = useSuspenseQuery({
        queryKey: [border + "CountryName"],
        queryFn: () => getCountryNameBycca3(border)
    })

    async function getCountryNameBycca3(cca3: string) {
        const CountryNameSchema = z.object({
            name: z.object({
                common: z.string(),
                official: z.string(),
            })
        })

        const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${cca3}&fields=name`)
        const data = await response.json()
        const result = CountryNameSchema.array().safeParse(data)

        if (!result.success) {
            console.error("API type error:", z.treeifyError(result.error));
            throw new Error("API type error.");
        }

        if (result.data.length > 1) { throw new Error("Two Countries share the same cca3") }

        return result.data[0];
    }

    return (
        <Button asChild className="bg-bg text-text dark:bg-element-dark dark:text-text-dark rounded-xs shadow-all-direction font-light">
            <Link to={`/${data.name.official}`}>
                {data.name.common}
            </Link>
        </Button>
    )
}

export default CountryDetailPage;