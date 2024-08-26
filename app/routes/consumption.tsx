import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RangeSlider, TextField, BlockStack } from '@shopify/polaris';
import { useSubmit } from '@remix-run/react';
import SolarConfiguratorLayout from '../components/SolarConfiguratorLayout';

export default function ConsumptionStep(): JSX.Element {
  const { t } = useTranslation();
  const submit = useSubmit();
  const [consumption, setConsumption] = useState<number>(3500);

  const handleConsumptionChange = (value: number) => {
    setConsumption(value);
  };

  const handleNext = async (): Promise<void> => {
    const formData = new FormData();
    formData.append('consumption', consumption.toString());
    await submit(formData, { method: 'post' });
  };

  return (
    <SolarConfiguratorLayout 
      title={t('enterConsumption')} 
      backUrl="/solar-config/roof-type"
      nextUrl="/solar-config/recommendation"
      onNext={handleNext}
    >
      <BlockStack gap="400">
        <RangeSlider
          label={t('consumption')}
          value={consumption}
          onChange={handleConsumptionChange}
          output
          min={1000}
          max={10000}
          step={100}
        />
        <TextField
          label={t('consumption')}
          value={consumption.toString()}
          onChange={(value) => handleConsumptionChange(Number(value))}
          autoComplete="off"
          suffix={t('kWh')}
          type="number"
        />
      </BlockStack>
    </SolarConfiguratorLayout>
  );
}