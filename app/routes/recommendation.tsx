import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, TextContainer, Spinner } from '@shopify/polaris';
import { useNavigate } from '@remix-run/react';
import SolarConfiguratorLayout from '../components/SolarConfiguratorLayout';
import { prisma } from '../db.server';

export default function RecommendationStep() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const session = await getSession(request);
        const solarConfig = await prisma.solarConfig.findUnique({
          where: { sessionId: session.id },
        });

        // Here you would typically call an external service or use your own logic
        // to generate a recommendation based on the solar configuration
        const mockRecommendation = {
          productName: 'SolarMax 5000',
          description: 'Perfect for your roof type and energy consumption.',
          price: '€12,000',
          url: '/products/solarmax-5000',
        };

        setRecommendation(mockRecommendation);
      } catch (error) {
        console.error('Error fetching recommendation:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendation();
  }, []);

  return (
    <SolarConfiguratorLayout 
      title={t('recommendation')} 
      backUrl="/solar-config/consumption"
    >
      {isLoading ? (
        <Card sectioned>
          <TextContainer>
            <Spinner accessibilityLabel={t('loading')} size="large" />
            <p>{t('generatingRecommendation')}</p>
          </TextContainer>
        </Card>
      ) : recommendation ? (
        <Card
          title={recommendation.productName}
          primaryFooterAction={{
            content: t('viewProduct'),
            url: recommendation.url,
          }}
        >
          <Card.Section>
            <p>{recommendation.description}</p>
            <p>{t('estimatedPrice')}: {recommendation.price}</p>
          </Card.Section>
        </Card>
      ) : (
        <Card sectioned>
          <p>{t('noRecommendationAvailable')}</p>
        </Card>
      )}
    </SolarConfiguratorLayout>
  );
}