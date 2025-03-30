export function calculateDueDate(
	submitDate: Date,
	turnaroundHours: number
): Date {
	const workingHoursStart = 9;
	const workingHoursEnd = 17;
	const hoursPerDay = workingHoursEnd - workingHoursStart;
	let remainingDays = Math.floor(turnaroundHours / hoursPerDay);
	let remainingHours = turnaroundHours % hoursPerDay;

	let dueDate = new Date(submitDate);
	const submitHour = submitDate.getHours();
	if (submitHour + remainingHours > workingHoursEnd) {
		remainingDays++;
		dueDate.setHours(
			submitHour + remainingHours - workingHoursEnd + workingHoursStart
		);
	} else {
		dueDate.setHours(submitHour + remainingHours);
	}

	// Skip weekends
	while (remainingDays > 0) {
		do {
			dueDate.setDate(dueDate.getDate() + 1);
		} while (dueDate.getDay() === 6 || dueDate.getDay() === 0);
		remainingDays--;
	}

	return dueDate;
}
