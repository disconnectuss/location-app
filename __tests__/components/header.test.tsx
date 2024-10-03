// __tests__/components/header.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/header/index'; // Adjust the import path as needed
import { ChakraProvider } from '@chakra-ui/react';
import '@testing-library/jest-dom';

// Mock next/link
jest.mock('next/link', () => {
  const OriginalLink = jest.requireActual('next/link');
  return {
    __esModule: true,
    ...OriginalLink,
    default: ({ href, children }: { href: string; children: React.ReactNode }) => {
      return <a href={href}>{children}</a>;
    },
  };
});

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      basePath: '',
      pathname: '/',
      route: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
      isReady: true,
      isPreview: false,
      isLocaleDomain: false,
      locale: undefined,
      locales: [],
      defaultLocale: undefined,
      domainLocales: undefined,
    };
  },
}));

// Mock window.matchMedia for Chakra UI's responsive styles
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: query.includes('max-width'),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('Header Component', () => {
  it('renders the header with logo and navigation links', () => {
    render(
      <ChakraProvider>
        <Header />
      </ChakraProvider>
    );

    // Check for the logo
    const logo = screen.getByText('LooC');
    expect(logo).toBeInTheDocument();

    // Check for navigation links
    const expectedLinks = ['Add Location', 'Location List', 'Route Lines'];

    expectedLinks.forEach((linkText) => {
      const link = screen.getAllByText(linkText)[0];
      expect(link).toBeInTheDocument();
    });

    // Check for the "Add Location" button
    const addButton = screen.getByRole('button', { name: /add location/i });
    expect(addButton).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger icon is clicked', () => {
    render(
      <ChakraProvider>
        <Header />
      </ChakraProvider>
    );

    // The mobile menu should be closed initially
    expect(screen.queryByText('Location List')).not.toBeInTheDocument();

    // Click the hamburger icon
    const hamburgerButton = screen.getByLabelText('Toggle Navigation Menu');
    fireEvent.click(hamburgerButton);

    // Now the mobile menu should be visible
    expect(screen.getByText('Location List')).toBeInTheDocument();

    // Click the hamburger icon again to close
    fireEvent.click(hamburgerButton);

    // The mobile menu should be closed again
    expect(screen.queryByText('Location List')).not.toBeInTheDocument();
  });
});
