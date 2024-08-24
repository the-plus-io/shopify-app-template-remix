import React, { useState } from 'react';
import { Card, Layout, Page, Select } from '@shopify/polaris';
import { useTranslation } from 'react-i18next';

type FormPlacement = 'top' | 'bottom' | 'sidebar';

export default function AdminPanel(): JSX.Element {
  const { t } = useTranslation();
  const [formPlacement, setFormPlacement] = useState<FormPlacement>('top');

  const handleFormPlacementChange = (value: string) => {
    setFormPlacement(value as FormPlacement);
    // Save this setting to the database or app settings
  };

  return (
    <Page title="Admin Panel">
      <Layout>
        <Layout.Section>
          <Card>
            <Select
              label={t('formPlacement')}
              options={[
                { label: t('top'), value: 'top' },
                { label: t('bottom'), value: 'bottom' },
                { label: t('sidebar'), value: 'sidebar' },
              ]}
              onChange={handleFormPlacementChange}
              value={formPlacement}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}