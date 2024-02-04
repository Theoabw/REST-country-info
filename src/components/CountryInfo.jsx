const CountryInfo = ({ country }) => {
    return (
        <div>
            <h3>{country.name.common}</h3>
            <img className={"flag-image"} src={country.flags.svg} alt={`Flag of ${country.name.common}`} style={{ height:"100px" }} />
            <table className="country-stats">
                <tbody>
                <tr>
                    <th>Official Name</th>
                    <td>{country.name.official}</td>
                </tr>
                <tr>
                    <th>Capital</th>
                    <td>{country.capital?.[0] || 'N/A'}</td>
                </tr>
                <tr>
                    <th>Area</th>
                    <td>{`${country.area.toLocaleString()} km²`}</td>
                </tr>
                <tr>
                    <th>Population</th>
                    <td>{country.population.toLocaleString()}</td>
                </tr>
                <tr>
                    <th>Languages</th>
                    <td>{country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</td>
                </tr>
                <tr>
                    <th>Currency</th>
                    <td>
                        {country.currencies ? Object.values(country.currencies).map(
                            (currency) => `${currency.name} (${currency.symbol})`
                        ).join(', ') : 'N/A'}
                    </td>
                </tr>
                <tr>
                    <th>Timezone</th>
                    <td>{country.timezones.join(', ')}</td>
                </tr>
                <tr>
                    <th>Borders</th>
                    <td>{country.borders?.join(', ') || 'None'}</td>
                </tr>
                <tr>
                    <th>Flag Description</th>
                    <td>{country.flags.alt}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CountryInfo;
