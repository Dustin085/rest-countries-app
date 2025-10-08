import TextWithLabel from "@/components/textWithLabel";
import { Button } from "@/components/ui/button";
import { createCountryDetailQueryOptions } from "@/queryOptions/createCountryDetailQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CountryDetailLoading from "./loading";
import { getCountryNameBycca3 } from "@/lib/utils";

function CountryDetailPage() {
    const { countryName } = useParams();

    // 這樣每當 URL 改變，React 會認為這是新 component
    return (
        <Suspense fallback={<CountryDetailLoading />} key={countryName}>
            <CountryDetailPageInner />
        </Suspense>
    )
}

function CountryDetailPageInner() {
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
        <div className="px-6 pt-8 pb-16 desktop:px-18 desktop:pt-16">
            <Button
                className="flex items-center bg-bg text-text dark:bg-element-dark dark:text-text-dark rounded-xs shadow-all-direction font-light w-[128px] mb-12 desktop:mb-16 cursor-pointer"
                size={"lg"}
                onClick={handleBack}
            >
                <ArrowLeft />
                <span className="translate-y-[1px]">Back</span>
            </Button>
            <div className="flex flex-col gap-10 desktop:grid desktop:gap-32 desktop:grid-cols-[1fr_1fr]">
                {/* flag */}
                <img src={data.flags.svg} alt={data.flags.alt} className="w-full max-w-[760px]" />
                <div className="flex flex-col gap-8 desktop:justify-center-safe desktop:max-w-[620px]">
                    <h2 className="text-2xl font-extrabold">{data.name.common}</h2>
                    <div className="desktop:flex desktop:justify-between">
                        <div>
                            <TextWithLabel label={"Native Name"} text={Object.values(data.name.nativeName)[0].common} />
                            <TextWithLabel label={"Population"} text={data.population.toLocaleString()} />
                            <TextWithLabel label={"Region"} text={data.region} />
                            <TextWithLabel label={"Sub Region"} text={data.subregion} />
                            <TextWithLabel label={"Capital"} text={data.capital.join(", ")} />
                        </div>
                        <div>
                            <TextWithLabel label={"Top Level Domain"} text={data.tld.join(", ")} />
                            <TextWithLabel label={"Currencies"} text={Object.values(data.currencies).map(obj => obj.name).join(", ")} />
                            <TextWithLabel label={"Languages"} text={Object.values(data.languages).join(", ")} />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl mb-4">Border Countries:</h3>
                        {data.borders.length > 0 ?
                            <ul className="flex flex-wrap gap-3">
                                {data.borders.map(cca3Code => (
                                    <BorderButton key={cca3Code} cca3Code={cca3Code} />
                                ))}
                            </ul> :
                            <span className="text-muted-foreground">No border country ...</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

function BorderButton({ cca3Code }: { cca3Code: string }) {
    const { data } = useSuspenseQuery({
        queryKey: ["country-name", cca3Code],
        queryFn: () => getCountryNameBycca3(cca3Code)
    })

    return (
        <Button asChild className="bg-bg text-text dark:bg-element-dark dark:text-text-dark rounded-xs shadow-all-direction font-light">
            <Link to={`/${data.name.official}`}>
                {data.name.common}
            </Link>
        </Button>
    )
}

export default CountryDetailPage;