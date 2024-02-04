const CountrySelector = ({ countries, onCountryChange }) => {
    const sortedCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    return (
        <select onChange={(e) => onCountryChange(e.target.value)} defaultValue="">
            <option value="" disabled>Choose a country</option>
            {sortedCountries.map(country => (
                <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
            ))}
        </select>
    );
};

export default CountrySelector;
