function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export const getFormattedToday: () => string = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

export const getWeekDate: () => string = () => {
    const startDate = new Date();

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 4);

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

export const getWeekDays: () => Array<{ number: number; day: string }> = () => {
    const daysArray: Array<{ number: number; day: string }> = [];
    const today = new Date();

    for (let i = 0; i <= 4; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);

        const dayName = futureDate.toLocaleDateString('en-US', { weekday: 'long' });
        const dayNumber = futureDate.getDate();

        daysArray.push({ number: dayNumber, day: dayName });
    }

    return daysArray;
};
