import { useParams } from "react-router-dom";


function CountryDetail() {
    const params = useParams<{ countryName: string }>()

    return (
        <div>Country Detail for {params.countryName}</div>
    );
}

export default CountryDetail;