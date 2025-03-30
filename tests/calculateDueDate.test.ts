import { calculateDueDate } from "../src/calculateDueDate";

describe("calculateDueDate function", () => {
	test("should calculate turnaround within the same day", () => {
		const submitDate = new Date("2025-03-31T10:00:00"); // Monday 10AM
		const expectedDueDate = new Date("2025-03-31T13:00:00"); // Same day, 3 hours later
		expect(calculateDueDate(submitDate, 3)).toEqual(expectedDueDate);
	});

	test("should calculate turnaround that extends into the next day", () => {
		const submitDate = new Date("2025-03-31T15:00:00"); // Monday 3PM
		const expectedDueDate = new Date("2025-04-01T10:00:00"); // Next day at 10AM
		expect(calculateDueDate(submitDate, 3)).toEqual(expectedDueDate);
	});

	test("should calculate turnaround that spans over the weekend", () => {
		const submitDate = new Date("2025-04-04T15:00:00"); // Friday 3PM
		const expectedDueDate = new Date("2025-04-07T10:00:00"); // Monday 10AM
		expect(calculateDueDate(submitDate, 3)).toEqual(expectedDueDate);
	});

	test("should calculate turnaround that fills a full working day", () => {
		const submitDate = new Date("2025-03-31T09:00:00"); // Monday 9AM
		const expectedDueDate = new Date("2025-04-01T09:00:00"); // Next day 9AM
		expect(calculateDueDate(submitDate, 8)).toEqual(expectedDueDate);
	});

	test("should calculate turnaround that spans multiple working days (24 hours)", () => {
		const submitDate = new Date("2025-03-31T09:00:00"); // Monday 9AM
		const expectedDueDate = new Date("2025-04-03T09:00:00"); // Thursday 9AM
		expect(calculateDueDate(submitDate, 24)).toEqual(expectedDueDate);
	});

	test("should calculate turnaround spanning an entire workweek (40 hours)", () => {
		const submitDate = new Date("2025-03-31T09:00:00"); // Monday 9AM
		const expectedDueDate = new Date("2025-04-07T09:00:00"); // Next Monday 9AM
		expect(calculateDueDate(submitDate, 40)).toEqual(expectedDueDate);
	});

	test("should calculate due date with turnaround down to the minute", () => {
		const submitDate = new Date("2025-04-01T14:12:00"); // Tuesday 2:12PM
		const expectedDueDate = new Date("2025-04-03T14:12:00"); // Thursday 2:12PM
		expect(calculateDueDate(submitDate, 16)).toEqual(expectedDueDate);
	});

	test("should handle due date with minutes and cross-hour turnaround", () => {
		const submitDate = new Date("2025-04-01T14:32:00"); // Tuesday 2:32PM
		const expectedDueDate = new Date("2025-04-01T15:02:00"); // Same day, 0.5 hr later
		expect(calculateDueDate(submitDate, 0.5)).toEqual(expectedDueDate);
	});

	test("should handle due date with cross-day and cross-hour turnaround", () => {
		const submitDate = new Date("2025-04-01T14:32:00"); // Tuesday 2:32PM
		const expectedDueDate = new Date("2025-04-03T15:02:00"); // Thursday 3:02PM
		expect(calculateDueDate(submitDate, 16.5)).toEqual(expectedDueDate);
	});

	test("should handle due date with cross-weekend, cross-day, and cross-hour turnaround", () => {
		const submitDate = new Date("2025-03-29T14:32:00"); // Friday 2:32PM
		const expectedDueDate = new Date("2025-04-01T15:02:00"); // Tuesday 3:02PM
		expect(calculateDueDate(submitDate, 16.5)).toEqual(expectedDueDate);
	});


});
