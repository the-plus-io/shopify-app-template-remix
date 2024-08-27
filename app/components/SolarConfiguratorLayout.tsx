import type { ReactNode } from 'react';
import React from 'react';
import { Frame, Layout, Page } from '@shopify/polaris';

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

  return (
    <Frame>
      <Page
        title={title}
        backAction={backUrl ? { content: 'back', url: backUrl } : undefined}
        primaryAction={nextUrl ? { 
          content: 'next', 
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