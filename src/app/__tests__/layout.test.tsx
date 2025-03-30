import { render } from '@testing-library/react'
import RootLayout, { metadata } from '../layout'

// Mock the TRPCReactProvider
jest.mock('~/trpc/react', () => ({
  TRPCReactProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="trpc-provider">{children}</div>,
}))

// Mock next/font
jest.mock('next/font/google', () => ({
  Inter: () => ({
    variable: 'mock-font',
  }),
}))

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies: () => ({
    toString: () => '',
  }),
}))

// Mock @vercel/speed-insights/next
jest.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: () => <div data-testid="speed-insights" />,
}))

describe('Root Layout', () => {
  it('renders the required providers and content', () => {
    const { getByTestId, getByText } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    // Check if the providers are rendered
    expect(getByTestId('trpc-provider')).toBeInTheDocument()
    expect(getByTestId('speed-insights')).toBeInTheDocument()

    // Check if the content is rendered
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('has the correct metadata', () => {
    expect(metadata).toEqual({
      title: 'NER Results',
      description: 'New England Region Solo Live Scoring and Results',
      icons: [{ rel: 'icon', url: '/ner150.png' }],
    })
  })
}) 