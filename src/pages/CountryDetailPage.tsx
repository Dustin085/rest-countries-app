import TextWithLabel from "@/components/textWithLabel";
import { Button } from "@/components/ui/button";
import { createCountryDetailQueryOptions } from "@/queryOptions/createCountryDetailQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";


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
                className="flex items-center dark:bg-element-dark dark:text-text-dark rounded-xs shadow font-light w-[128px] mb-12" size={"lg"}
                onClick={handleBack}
            >
                <ArrowLeft />
                <span className="translate-y-[1px]">Back</span>
            </Button>
            <img src={data.flags.svg} alt={data.flags.alt} className="mb-10" />
            <h2 className="text-3xl font-extrabold mb-8">{data.name.common}</h2>
            <TextWithLabel label={"Population"} text={data.population.toLocaleString()} />
        </div>
    );
}

export default CountryDetailPage;