export function calculateDueDate(
	submitDate: Date,
	turnaroundHours: number
): Date {
	// Define working hours: 9 AM to 5 PM for a typical workday
	const workingHoursStart = 9;
	const workingHoursEnd = 17;
	const hoursPerDay = workingHoursEnd - workingHoursStart;

	// Calculate how many full working days the turnaround time spans
	let remainingDays = Math.floor(turnaroundHours / hoursPerDay); // Full working days
	// Calculate the leftover hours to be added after full working days
	let remainingHours = turnaroundHours % hoursPerDay; // Hours beyond full days

	// Start by creating a new date object from the submit date
	let dueDate = new Date(submitDate);

	// Add the remaining hours to the submit date
	dueDate.setHours(dueDate.getHours() + remainingHours);

	// If the calculated time exceeds the current workday (5 PM), adjust the due date
	if (dueDate.getHours() > workingHoursEnd) {
		remainingDays++; // Add one more full working day
		// Set the time to the start of the next working day (9 AM)
		dueDate.setHours(dueDate.getHours() - hoursPerDay);
	}

	// Set the correct due date by skipping weekends and counting valid workdays
	while (remainingDays > 0) {
		// Move to the next day
		dueDate.setDate(dueDate.getDate() + 1);

		// If the new day is a weekend (Saturday or Sunday), skip it and check the next day
		if (dueDate.getDay() === 6 || dueDate.getDay() === 0) {
			continue; // Skip weekends (no work on Saturday or Sunday)
		}

		// Decrease the remaining days after a valid working day
		remainingDays--;
	}

	// Return the calculated due date
	return dueDate;
}
