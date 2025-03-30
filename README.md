# NER SCCA Solo Live Timing

A modern web application built with the [T3 Stack](https://create.t3.gg/) to display live timing and results for NER SCCA Solo events.

## Features

- Real-time display of class results
- PAX (Performance Adjusted Index) results
- Raw timing data
- Modern, responsive UI built with Next.js and TailwindCSS
- Type-safe API with tRPC
- Hosted on Vercel with performance monitoring

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **API**: tRPC
- **Data Fetching**: React Query
- **Authentication**: NextAuth.js
- **Performance Monitoring**: Vercel Speed Insights

## Requirements

- Node.js 18 or higher
- npm 9.5.1 or higher

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```
   # Next Auth Configuration
   # Generate a new secret with: openssl rand -base64 32
   NEXTAUTH_SECRET=           # Secret for NextAuth.js
   NEXTAUTH_URL=             # URL of your application (e.g., http://localhost:3000)

   # Next Auth Discord Provider
   DISCORD_CLIENT_ID=        # Discord OAuth Client ID
   DISCORD_CLIENT_SECRET=    # Discord OAuth Client Secret

   # Results Data URLs (Azure Blob Storage)
   CLASS_RESULTS_JSON_URL=   # URL for class-specific results
   PAX_RESULTS_JSON_URL=     # URL for PAX-adjusted results
   RAW_RESULTS_JSON_URL=     # URL for raw timing data

   # Application Settings
   EXPECTED_RUNS=           # Number of expected runs per competitor
   ```
   Note: 
   - For NextAuth secret generation, use: `openssl rand -base64 32`
   - Discord credentials can be obtained from the Discord Developer Portal
   - Results URLs should point to your Azure Blob Storage containers

4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:watch` - Run unit tests in watch mode with code coverage

## Testing and Pre-commit Hooks

This project uses Husky to enforce code quality checks before commits. The following checks run automatically:
- TypeScript type checking
- ESLint
- Prettier formatting

### Running Tests Manually

```bash
# Run type checking
npm run type-check

# Run ESLint
npm run lint

# Run Prettier check
npm run format:check

# Run jest check
npm run test
```

### Bypassing Pre-commit Hooks

In some cases, you may need to bypass the pre-commit hooks. You can do this in two ways:

1. Using the `--no-verify` flag with git commit:
   ```bash
   git commit -m "your message" --no-verify
   ```

2. Temporarily disable Husky:
   ```bash
   # Disable Husky
   git config core.hooksPath /dev/null
   
   # Re-enable Husky when done
   git config --unset core.hooksPath
   ```

Note: Bypassing pre-commit hooks should be done sparingly and only when absolutely necessary, as they help maintain code quality.

## Deployment

The application is automatically deployed to Vercel when changes are pushed to the main branch. The application fetches results data from Azure Blob Storage.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is private and proprietary.
