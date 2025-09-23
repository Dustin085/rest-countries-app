import { useParams } from "react-router-dom";


function CountryDetailPage() {
    const params = useParams<{ countryName: string }>()

    return (
        <div>Country Detail for {params.countryName}</div>
    );
}

export default CountryDetailPage;