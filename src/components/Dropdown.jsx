import { useState, useEffect } from 'react';
import CountryStats from "./CountryStats.jsx";

const loadGoogleMapsScript = (callback) => {
    const existingScript = document.getElementById('googleMapsScript');
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAF2f1PUUK4cy6nBOV_6opI82Yjv7i08HU&libraries=maps`;
        script.id = 'googleMapsScript';
        document.body.appendChild(script);
        script.onload = () => {
            if (callback) callback();
        };
    } else if (callback) {
        callback();
    }
};

const Dropdown = () => {
    const [countriesData, setCountriesData] = useState([]);
    const [continents, setContinents] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedContinent, setSelectedContinent] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [mapUrl, setMapUrl] = useState(null);

    const getGoogleMapsUrl = (lat, lng) => {
        return `https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_API_KEY}&center=${lat},${lng}&zoom=6&maptype=roadmap`;
    };

    const handleCountryChange = (e) => {
        const countryCode = e.target.value;
        const country = filteredCountries.find(c => c.cca3 === countryCode);
        setSelectedCountry(country);
    };

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                setCountriesData(data);
                const continentsData = data.reduce((acc, country) => {
                    const continent = country.region;
                    if (!acc[continent]) {
                        acc[continent] = [];
                    }
                    acc[continent].push(country);
                    return acc;
                }, {});
                setContinents(Object.keys(continentsData).sort());
            })
            .catch(error => console.error('Error fetching countries data:', error));
    }, []);

    // Filter countries by selected continent
    useEffect(() => {
        if (!selectedContinent) {
            setFilteredCountries([]);
        } else {
            const countries = countriesData
                .filter(country => country.region === selectedContinent)
                .sort((a, b) => a.name.common.localeCompare(b.name.common)); // Sort countries alphabetically
            setFilteredCountries(countries);
        }
    }, [selectedContinent, countriesData]);

    useEffect(() => {
        loadGoogleMapsScript(() => {
            if (selectedCountry) {
                setMapUrl(getGoogleMapsUrl(selectedCountry.latlng[0], selectedCountry.latlng[1]));
            }
        });
    }, [selectedCountry]);

    const handleContinentChange = (e) => {
        setSelectedContinent(e.target.value);
        setSelectedCountry(null);
    };

    return (
        <div className="App">
            <div className="dropdown-container">
                <div className="dropdown-menus">
                    <select onChange={handleContinentChange} value={selectedContinent}>
                        <option value="">Select a continent</option>
                        {continents.map(continent => (
                            <option key={continent} value={continent}>{continent}</option>
                        ))}
                    </select>
                    <select onChange={handleCountryChange} value={selectedCountry?.cca3 || ''}
                            disabled={!selectedContinent}>
                        <option value="">Select a country</option>
                        {filteredCountries.map(country => (
                            <option key={country.cca3} value={country.cca3}>{country.name.common}</option>
                        ))}
                    </select>
                </div>
                {selectedCountry && (
                    <>
                        <img
                            className="flag-image"
                            src={selectedCountry.flags.svg || selectedCountry.flags.png}
                            alt={`${selectedCountry.name.common} flag`}
                        />
                        <CountryStats country={selectedCountry} />
                        {mapUrl && (
                            <iframe
                                loading="lazy"
                                allowFullScreen
                                src={mapUrl}>
                            </iframe>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Dropdown;