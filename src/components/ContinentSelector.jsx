const ContinentSelector = ({ countries, onContinentChange }) => {
    const continents = [...new Set(countries.map(country => country.region))].sort();

    return (
        <select className={"Selector"} onChange={(e) => onContinentChange(e.target.value)} defaultValue="">
            <option value="" disabled>Choose a continent</option>
            {continents.map(continent => (
                <option key={continent} value={continent}>{continent}</option>
            ))}
        </select>
    );
};

export default ContinentSelector;
