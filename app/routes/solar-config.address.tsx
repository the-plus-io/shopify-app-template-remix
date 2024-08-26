import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, TextField } from '@shopify/polaris';
import { useNavigate } from '@remix-run/react';
import SolarConfiguratorLayout from '../components/SolarConfiguratorLayout';
import { usePlacesWidget } from "react-google-autocomplete";

export default function AddressStep(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [address, setAddress] = useState<string>('');

  const handleChange = useCallback((newValue: string) => {
    setAddress(newValue);
  }, []);

  const { ref } = usePlacesWidget<HTMLInputElement>({
    apiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    onPlaceSelected: (place: google.maps.places.PlaceResult) => {
      setAddress(place.formatted_address || '');
    },
  });

  useEffect(() => {
    if (ref.current) {
      const input = ref.current;
      input.addEventListener('change', (e) => handleChange((e.target as HTMLInputElement).value));
    }
  }, [ref, handleChange]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Save address to database    
    // For now, we'll just navigate to the next step
    navigate('/solar-config/roof-type');
  };

  return (
    <SolarConfiguratorLayout title={t('address')} nextUrl="/solar-config/roof-type">
      <Form onSubmit={handleSubmit}>
        <TextField
          label={t('address')}
          value={address}
          onChange={handleChange}
          autoComplete="off"
        />
      </Form>
    </SolarConfiguratorLayout>
  );
}