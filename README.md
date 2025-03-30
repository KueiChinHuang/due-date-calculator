# Due Date Calculator - SAP Emarsys Developer Exercise

## Overview

This project implements `calculateDueDate`, a function that determines issue resolution times based on working hours (**9 AM - 5 PM, Monday to Friday**) and turnaround time.

### Requirements
- Issues are submitted during working hours.
- Only working hours count (weekends are skipped).
- No third-party date/time libraries.
- Implemented in **TypeScript**.

### Bonus:
- Test-driven development (TDD).
- Clean, maintainable code.

## Features

- **TypeScript implementation**
- **Automated Jest test suite**
- Correctly handles:
  - Turnaround within a day
  - Overflow into the next working day
  - Weekend skipping
  - Fractional-hour calculations

## Setup

### Install & Run
```bash
git clone https://github.com/your-username/due-date-calculator.git
cd due-date-calculator
npm install
npm test  # Run tests
```

## Test Cases

The function is tested for various scenarios, including:
| Description                                       | Submit Date & Time     | Turnaround (hrs) | Due Date & Time       |
|--------------------------------------------------|------------------------|------------------|------------------------|
| Same-day turnaround                              | Monday 10:00 AM        | 3                | Monday 1:00 PM         |
| Extends into next day                            | Monday 3:00 PM         | 3                | Tuesday 10:00 AM       |
| Spans over the weekend                           | Friday 3:00 PM         | 3                | Monday 10:00 AM        |
| Fills a full working day                         | Monday 9:00 AM         | 8                | Tuesday 9:00 AM        |
| Spans multiple working days                      | Monday 9:00 AM         | 24               | Thursday 9:00 AM       |
| Spans an entire workweek                         | Monday 9:00 AM         | 40               | Next Monday 9:00 AM    |
| Down to the minute                               | Tuesday 2:12 PM        | 16               | Thursday 2:12 PM       |
| Cross-hour turnaround                            | Tuesday 2:32 PM        | 0.5              | Tuesday 3:02 PM        |
| Cross-day & cross-hour turnaround                | Tuesday 2:32 PM        | 16.5             | Thursday 3:02 PM       |
| Cross-weekend, cross-day & cross-hour turnaround | Friday 2:32 PM         | 16.5             | Tuesday 3:02 PM        |


For detailed test cases, see the [tests directory](./tests).
