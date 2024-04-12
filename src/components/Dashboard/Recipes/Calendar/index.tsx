'use client';

import { getWeekDays } from '@utils/week';
import React from 'react';

type Props = {
    day: number;
    setDay: (number: number) => void;
};

export const Calendar: React.FC<Props> = ({ day, setDay }) => {
    const weekDays = getWeekDays();
    return (
        <div className="flex w-full flex-wrap justify-center rounded-md shadow-md">
            {weekDays.map((weekDays) => {
                return (
                    <div
                        className={`${day == weekDays.number ? 'text-fourth' : ''} flex w-1/3 flex-col justify-center px-4 py-6 text-center align-middle text-lg hover:cursor-pointer lg:w-1/5`}
                        key={weekDays.day}
                        onClick={() => setDay(weekDays.number)}
                    >
                        <span>{weekDays.number}</span>
                        <span className="pt-4">{weekDays.day}</span>
                    </div>
                );
            })}
        </div>
    );
};
