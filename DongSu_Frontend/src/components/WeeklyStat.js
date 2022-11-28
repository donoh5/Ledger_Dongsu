import React, { useEffect, useState } from 'react'
import axios from 'axios'

function WeeklyStat(props) {
    const [weekPeriod, setWeekPeriod] = useState([]);
    const [weekData, setWeekData] = useState([{
        lastDay: 0,
        total: 0,
        limit: 0,
        percentage: 0
    },
    {
        lastDay: 0,
        total: 0,
        limit: 0,
        percentage: 0
    },
    {
        lastDay: 0,
        total: 0,
        limit: 0,
        percentage: 0
    },
    {
        lastDay: 0,
        total: 0,
        limit: 0,
        percentage: 0
    }]);

    const [barStyle, setBarStyle] = useState([
        "w-1/12 h-full text-center text-xs text-gray-600 font-bold bg-pink-200 rounded-full",
        "w-1/12 h-full text-center text-xs text-gray-600 font-bold bg-pink-200 rounded-full",
        "w-1/6 h-full text-center text-xs text-gray-600 font-bold bg-pink-200 rounded-full",
        "w-1/4 h-full text-center text-xs text-gray-600 font-bold bg-pink-200 rounded-full",
        "w-1/3 h-full text-center text-xs text-gray-600 font-bold bg-pink-200 rounded-full",
        "w-5/12 h-full text-center text-xs text-gray-600 font-bold bg-pink-200 rounded-full",
        "w-1/2 h-full text-center text-xs text-gray-600 font-bold bg-pink-200 rounded-full",
        "w-7/12 h-full text-center text-xs text-gray-600 font-bold bg-pink-200 rounded-full",
        "w-2/3 h-full text-center text-xs text-gray-600 font-bold bg-pink-200 rounded-full",
        "w-3/4 h-full text-center text-xs text-gray-600 font-bold bg-pink-200 rounded-full",
        "w-5/6 h-full text-center text-xs text-gray-600 font-bold bg-pink-200 rounded-full",
        "w-11/12 h-full text-center text-xs text-gray-600 font-bold bg-pink-200 rounded-full",
        "w-full h-full text-center text-xs text-gray-600 font-bold bg-pink-200 rounded-full"
    ]);

    useEffect(() => {
        switch (new Date(props.period.year, props.period.month, 0).getDate()) {
            case 28:
                setWeekPeriod(["1 ~ 7", "8 ~ 14", "15 ~ 21", "22 ~ 28"]);
                break;
            case 29:
                setWeekPeriod(["1 ~ 8", "9 ~ 15", "16 ~ 22", "23 ~ 29"]);
                break;
            case 30:
                setWeekPeriod(["1 ~ 8", "9 ~ 16", "17 ~ 23", "24 ~ 30"]);
                break;
            case 31:
                setWeekPeriod(["1 ~ 8", "9 ~ 16", "17 ~ 24", "25 ~ 31"]);
                break;
            default:
                break;
        }
    }, [props.period]);

    useEffect(function () {
        axios.get(`https://dongsu-back.azurewebsites.net/api/WeeklyDate/` + props.period.year + ('00' + props.period.month).slice(-2)).then(
            function ({ data }) {
                console.log(data)
                setWeekData(data);
            }
        ).catch(
            function (error) {
                console.log("Error: " + error);
            }
        )
    }, [props.period]
    );

    return (
        <div class="container my-14 mx-auto px-4 sm:px-8 max-w-3xl">
            <div class="bg-white rounded-lg w-72 shadow-2xl border-2 block p-4 m-auto">
                <div>
                    <span class="inline-block py-1 text-lg w-96 font-bold">
                        Food expense per week
                    </span>
                </div>
                <span class="inline-block py-1 text-base font-bold text-gray-600">
                    {weekPeriod[0]} (${weekData[0].total} / ${weekData[0].limit})
                </span>
                <div class="w-full h-4 bg-gray-400 rounded-full mt-1">
                    <div class={barStyle[weekData[0].percentage]}>
                    </div>
                </div>
                <span class="inline-block py-1 text-base font-bold text-gray-600">
                    {weekPeriod[1]} (${weekData[1].total} / ${weekData[1].limit})
                </span>
                <div class="w-full h-4 bg-gray-400 rounded-full mt-1">
                    <div class={barStyle[weekData[1].percentage]}>
                    </div>
                </div>
                <span class="inline-block py-1 text-base font-bold text-gray-600">
                    {weekPeriod[2]} (${weekData[2].total} / ${weekData[2].limit})
                </span>
                <div class="w-full h-4 bg-gray-400 rounded-full mt-1">
                    <div class={barStyle[weekData[2].percentage]}>
                    </div>
                </div>
                <span class="inline-block py-1 text-base font-bold text-gray-600">
                    {weekPeriod[3]} (${weekData[3].total} / ${weekData[3].limit})
                </span>
                <div class="w-full h-4 bg-gray-400 rounded-full mt-1">
                    <div class={barStyle[weekData[3].percentage]}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeeklyStat