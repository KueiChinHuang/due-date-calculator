import { calculateDueDate } from "../src/calculateDueDate";

describe("calculateDueDate function", () => {
	// Existing test cases
	test("Basic turnaround within the same day", () => {
		const submitDate = new Date("2025-03-31T10:00:00"); // Monday 10AM
		const expectedDueDate = new Date("2025-03-31T13:00:00"); // Same day, 3 hours later
		expect(calculateDueDate(submitDate, 3)).toEqual(expectedDueDate);
	});

	test("Turnaround that goes into the next day", () => {
		const submitDate = new Date("2025-03-31T15:00:00"); // Monday 3PM
		const expectedDueDate = new Date("2025-04-01T10:00:00"); // Next day at 10AM
		expect(calculateDueDate(submitDate, 3)).toEqual(expectedDueDate);
	});

	test("Turnaround that spans a weekend", () => {
		const submitDate = new Date("2025-04-04T15:00:00"); // Friday 3PM
		const expectedDueDate = new Date("2025-04-07T10:00:00"); // Monday 10AM
		expect(calculateDueDate(submitDate, 3)).toEqual(expectedDueDate);
	});

	// New test cases
	test("Turnaround that completes at the end of the same day", () => {
		const submitDate = new Date("2025-03-31T13:00:00"); // Monday 1PM
		const expectedDueDate = new Date("2025-03-31T17:00:00"); // Same day, 5PM
		expect(calculateDueDate(submitDate, 4)).toEqual(expectedDueDate);
	});

	test("Turnaround that exactly fills a full working day", () => {
		const submitDate = new Date("2025-03-31T09:00:00"); // Monday 9AM
		const expectedDueDate = new Date("2025-04-01T09:00:00"); // Next day 9AM
		expect(calculateDueDate(submitDate, 8)).toEqual(expectedDueDate);
	});

	test("Turnaround spanning multiple days (24 hours)", () => {
		const submitDate = new Date("2025-03-31T09:00:00"); // Monday 9AM
		const expectedDueDate = new Date("2025-04-03T09:00:00"); // Wednesday 9AM
		expect(calculateDueDate(submitDate, 24)).toEqual(expectedDueDate);
	});

	test("Turnaround that starts in the afternoon and spans multiple days", () => {
		const submitDate = new Date("2025-03-31T14:00:00"); // Monday 2PM
		const expectedDueDate = new Date("2025-04-02T12:00:00"); // Wednesday 12PM
		expect(calculateDueDate(submitDate, 14)).toEqual(expectedDueDate);
	});

	test("Turnaround spanning an entire week (40 hours)", () => {
		const submitDate = new Date("2025-03-31T09:00:00"); // Monday 9AM
		const expectedDueDate = new Date("2025-04-07T09:00:00"); // Next Monday 9AM
		expect(calculateDueDate(submitDate, 40)).toEqual(expectedDueDate);
	});
});
