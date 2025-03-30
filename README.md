# Due Date Calculator - SAP Emarsys Developer Exercise

This project implements `calculateDueDate`, a function designed to calculate due dates based on working hours (9 AM - 5 PM, Monday to Friday) and turnaround times.

## Requirements

-   Issues are submitted during working hours.
-   Only working hours count (weekends are skipped).
-   No third-party date/time libraries.

### Bonus:

-   Test-driven development (TDD).
-   Clean, maintainable code.

## Features

-   **TypeScript implementation**: The solution is written in TypeScript, ensuring type safety and better maintainability.
-   **Automated Jest test suite**: Comprehensive unit tests are included to ensure that the solution works as expected under various scenarios.
-   **Handles various turnaround scenarios**:
    -   **Same-day turnaround**: Calculates due date for issues resolved within the same working day.
    -   **Cross-day & weekend overflow**: Handles issues that extend into the next day or weekend.
    -   **Fractional-hour support**: Accurate calculations for partial hours.

## Setup

### Install & Run

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/due-date-calculator.git
    ```

2. Navigate into the project directory and install the dependencies:
    ```bash
    cd due-date-calculator
    npm install  # Installs dependencies
    ```
    
3. Run tests:
    ```bash
    npm test  # Run automated tests
    ```


## Test Cases

The `calculateDueDate` function is tested against various scenarios to ensure robustness and accuracy. Below are the main scenarios tested:

| Description                                       | Submit Date & Time     | Turnaround (hrs) | Due Date & Time       |
|--------------------------------------------------|------------------------|------------------|------------------------|
| **Same-day turnaround**                          | Monday 10:00 AM        | 3                | Monday 1:00 PM         |
| **Extends into next day**                        | Monday 3:00 PM         | 3                | Tuesday 10:00 AM       |
| **Spans over the weekend**                       | Friday 3:00 PM         | 3                | Monday 10:00 AM        |
| **Fills a full working day**                     | Monday 9:00 AM         | 8                | Tuesday 9:00 AM        |
| **Spans multiple working days**                  | Monday 9:00 AM         | 24               | Thursday 9:00 AM       |
| **Spans an entire workweek**                     | Monday 9:00 AM         | 40               | Next Monday 9:00 AM    |
| **Down to the minute**                           | Tuesday 2:12 PM        | 16               | Thursday 2:12 PM       |
| **Cross-hour turnaround**                        | Tuesday 2:32 PM        | 0.5              | Tuesday 3:02 PM        |
| **Cross-day & cross-hour turnaround**            | Tuesday 2:32 PM        | 16.5             | Thursday 3:02 PM       |
| **Cross-weekend, cross-day & cross-hour turnaround** | Friday 2:32 PM         | 16.5             | Tuesday 3:02 PM        |

For a more detailed list of test cases and the test suite, see the [tests directory](./tests).
