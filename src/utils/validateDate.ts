export const validateUpdateDate = (lastUpdate: Date) => {
    const today = new Date();
    const lastUpdateDate = new Date(lastUpdate);
    const differenceInMs = Math.abs(lastUpdateDate.getTime() - today.getTime());
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const differenceInDays = Math.floor(differenceInMs / millisecondsInADay);

    return differenceInDays;
};

export const numberRecipesToUpdate = (days: number) => {
    if (days >= 7) return 7;

    return days;
};
