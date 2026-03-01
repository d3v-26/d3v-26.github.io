import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import Clock from './clock';

class CalendarCard extends Component {
    handleClickOutside = () => {
        this.props.toggleVisible();
    };

    buildCalendar(year, month) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();
        const cells = [];
        for (let i = firstDay - 1; i >= 0; i--) {
            cells.push({ day: prevMonthDays - i, thisMonth: false });
        }
        for (let d = 1; d <= daysInMonth; d++) {
            cells.push({ day: d, thisMonth: true });
        }
        let nextDay = 1;
        while (cells.length < 42) {
            cells.push({ day: nextDay++, thisMonth: false });
        }
        return cells;
    }

    render() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const today = now.getDate();

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const dayHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        const cells = this.buildCalendar(year, month);

        return (
            <div
                className={
                    'absolute bg-ub-cool-grey rounded-md py-4 top-9 shadow border border-black border-opacity-20 z-50 ' +
                    (this.props.visible ? 'visible animateShow' : 'invisible')
                }
                // marginLeft instead of translateX so animateShow's transform doesn't clobber centering
                style={{ left: '50%', marginLeft: '-8rem', width: '16rem' }}
            >
                {/* Caret */}
                <div className="absolute w-0 h-0 -top-1 left-1/2 -ml-1 top-arrow-up" />

                {/* Big clock */}
                <div className="text-center text-white text-4xl font-light pb-1">
                    <Clock onlyTime />
                </div>

                {/* Day + date */}
                <div className="text-center text-gray-400 text-sm pb-3">
                    <Clock onlyDay />
                </div>

                {/* Divider */}
                <div className="flex justify-center mb-2">
                    <div className="w-3/4 border-b border-black border-opacity-50" />
                </div>

                {/* Month + year */}
                <div className="text-center text-gray-300 text-xs font-semibold tracking-wide pb-2">
                    {monthNames[month]} {year}
                </div>

                {/* Day-of-week headers */}
                <div className="grid grid-cols-7 text-center text-xs text-gray-500 px-3 mb-1">
                    {dayHeaders.map(d => <span key={d}>{d}</span>)}
                </div>

                {/* Date grid */}
                <div className="grid grid-cols-7 text-center text-xs px-3 pb-2 gap-y-1">
                    {cells.map((cell, i) => (
                        <span
                            key={i}
                            className={
                                'py-0.5 rounded-full ' +
                                (cell.thisMonth && cell.day === today
                                    ? 'bg-ub-orange text-white font-bold'
                                    : cell.thisMonth ? 'text-gray-300' : 'text-gray-600')
                            }
                        >
                            {cell.day}
                        </span>
                    ))}
                </div>
            </div>
        );
    }
}

export default onClickOutside(CalendarCard);
