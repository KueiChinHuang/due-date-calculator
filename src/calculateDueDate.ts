export function calculateDueDate(
	submitDate: Date,
	turnaroundHours: number
): Date {
	// Define standard working hours: 9 AM to 5 PM (8-hour workday)
	const workingHoursStart = 9;
	const workingHoursEnd = 17;
	const hoursPerDay = workingHoursEnd - workingHoursStart;

	// Calculate full working days and remaining fractional hours
	let remainingDays = Math.floor(turnaroundHours / hoursPerDay); // Full days covered by turnaround time
	let remainingHours = Math.floor(turnaroundHours % hoursPerDay); // Hours that do not complete a full day
	let remainingMinutes = (turnaroundHours % 1) * 60; // Convert any fraction of an hour into minutes

	// Create a new date object from the submit date
	let dueDate = new Date(submitDate);

	// Add the remaining minutes and hours to the due date
	dueDate.setMinutes(dueDate.getMinutes() + remainingMinutes); // Set remaining minutes
	dueDate.setHours(dueDate.getHours() + remainingHours); // Set remaining hours

	// If hours exceed the working day (5 PM), adjust to the next working day
	if (dueDate.getHours() >= workingHoursEnd) {
		remainingDays++; // Add an additional working day
		dueDate.setHours(dueDate.getHours() - hoursPerDay); // Adjust working hour
	}

	// Skip weekends (Saturday = 6, Sunday = 0) while calculating the due date
	while (remainingDays > 0) {
		dueDate.setDate(dueDate.getDate() + 1); // Move to the next day

		// If the day is a weekend (Saturday or Sunday), skip it and continue with the next day
		if (dueDate.getDay() === 6 || dueDate.getDay() === 0) {
			continue; // Skip weekends
		}

		// Subtract one day for each valid workday
		remainingDays--;
	}

	// Return the calculated due date
	return dueDate;
}
