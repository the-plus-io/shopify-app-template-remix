import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Layout, SkeletonBodyText, Thumbnail } from '@shopify/polaris';
import { useNavigate } from '@remix-run/react';
import SolarConfiguratorLayout from '../components/SolarConfiguratorLayout';

interface RoofType {
  id: string;
  label: string;
  image: string;
}

const roofTypes: RoofType[] = [
  { id: 'flat', label: 'Flachdach', image: '/images/flat-roof.jpg' },
  { id: 'gabled', label: 'Satteldach', image: '/images/gabled-roof.jpg' },
  { id: 'hipped', label: 'Walmdach', image: '/images/hipped-roof.jpg' },
];

export default function RoofTypeStep(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedRoofType, setSelectedRoofType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRoofTypeSelect = async (roofType: string) => {
    setIsLoading(true);
    setSelectedRoofType(roofType);

    try {
      // Example: Handle session and API call on the server-side.
      // const session = await getSession();
      // await updateRoofType(session.id, roofType);

      // Simulate roof analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      navigate('/solar-config/consumption');
    } catch (error) {
      console.error('Error saving roof type:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SolarConfiguratorLayout 
      title={t('selectRoofType')} 
      backUrl="/solar-config/address"
      nextUrl="/solar-config/consumption"
    >
      {isLoading ? (
        <Card padding="400">
          <SkeletonBodyText lines={3} />
          <p>{t('analyzingRoof')}</p>
        </Card>
      ) : (
        <Layout>
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '16px' }}>
            {roofTypes.map((roof) => (
              <div 
                key={roof.id} 
                onClick={() => handleRoofTypeSelect(roof.id)} 
                style={{ 
                  cursor: 'pointer', 
                  width: '100%', 
                  border: selectedRoofType === roof.id ? '2px solid #0070f3' : 'none', 
                  padding: '8px', 
                  borderRadius: '4px',
                }}
              >
                <Card padding="400">
                  <div style={{ textAlign: 'center' }}>
                    <Thumbnail
                      source={roof.image}
                      alt={roof.label}
                      size="large"
                    />
                    <p>{roof.label}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Layout>
      )}
    </SolarConfiguratorLayout>
  );
}