import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CreatePost } from '../create-post'
import { api } from '~/trpc/react'

// Mock useRouter
const mockRefresh = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}))

// Mock tRPC API
jest.mock('~/trpc/react', () => ({
  api: {
    post: {
      create: {
        useMutation: jest.fn(),
      },
    },
  },
}))

describe('CreatePost Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the form with input and submit button', () => {
    ;(api.post.create.useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
    })

    render(<CreatePost />)

    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('updates input value when typing', () => {
    ;(api.post.create.useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
    })

    render(<CreatePost />)

    const input = screen.getByPlaceholderText('Title')
    fireEvent.change(input, { target: { value: 'Test Post' } })

    expect(input).toHaveValue('Test Post')
  })

  it('submits form with input value', async () => {
    const mockMutate = jest.fn()
    ;(api.post.create.useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
    })

    render(<CreatePost />)

    const input = screen.getByPlaceholderText('Title')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    fireEvent.change(input, { target: { value: 'Test Post' } })
    fireEvent.click(submitButton)

    expect(mockMutate).toHaveBeenCalledWith({ name: 'Test Post' })
  })

  it('shows loading state on submit button when submitting', () => {
    ;(api.post.create.useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isLoading: true,
    })

    render(<CreatePost />)

    expect(screen.getByRole('button', { name: 'Submitting...' })).toBeInTheDocument()
  })

  it('clears input after successful submission', async () => {
    let onSuccessCallback: () => void
    const mockMutate = jest.fn().mockImplementation(() => {
      // Simulate successful mutation by calling onSuccess
      onSuccessCallback()
    })

    ;(api.post.create.useMutation as jest.Mock).mockImplementation(({ onSuccess }) => {
      onSuccessCallback = onSuccess
      return {
        mutate: mockMutate,
        isLoading: false,
      }
    })

    render(<CreatePost />)

    const input = screen.getByPlaceholderText('Title')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    fireEvent.change(input, { target: { value: 'Test Post' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(input).toHaveValue('')
      expect(mockRefresh).toHaveBeenCalled()
    })
  })
}) 