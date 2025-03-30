import { render, screen } from '@testing-library/react'
import Home from '../page'

// Mock next/image since it's not available in the test environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

describe('Home Page', () => {
  it('renders all enabled navigation buttons', async () => {
    render(await Home())

    // Check for enabled navigation buttons
    expect(screen.getByText('Live Results')).toBeInTheDocument()
    expect(screen.getByText('Event Results')).toBeInTheDocument()
    expect(screen.getByText('Season Standings')).toBeInTheDocument()

    // Check that disabled button is not rendered
    expect(screen.queryByText('Archive')).not.toBeInTheDocument()
  })

  it('renders navigation button descriptions', async () => {
    render(await Home())

    expect(screen.getByText('Live results from the latest event')).toBeInTheDocument()
    expect(screen.getByText('Results from the current season')).toBeInTheDocument()
    expect(screen.getByText('Current season point standings')).toBeInTheDocument()
  })

  it('renders the NER logo', async () => {
    render(await Home())
    
    const logo = screen.getByAltText('NER Logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/ner150.png')
    expect(logo).toHaveAttribute('width', '150')
    expect(logo).toHaveAttribute('height', '150')
  })
}) 