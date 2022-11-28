import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MonthlyStatRow from './MonthlyStatRow';

function MonthlyStat(props) {
    const [monthlyStats, setMonthlyStats] = useState([{ name: "Earnings", total: 0 }, { name: "Food", total: 0 },
    { name: "Other Expense", total: 0 }, { name: "Other Income", total: 0 }, { name: "Pet", total: 0 }, { name: "Shopping", total: 0 }]);

    useEffect(function () {
        axios.get(`https://dongsu-back.azurewebsites.net/api/Monthly/` + props.period.year + ('00' + props.period.month).slice(-2)).then(
            function ({ data }) {
                setMonthlyStats(data);
            }
        ).catch(
            function (error) {
                console.log("Error: " + error);
            }
        )
    }, [props.period]
    );

    const table = function () {
        return monthlyStats.map(function (res, i) {
            return (<MonthlyStatRow item={res} />)
        }
        )
    }

    return (
        <div>
            <div class="mt-14 mb-96 mx-auto shadow-2xl border-2 rounded-xl w-full md:w-80 p-4 bg-white dark:bg-gray-800 relative overflow-hidden">
                <div class="w-full flex items-center justify-between mb-8">
                    <p class="text-gray-800 dark:text-white text-xl">
                        Monthly Stats
                    </p>
                </div>
                {table()}
            </div>
        </div>
    )
}

export default MonthlyStat