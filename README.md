## Project Overview

This application handles the following tasks:

1. **Bulk Employee Creation**: Generate a customizable number of employee records (minimum 350) with randomly generated data
2. **API Integration**: Send the generated employees to the external API's bulk import endpoint
3. **Status Tracking**: Monitor the import job progress using the API's bulk status endpoint
4. **Data Display**: Present the processed employees in a responsive, paginated table
5. **Infinite Scrolling**: Load additional employee records as the user scrolls through the table

## Technologies Used

### Core Technologies

- **Svelte/SvelteKit**: A reactive JavaScript framework for building user interfaces
- **TypeScript**: For type-safe development and improved code quality
- **Vite**: Fast, modern frontend build tool

### API Integration

- **Fetch API**: For making HTTP requests to the external and internal API
- **SvelteKit Endpoints**: Server routes for API proxying and data processing

### UI Components and Styling

- **Tailwind CSS**: For responsive, utility-first styling
- **Svelte Transitions**: For smooth loading animations
- **Custom Components**: Reusable UI elements like NumberInput, Button, and Table

### Data Management

- **Svelte Stores**: For global state management
- **Intersection Observer API**: For implementing infinite scrolling

## Architecture

The application follows a clean, component-based architecture:

### 1. State Management

- Centralized state using Svelte stores for employee data, loading states, and pagination
- Reactive updates ensure UI stays in sync with data changes

### 2. Data Flow

- User input → Random data generation → API submission → Status polling → Data display
- Asynchronous operations managed with Promise chains and async/await

### 3. API Integration Layer

- Abstracted API communication through service modules
- Error handling and retry mechanisms for robust operation

### 4. UI Component Hierarchy

- Reusable components
- Clear separation of concerns between UI and business logic

## Project Structure

```
proj/
├── src/
│   ├── lib/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Button.svelte
│   │   │   ├── NumberInput.svelte
│   │   │   ├── EmployeeTable.svelte
│   │   │   ├── LoadingSpinner.svelte
│   │   │   └── ...
│   │   ├── api/             # API and data services
│   │   │   ├── api.ts            # API client functions
│   │   │   ├── employeeService.ts # Employee-specific operations
│   │   │   └── ...
│   │   ├── stores/               # Svelte stores for state management
│   │   │   ├── employees.ts
│   │   │   ├── importJob.ts
│   │   │   └── ...
│   │   ├── types/                # TypeScript type definitions
│   │   │   ├── Employee.ts
│   │   │   ├── ApiResponse.ts
│   │   │   └── ...
│   │   └── utils/                # Utility functions
│   │       ├── randomData.ts     # Random data generation
│   │       ├── formatters.ts     # Data formatting helpers
│   │       └── ...
│   ├── routes/                   # SvelteKit routes
│   │   ├── +page.svelte          # Main application page
│   │   ├── +page.ts              # Page data loading
│   │   └── api/                  # Server endpoints
│   │       ├── employees/        # Employee-related API endpoints
│   │       └── ...
│   └── app.html                  # HTML template
├── static/                       # Static assets
├── tests/                        # Test files
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── vite.config.js                # Vite configuration
└── README.md                     # Project documentation
```

## Component Interaction

The application components interact through the following flow:

1. **User Interface Layer**:

   - The main page contains the NumberInput and Button components
   - User enters the desired number of employees and clicks the button
   - The EmployeeTable component displays the results and handles infinite scrolling

2. **Business Logic Layer**:

   - When the button is clicked, the employee generation service creates random employee data
   - The API service submits the data to the external API's bulk import endpoint
   - A job ID is returned and stored in the importJob store

3. **Status Monitoring**:

   - The application polls the bulk status endpoint to track import progress
   - The LoadingSpinner component is displayed during processing
   - Updates are reactively reflected in the UI

4. **Data Display Layer**:
   - Once data is available, the EmployeeTable component renders it
   - The InfiniteScroll directive detects when the user approaches the bottom of the table
   - Additional data is loaded automatically from the API
   - A counter below the table shows the current number of displayed records

## Implementation Details

### Random Employee Generation

The application generates employee records with random data using:

- Randomized names from predefined lists
- Valid email formats based on generated names
- Random dates for birthdays and hire dates
- Department assignment from available categories
- Proper formatting according to API requirements

### API Integration

- Handles authentication and authorization
- Formats requests according to API specifications
- Processes responses and transforms data for UI consumption
- Implements error handling and recovery strategies

### Infinite Scrolling Implementation

The table's infinite scrolling functionality:

- Uses the Intersection Observer API to detect when the user approaches the bottom
- Triggers pagination logic to fetch the next batch of records
- Updates the store with new data without disrupting the existing view
- Provides visual feedback during loading of additional records

### Loading Animation

During backend processing, the application:

- Displays a centered loading animation over the table
- Shows progress information based on the bulk status endpoint
- Gracefully transitions between loading and data display states
- Handles edge cases such as failed imports or partial data availability

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
# Start development server
npm run dev

# Start with browser auto-open
npm run dev -- --open
```

## API Documentation Reference

- `POST /employees/bulk/import`: Creates multiple employee records in a batch
- `GET /employees/bulk/status/{jobId}`: Retrieves the status of a bulk import job
- `GET /employees`: Retrieves paginated employee records

## Future Enhancements

Potential improvements for future versions:

1. Add filtering and sorting capabilities to the employee table
2. Implement employee record editing functionality
3. Enhance error recovery and offline support
4. Implement unit and integration tests for all components
5. Refresh Token rotation
6. Form validation
