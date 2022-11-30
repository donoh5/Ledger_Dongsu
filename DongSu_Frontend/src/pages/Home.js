import React, { useState } from 'react'

import Dropdown from '../components/Dropdown'

import MonthlyStat from '../components/MonthlyStat'
import WeeklyStat from '../components/WeeklyStat'
import TotalAmount from '../components/TotalAmount'

function Home() {
    const date = new Date();
    const year = [2021, 2022, 2023, 2024, 2025];
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const [period, setPeriod] = useState({
        year: date.getFullYear(),
        month: date.getMonth() + 1
    });

    return (
        <div>
            <div class="grid grid-rows-1 grid-cols-1 md:grid-cols-4 gap-4 mt-8 md:mt-20 -mb-28 md:-mb-20">
                <div class="row-span-1 col-span-1 hidden md:inline-grid"></div>
                <div class="row-span-1 col-span-1 hidden md:inline-grid"></div>
                <div class="row-span-1 col-span-1 justify-self-end pr-12">
                    <Dropdown text={period.year} setText={setPeriod} transaction={period} name="year" content={year} />&nbsp;
                    <Dropdown text={period.month} setText={setPeriod} transaction={period} name="month" content={month} />
                </div>
                <div class="row-span-1 col-span-1 hidden md:inline-grid"></div>
            </div>
            <div class="grid grid-rows-3 grid-cols-1 md:grid-cols-4 gap-4 my-20 ">
                <div class="row-start-1 row-span-3 col-span-1 hidden md:inline-grid"></div>
                <div class="row-start-1 row-span-3 col-span-1 hidden md:inline-grid"><MonthlyStat period={period}/></div>
                <div class="row-start-1 row-span-2 col-span-1 h-96"><WeeklyStat period={period}/></div>
                <div class="row-span-1 col-span-1 my-24 md:mt-0"><TotalAmount period={period}/></div>
                <div class="row-span-1 col-span-1 -my-16 mx-12 md:hidden"><MonthlyStat period={period}/></div>
                <div class="row-start-1 row-span-3 col-span-1 hidden md:inline-grid"></div>
            </div>
        </div>
    )
}

export default Home