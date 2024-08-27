import React, { useState } from 'react';
import { Card, BlockStack, Page, Select } from '@shopify/polaris';

type FormPlacement = 'top' | 'bottom' | 'sidebar';

export default function AdminPanel(): JSX.Element {
  const [formPlacement, setFormPlacement] = useState<FormPlacement>('top');

  const handleFormPlacementChange = (value: string) => {
    setFormPlacement(value as FormPlacement);
    // Save this setting to the database or app settings
  };

  return (
    <Page title="Admin Panel">
      <BlockStack gap="400">
        <Card>
          <BlockStack gap="400">
            <Select
              label={'formPlacement'}
              options={[
                { label: 'top', value: 'top' },
                { label: 'bottom', value: 'bottom' },
                { label: 'sidebar', value: 'sidebar' },
              ]}
              onChange={handleFormPlacementChange}
              value={formPlacement}
            />
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}