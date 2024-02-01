const CountryStats = ({ country }) => (
    <table className="country-stats">
        <tbody>
        <tr>
            <th>Official Name</th>
            <td>{country.name.official}</td>
        </tr>
        <tr>
            <th>Capital</th>
            <td>{country.capital[0]}</td>
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
            <td>{Object.values(country.languages).join(', ')}</td>
        </tr>
        <tr>
            <th>Currency</th>
            <td>
                {Object.values(country.currencies).map(
                    (currency) => `${currency.name} (${currency.symbol})`
                ).join(', ')}
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
);

export default CountryStats;