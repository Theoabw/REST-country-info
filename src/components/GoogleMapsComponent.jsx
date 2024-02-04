import React, { useCallback, useRef, useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '600px',
    height: '450px',
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"

};

const mapWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '20px'
};

// Example: New York City coordinates
const defaultCenter = { lat: 40.712776, lng: -74.005974 };

const GoogleMapsComponent = ({ lat, lng }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_MAPS
    });

    const [center, setCenter] = useState(defaultCenter);
    const mapRef = useRef(null);

    const onLoad = useCallback((map) => {
        mapRef.current = map;
        if (lat && lng) {
            map.panTo({ lat, lng });
        }
    }, [lat, lng]);

    useEffect(() => {
        if (mapRef.current && lat && lng) {
            const newCenter = { lat, lng };
            mapRef.current.panTo(newCenter);
            setCenter(newCenter);
        }
    }, [lat, lng]);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;

    return (
        <div style={mapWrapperStyle}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={6}
                onLoad={onLoad}
            >
                <Marker position={center} />
            </GoogleMap>
        </div>
    );
};

export default GoogleMapsComponent;
