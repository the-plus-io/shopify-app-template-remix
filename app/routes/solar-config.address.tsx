import React from 'react';
import { Form, TextField, Button } from '@shopify/polaris';
import { useNavigate } from '@remix-run/react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import SolarConfiguratorLayout from '../components/SolarConfiguratorLayout';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 40.7128, // Default to New York City
  lng: -74.0060
};

export default function AddressStep(): JSX.Element {
  const navigate = useNavigate();
  const [address, setAddress] = React.useState<string>('');
  const [mapCenter, setMapCenter] = React.useState(center);

  const handleChange = (newValue: string) => {
    setAddress(newValue);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically geocode the address and update the map center
    // For demonstration, we'll just navigate to the next step
    navigate('/solar-config/roof-type');
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setMapCenter({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      });
      // Here you would typically reverse geocode to get the address
    }
  };

  return (
    <SolarConfiguratorLayout title={'address'} nextUrl="/solar-config/roof-type">
      <Form onSubmit={handleSubmit}>
        <TextField
          label={'address'}
          value={address}
          onChange={handleChange}
          autoComplete="off"
        />
        <Button submit>{'next'}</Button>
      </Form>
      <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={10}
          onClick={handleMapClick}
        >
          <Marker position={mapCenter} />
        </GoogleMap>
      </LoadScript>
    </SolarConfiguratorLayout>
  );
}