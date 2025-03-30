export function calculateDueDate(
	submitDate: Date,
	turnaroundHours: number
): Date {
	// Define working hours: 9 AM to 5 PM for a typical workday
	const workingHoursStart = 9;
	const workingHoursEnd = 17;
	const hoursPerDay = workingHoursEnd - workingHoursStart;

	// Calculate remaining days, hours, and minutes
	let remainingDays = Math.floor(turnaroundHours / hoursPerDay); 
	let remainingHours = Math.floor(turnaroundHours % hoursPerDay); 
	let remainingMinutes =
		((turnaroundHours % hoursPerDay) - remainingHours) * 60;

	// Create a dueDate object from the submit date
	let dueDate = new Date(submitDate);

	// Add the remaining minutes to the due date
	dueDate.setMinutes(dueDate.getMinutes() + remainingMinutes);

	// Add the remaining hours to the due date
	dueDate.setHours(dueDate.getHours() + remainingHours);

	// Handle hour of dueDate
	// If the calculated hour exceeds the work hour (5 PM), adjust accordingly
	if (dueDate.getHours() > workingHoursEnd) {
		remainingDays++; 
		dueDate.setHours(dueDate.getHours() - hoursPerDay);
	}

	// Handle date of dueDate
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
