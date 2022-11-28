import React from 'react'

import { Spreadsheet } from 'react-spreadsheet';

function ImportExcel(props) {
    return (
        <div>
            <div class="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white text-center">
                Add a new transaction
            </div>
            <div class="p-6 mt-6">
                <form onSubmit={props.createTransactionExcel}>
                    <Spreadsheet data={props.excelData} onChange={props.setExcelData} columnLabels={['Date', 'Type', 'Amount', 'Category', 'Description']} />
                    <div class="flex w-full my-4">
                        <button class="py-2 px-4  bg-pink-300 hover:bg-pink-400 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ImportExcel