import { useState, useEffect } from 'react';
import ContinentSelector from './ContinentSelector';
import CountrySelector from './CountrySelector.jsx';
import CountryInfo from './CountryInfo';
import GoogleMapsComponent from "./GoogleMapsComponent.jsx";

const MainComponent = () => {
    const [countries, setCountries] = useState([]);
    const [selectedContinent, setSelectedContinent] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((response) => response.json())
            .then((data) => {
                setCountries(data);
            });
    }, []);

    const handleContinentChange = (continent) => {
        setSelectedContinent(continent);
        setSelectedCountry(''); // Reset country selection when continent changes
    };

    const filteredCountries = countries.filter(country => country.region === selectedContinent);

    return (
        <div className={"main-wrapper"}>
            <div className="Selector-group">
                <ContinentSelector countries={countries} onContinentChange={handleContinentChange} />
                {selectedContinent && <CountrySelector countries={filteredCountries} onCountryChange={setSelectedCountry} />}
            </div>
            <div className={"CountryInfo"}>
            {selectedCountry && <CountryInfo country={filteredCountries.find(country => country.name.common === selectedCountry)} />}
            </div>
            {selectedCountry && <GoogleMapsComponent
                lat={filteredCountries.find(country => country.name.common === selectedCountry).latlng[0]}
                lng={filteredCountries.find(country => country.name.common === selectedCountry).latlng[1]}
            />}
        </div>
    );
};

export default MainComponent;
