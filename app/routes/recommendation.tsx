import React, { useEffect, useState } from 'react';
import { Card, Text, Spinner, BlockStack, Link } from '@shopify/polaris';
import { useSubmit } from '@remix-run/react';
import SolarConfiguratorLayout from '../components/SolarConfiguratorLayout';

interface Recommendation {
  productName: string;
  description: string;
  price: string;
  url: string;
}

export default function RecommendationStep() {
  const submit = useSubmit();
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockRecommendation: Recommendation = {
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

  const handleNext = async (): Promise<void> => {
    if (recommendation) {
      const formData = new FormData();
      formData.append('productName', recommendation.productName);
      await submit(formData, { method: 'post' });
    }
  };

  return (
    <SolarConfiguratorLayout 
      title={'recommendation'} 
      backUrl="/solar-config/consumption"
      onNext={handleNext}
    >
      <BlockStack gap="400">
        {isLoading ? (
          <Card>
            <BlockStack gap="400">
              <Spinner accessibilityLabel={'loading'} size="large" />
              <Text as="p" variant="bodyMd">{'generatingRecommendation'}</Text>
            </BlockStack>
          </Card>
        ) : recommendation ? (
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">{recommendation.productName}</Text>
              <Text as="p" variant="bodyMd">{recommendation.description}</Text>
              <Text as="p" variant="bodyMd">{'estimatedPrice'}: {recommendation.price}</Text>
              <Link url={recommendation.url}>{'viewProduct'}</Link>
            </BlockStack>
          </Card>
        ) : (
          <Card>
            <Text as="p" variant="bodyMd">{'noRecommendationAvailable'}</Text>
          </Card>
        )}
      </BlockStack>
    </SolarConfiguratorLayout>
  );
}