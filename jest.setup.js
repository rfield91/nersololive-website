// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn(),
    push: jest.fn(),
  }),
  usePathname: () => '',
}))

// Mock trpc
jest.mock('~/trpc/react', () => ({
  api: {
    post: {
      create: {
        useMutation: () => ({
          mutate: jest.fn(),
          isLoading: false,
        }),
      },
    },
  },
})) 