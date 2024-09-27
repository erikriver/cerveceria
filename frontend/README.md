# Cervecería Frontend

This is the frontend application for the Cervecería (Brewery) project. It's built with Next.js, TypeScript, and Tailwind CSS, providing a user interface for viewing available beers, placing orders, and viewing order summaries.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed the latest version of [Node.js and npm](https://nodejs.org/)
* You have a Windows/Linux/Mac machine.
* You have read this README.md file.
* You have the Cervecería backend running on `http://localhost:8000`.

## Installing Cervecería Frontend

To install the Cervecería Frontend, follow these steps:


1. Navigate to the project directory:
   ```
   cd frontend
   ```
2. Install the dependencies:
   ```
   npm install
   ```

## Using Cervecería Frontend

To use Cervecería Frontend, follow these steps:

1. Ensure that the backend server is running.
2. Start the development server:
   ```
   npm run dev
   ```
3. Open your web browser and visit `http://localhost:3000`

## Running Tests

To run tests, use the following command:

```
npm test
```

To run tests in watch mode:

```
npm run test:watch
```

## Building for Production

To create a production build:

```
npm run build
```

To start the production server:

```
npm start
```

## Project Structure

- `pages/`: Contains the main pages of the application.
- `components/`: Reusable React components.
- `lib/`: Reusable Typescript libraries.
- `__tests__/`: Unit tests for components.

