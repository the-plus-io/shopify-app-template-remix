import type { ReactNode } from 'react';
import React from 'react';
import { Banner } from '@shopify/polaris';
import type { TFunction } from 'i18next'; // Import TFunction from 'i18next'

interface ErrorBoundaryProps {
  children: ReactNode;
  t: TFunction; // Add t function to props
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Banner tone="critical">
          {this.props.t('errorOccurred')}
        </Banner>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;