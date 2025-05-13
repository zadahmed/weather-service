# Weather Activities Ranking App

A web application that accepts a city or town name and returns a ranking of how desirable it will be to visit for various activities over the next 7 days, based on weather data. This application provides activity rankings for skiing, surfing, outdoor sightseeing, and indoor sightseeing.

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technical Choices](#technical-choices)
- [AI Assistance](#ai-assistance)
- [Omissions & Trade-offs](#omissions--trade-offs)
- [Future Improvements](#future-improvements)

## Project Overview

The Weather Activities Ranking App is a full-stack web application that:

1. Accepts a city/town name as user input
2. Fetches weather forecast data from Open-Meteo API
3. Ranks different activities based on weather conditions
4. Displays detailed weather information for the next 7 days
5. Maintains a history of recent searches for easy access

The application features a clean UI with responsive design, detailed activity rankings, and comprehensive weather information.

## Architecture

The application follows a client-server architecture with clean separation of concerns:

### Backend

- **GraphQL API**: Single endpoint to handle all data requests
- **Service Layer**: Business logic and data processing
- **External API Integration**: Connection to Open-Meteo for weather data
- **Caching Layer**: Performance optimization for repeated requests

### Frontend

- **React Components**: Modular UI building blocks
- **Custom Hooks**: Encapsulated business logic and state management
- **Apollo Client**: GraphQL data fetching and caching
- **Utility Functions**: Reusable helpers for formatting and display

## Tech Stack

### Backend
- Node.js
- Express
- GraphQL (Apollo Server)
- Axios for API requests
- In-memory caching

### Frontend
- React
- Apollo Client
- Tailwind CSS
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/zadahmed/weather-service.git
cd weather-service
```

2. Install dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Start the development servers

```bash
# Start backend (from the backend directory)
npm run dev

# Start frontend (from the frontend directory)
npm run dev
```

4. Open the application in your browser

Backend GraphQL playground
```
http://localhost:3000/graphql 
```

Frontend application
```
http://localhost:5173
```

## Project Structure

```
/
├── README.md
├── package.json
├── frontend/
└── backend/
└── common/

```

## Technical Choices

### Why GraphQL?
GraphQL was chosen over REST for several reasons:
1. **Efficient Data Fetching**: The client can request exactly what it needs
2. **Reduced Network Requests**: Multiple data needs combined in a single request
3. **Type Safety**: Schema definition provides clear contract between client and server
4. **Developer Experience**: Improved tooling and introspection

### Component Architecture
The frontend follows a modular component architecture with:
1. **Atomic Design Principles**: Building from simple UI elements to complex components
2. **Separation of Concerns**: UI components separate from data-fetching logic
3. **Custom Hooks**: Encapsulated state management and business logic
4. **Compound Components**: For related UI elements that work together

### Backend Structure
The backend follows a service-oriented architecture:
1. **GraphQL Layer**: Defines the API schema and resolvers
2. **Service Layer**: Contains business logic separated by domain
3. **Utility Layer**: Shared helpers and constants
4. **External API Layer**: Encapsulated integration with Open-Meteo

## AI Assistance

Throughout the development process, AI tools were used strategically to enhance productivity and code quality:

### GitHub Copilot
- Used for generating docstring comments
- Assisted with repetitive code patterns
- Helped generate basic unit tests
- Generated commit messages based on code changes

### Claude
- Used for UI component generation for the frontend
- Helped design the ranking algorithm based on weather parameters

AI tools were particularly helpful for accelerating development without compromising code quality. However, all AI-generated code was reviewed and modified as needed to ensure it met the project's standards and requirements.

## Omissions & Trade-offs

### Omissions

1. **User Authentication**: Not implemented as it wasn't a core requirement for this test.
   - Would add using JWT tokens and a simple user database in a real application.

2. **Comprehensive Testing**: Limited test coverage due to time constraints.
   - Would add unit, integration, and end-to-end tests in a production environment.

3. **Advanced Error Recovery**: Basic error handling implemented, but more sophisticated retry logic and fallback options would be beneficial.

4. **Accessibility Features**: Basic a11y implemented, but a full accessibility audit would be necessary for production.

5. **Internationalization**: The app currently only supports English.

### Trade-offs

1. **In-memory Caching vs. Redis**: Chose simple in-memory caching for simplicity, sacrificing persistence and scalability.
   - In production, would implement Redis for distributed caching.

2. **Open-Meteo Limitations**: Used free tier of Open-Meteo with limited data granularity.
   - A paid weather API would provide more detailed data for better rankings.

3. **GraphQL Complexity**: Added initial overhead of setting up GraphQL for a relatively simple API.
   - The benefits would be more apparent as the application scales with more features.

4. **Mobile Optimization**: Focused on desktop-first approach with responsive design.
   - A true mobile-first approach would require additional optimization.

## Future Improvements

With additional time, I would implement the following improvements:

1. **User Preferences**: Allow users to save favorite locations and customize activity preferences.

2. **More Activities**: Expand the range of activities that are ranked based on weather.

3. **Detailed Metrics**: Provide more in-depth explanation for why certain activities are ranked higher.

4. **Historical Comparisons**: Compare current weather with historical averages.

5. **Map Integration**: Visual representation of locations and weather patterns.

6. **Data Visualization**: Charts and graphs for weather trends.

7. **Social Sharing**: Allow users to share rankings and forecasts.

8. **Automated Testing**: Comprehensive test suite for all components and services.
