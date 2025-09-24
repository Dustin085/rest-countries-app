import { useParams } from "react-router-dom";


function CountryDetailPage() {
    const params = useParams<{ countryName: string }>()

    // https://restcountries.com/v3.1/name/{name}?fullText=true

    return (
        <div>Country Detail for {params.countryName}</div>
    );
}

export default CountryDetailPage;