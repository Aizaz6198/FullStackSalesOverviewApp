import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import useCommon from '../hooks/useCommon';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import Laoder from '../Common/Loader';

// Set up the Leaflet default icon options
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const GeographicalDistribution = () => {
    const [cityData, setCityData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosCommon = useCommon();

    useEffect(() => {
        const fetchCityData = async () => {
            try {
                const response = await axiosCommon.get('/customers/customer-distribution');
                setCityData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching city data');
                setLoading(false);
            }
        };

        fetchCityData();
    }, [axiosCommon]);

    const geocodeCity = useMemo(() => ({
        "New York": { lat: 40.7128, lng: -74.0060 },
        "Los Angeles": { lat: 34.0522, lng: -118.2437 },
        "Chicago": { lat: 41.8781, lng: -87.6298 },
        "San Francisco": { lat: 37.7749, lng: -122.4194 },
        "Houston": { lat: 29.7604, lng: -95.3698 },
        "Phoenix": { lat: 33.4484, lng: -112.0740 },
        "Philadelphia": { lat: 39.9526, lng: -75.1652 },
        "San Antonio": { lat: 29.4241, lng: -98.4936 },
        "San Diego": { lat: 32.7157, lng: -117.1611 },
        "Dallas": { lat: 32.7767, lng: -96.7970 },
        "Austin": { lat: 30.2672, lng: -97.7431 },
        "Jacksonville": { lat: 30.3322, lng: -81.6557 },
        "Fort Worth": { lat: 32.7555, lng: -97.3308 },
        "Columbus": { lat: 39.9612, lng: -82.9988 },
        "Charlotte": { lat: 35.2271, lng: -80.8431 },
        "San Jose": { lat: 37.3382, lng: -121.8863 },
        "Indianapolis": { lat: 39.7684, lng: -86.1581 },
        "Denver": { lat: 39.7392, lng: -104.9903 },
        "Washington D.C.": { lat: 38.9072, lng: -77.0369 },
        "Boston": { lat: 42.3601, lng: -71.0589 },
        "El Paso": { lat: 31.7619, lng: -106.4850 },
        "Detroit": { lat: 42.3314, lng: -83.0458 },
        "Nashville": { lat: 36.1627, lng: -86.7816 },
        "Memphis": { lat: 35.1495, lng: -90.0490 },
        "Portland": { lat: 45.5051, lng: -122.6750 },
        "Oklahoma City": { lat: 35.4676, lng: -97.5164 },
        "Las Vegas": { lat: 36.1699, lng: -115.1398 },
        "Louisville": { lat: 38.2527, lng: -85.7585 },
        "Baltimore": { lat: 39.2904, lng: -76.6122 },
        "Milwaukee": { lat: 43.0389, lng: -87.9065 },
        "Albuquerque": { lat: 35.0844, lng: -106.6504 },
        "Tucson": { lat: 32.2226, lng: -110.9747 },
        "Fresno": { lat: 36.7378, lng: -119.7871 },
        "Sacramento": { lat: 38.5816, lng: -121.4944 },
        "Mesa": { lat: 33.4152, lng: -111.8315 },
        "Kansas City": { lat: 39.0997, lng: -94.5786 },
        "Atlanta": { lat: 33.7490, lng: -84.3880 },
        "Long Beach": { lat: 33.7701, lng: -118.1937 },
        "Miami": { lat: 25.7617, lng: -80.1918 },
        "Omaha": { lat: 41.2565, lng: -95.9345 },
        "Raleigh": { lat: 35.7796, lng: -78.6382 },
        "Colorado Springs": { lat: 38.8339, lng: -104.8214 },
        "Virginia Beach": { lat: 36.8529, lng: -75.9780 },
        "Oakland": { lat: 37.8044, lng: -122.2712 },
        "Minneapolis": { lat: 44.9778, lng: -93.2650 },
        "Tulsa": { lat: 36.153982, lng: -95.992775 },
        "Arlington": { lat: 32.7357, lng: -97.1081 },
        "New Orleans": { lat: 29.9511, lng: -90.0715 },
        "Wichita": { lat: 37.6872, lng: -97.3301 },
        "Bakersfield": { lat: 35.3733, lng: -119.0187 },
        "Cleveland": { lat: 41.4993, lng: -81.6944 },
        "Tampa": { lat: 27.9506, lng: -82.4572 },
        "Aurora": { lat: 39.7294, lng: -104.8319 },
        "Anaheim": { lat: 33.8366, lng: -117.9143 },
        "Honolulu": { lat: 21.3069, lng: -157.8583 },
        "Santa Ana": { lat: 33.7455, lng: -117.8677 },
        "Corpus Christi": { lat: 27.8006, lng: -97.3964 },
        "Riverside": { lat: 33.9806, lng: -117.3755 },
        "Lexington": { lat: 38.0406, lng: -84.5037 },
        "Stockton": { lat: 37.9577, lng: -121.2908 },
        "Saint Paul": { lat: 44.9537, lng: -93.0900 },
        "Cincinnati": { lat: 39.1031, lng: -84.5120 },
        "Saint Louis": { lat: 38.6270, lng: -90.1994 },
        "Pittsburgh": { lat: 40.4406, lng: -79.9959 },
        "Greensboro": { lat: 36.0726, lng: -79.7910 },
        "Anchorage": { lat: 61.2181, lng: -149.9003 },
        "Plano": { lat: 33.0198, lng: -96.6989 },
        "Lincoln": { lat: 40.8136, lng: -96.7026 },
        "Orlando": { lat: 28.5383, lng: -81.3792 },
        "Irvine": { lat: 33.6846, lng: -117.8265 },
        "Toledo": { lat: 41.6528, lng: -83.5379 },
        "Durham": { lat: 35.9940, lng: -78.8986 },
        "Chula Vista": { lat: 32.6401, lng: -117.0842 },
        "Fort Wayne": { lat: 41.0793, lng: -85.1394 },
        "St. Petersburg": { lat: 27.7676, lng: -82.6403 },
        "Lubbock": { lat: 33.5779, lng: -101.8552 },
        "Jersey City": { lat: 40.7178, lng: -74.0431 },
        "Chandler": { lat: 33.3062, lng: -111.8413 },
        "Madison": { lat: 43.0731, lng: -89.4012 },
        "Laredo": { lat: 27.5036, lng: -99.5075 },
        "Norfolk": { lat: 36.8508, lng: -76.2859 },
        "Winston-Salem": { lat: 36.0999, lng: -80.2442 }
    }), []);

    if (loading) return <Laoder />;
    if (error) return <p>{error}</p>;

    const mapCenter = cityData.length > 0
        ? [geocodeCity[cityData[0]._id].lat, geocodeCity[cityData[0]._id].lng]
        : [20, 0];

    return (
        <>
            <hr />
            <div className="chart-container">
                <h2>Geopgraphical Distribution of Customers</h2>
                <MapContainer center={mapCenter} zoom={4} style={{ height: '500px', width: '100%' }}>

                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {cityData.map((city, index) => {
                        const location = geocodeCity[city._id] || { lat: 0, lng: 0 };
                        return (
                            <Marker key={index} position={[location.lat, location.lng]}>
                                <Popup>
                                    {city._id}: {city.customerCount} customers
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>
        </>

    );
};

export default GeographicalDistribution;
