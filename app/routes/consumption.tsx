import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RangeSlider, TextField, BlockStack } from '@shopify/polaris';
import { useNavigate } from '@remix-run/react';
import SolarConfiguratorLayout from '../components/SolarConfiguratorLayout';
import { prisma } from '../db.server';

export default function ConsumptionStep(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [consumption, setConsumption] = useState<number>(3500);

  const handleConsumptionChange = (value: string) => {
    setConsumption(Number(value));
  };

  const handleSubmit = async () => {
    try {
      const session = await getSession();
      await prisma.solarConfig.update({
        where: { sessionId: session.id },
        data: { consumption: consumption },
      });

      navigate('/solar-config/recommendation');
    } catch (error) {
      console.error('Error saving consumption:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <SolarConfiguratorLayout 
      title={t('enterConsumption')} 
      backUrl="/solar-config/roof-type"
      nextUrl="/solar-config/recommendation"
    >
      <BlockStack vertical>
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
          onChange={handleConsumptionChange}
          autoComplete="off"
          suffix={t('kWh')}
          type="number"
        />
      </BlockStack>
    </SolarConfiguratorLayout>
  );
}