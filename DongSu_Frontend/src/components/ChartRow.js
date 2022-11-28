import React, {useEffect, useState} from 'react'
import axios from 'axios'

import ChartDailyRow from './ChartDailyRow';

function ChartRow(props) {
    const [expanded, setExpanded] = React.useState(false);
    
    const [transaction, setTransaction] = useState([]);

    const expandRow = () => {
        setExpanded(!expanded);

        axios.get(`https://dongsu-back.azurewebsites.net/api/ChartDay/` + props.period + ('00' + props.item.day).slice(-2)).then(
            function ({ data }) {
                setTransaction(data);
            }
        ).catch(
            function (error) {
                console.log("Error: " + error);
            }
        )
    }

    useEffect(function () {
        axios.get(`https://dongsu-back.azurewebsites.net/api/ChartDay/` + props.period + ('00' + props.item.day).slice(-2)).then(
            function ({ data }) {
                setTransaction(data);
            }
        ).catch(
            function (error) {
                console.log("Error: " + error);
            }
        )
    }, [props.updated]
    );

    const dailyTable = function () {
        return transaction.map(function (res, i) {
            return (<ChartDailyRow item={res} updated={props.updated} setUpdated={props.setUpdated} />)
        }
        )
    }

    return (
        <>
        <tr onClick={() => expandRow()} class="py-5 border-b border-gray-200 hover:bg-gray-200 text-sm bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-500 dark:hover:bg-gray-600">
            <td class="px-5 py-5">
                {props.item.day}
            </td>
            <td class="px-5 py-5">
                <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden="true" 
                    class={`${props.item.total > 0 ? 'bg-green-300' : props.item.total < 0 ? 'bg-red-400' : 'bg-gray-200'} absolute inset-0  opacity-50 rounded-full`}>
                    </span>
                    <span class="relative">
                        ${Math.abs(parseFloat(props.item.total))}
                    </span>
                </span>
            </td>
            <td class="px-5 py-5">
                {props.item.totalAmount}
            </td>
        </tr>
        {expanded ? dailyTable() : null}
        </>
    );
    
}

export default ChartRow 