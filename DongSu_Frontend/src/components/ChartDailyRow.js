import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Dropdown from './Dropdown';
import EditOne from './EditOne';

function ChartDailyRow(props) {
    const [edit, setEdit] = useState(false);

    const handleDoubleClick = event => {
        if (event.detail == 2 || (window.innerWidth <= 900 && event.detail == 1)) {
            setEdit(true);
        }
    }

    return (
        <>
            <tr onClick={handleDoubleClick} class="py-5 border-b border-gray-100 text-sm bg-gray-100 text-black">
                <td class="px-5 py-5">
                    {props.item.name}
                </td>
                <td class="px-5 py-5">
                    <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden="true"
                            class={`${props.item.type == "Income" ? 'bg-green-300' : 'bg-red-400'} absolute inset-0  opacity-50 rounded-full`}>
                        </span>
                        <span class="relative">
                            ${parseFloat(props.item.amount)}
                        </span>
                    </span>
                </td>
                <td class="px-5 py-5">
                    {props.item.description}
                </td>
            </tr>
            {edit === true ? <EditOne item={props.item} setEdit={setEdit} updated={props.updated} setUpdated={props.setUpdated} /> : <></>}
        </>
    );
}

export default ChartDailyRow 