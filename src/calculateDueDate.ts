export function calculateDueDate(
	submitDate: Date,
	turnaroundHours: number
): Date {
	const workingHoursStart = 9;
	const workingHoursEnd = 17;
	const hoursPerDay = workingHoursEnd - workingHoursStart;

	// Calculate full working days and remaining hours
	let remainingDays = Math.floor(turnaroundHours / hoursPerDay);
	let remainingHours = turnaroundHours % hoursPerDay;

	let dueDate = new Date(submitDate);

	// Calculate the due time on the same day
	dueDate.setHours(dueDate.getHours() + remainingHours);

	// Adjust if it goes past the working hours
	if (dueDate.getHours() > workingHoursEnd) {
		remainingDays++;
		dueDate.setHours(dueDate.getHours() - hoursPerDay);
	}

	// Skip weekends for remaining days
	while (remainingDays > 0) {
		dueDate.setDate(dueDate.getDate() + 1);

		if (dueDate.getDay() === 6 || dueDate.getDay() === 0) {
			// Skip weekends
			continue;
		}

		remainingDays--;
	}

	return dueDate;
}
