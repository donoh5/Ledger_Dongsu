import React from 'react'

function MonthlyStatRow(props) {
    return (
        <div class="flex items-center mb-4 rounded justify-between">
            <div class="flex items-center w-full justify-between">
                <div class="flex text-sm flex-col w-full ml-2 items-start justify-between">
                    <p class="dark:text-white">
                        {props.item.name}
                    </p>
                </div>
                <span class="text-green-400">
                    ${props.item.total}
                </span>
            </div>
        </div>
    )
}

export default MonthlyStatRow