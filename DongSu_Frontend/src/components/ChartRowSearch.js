import React from 'react'

function ChartRowSearch(props) {
    return (
        <>
            <tr class="py-5 border-b border-gray-200 hover:bg-gray-200 text-sm bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-500 dark:hover:bg-gray-600">
                <td class="px-5 py-5">
                    {props.item.day}
                </td>
                <td class="px-5 py-5">
                    <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden="true"
                            class={`${props.item.amount > 0 ? 'bg-green-300' : props.item.amount < 0 ? 'bg-red-400' : 'bg-gray-200'} absolute inset-0  opacity-50 rounded-full`}>
                        </span>
                        <span class="relative">
                            ${Math.abs(parseFloat(props.item.amount))}
                        </span>
                    </span>
                </td>
                <td class="px-5 py-5">
                    {props.item.description}
                </td>
            </tr>
        </>
    );
}

export default ChartRowSearch