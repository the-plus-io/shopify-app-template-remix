import type { ReactNode } from 'react';
import React from 'react';
import { Frame, Layout, Page } from '@shopify/polaris';
import { useTranslation } from 'react-i18next';

interface SolarConfiguratorLayoutProps {
  children: ReactNode;
  title: string;
  backUrl?: string;
  nextUrl?: string;
  onNext?: () => Promise<void>;
}

export default function SolarConfiguratorLayout({ 
  children, 
  title, 
  backUrl, 
  nextUrl,
  onNext
}: SolarConfiguratorLayoutProps) {
  const { t } = useTranslation();

  return (
    <Frame>
      <Page
        title={title}
        backAction={backUrl ? { content: t('back'), url: backUrl } : undefined}
        primaryAction={nextUrl ? { 
          content: t('next'), 
          url: nextUrl,
          onAction: onNext 
        } : undefined}
      >
        <Layout>
          <Layout.Section>{children}</Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}