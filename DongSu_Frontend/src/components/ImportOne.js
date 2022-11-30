import React from 'react'

import Dropdown from '../components/Dropdown'

function ImportOne(props) {
    return (
        <div>
            <div class="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white text-center">
                Add a new transaction
            </div>
            <div class="p-6 -mt-2 md:mt-4">
                <form onSubmit={props.createTransaction}>
                    <div class="flex flex-col mb-2 items-center">
                        <div>
                            <Dropdown text={props.transaction.year} setText={props.setTransaction} transaction={props.transaction} name="year" content={props.year} />&nbsp;
                            <Dropdown text={props.transaction.month} setText={props.setTransaction} transaction={props.transaction} name="month" content={props.month} />&nbsp;<div class="mb-2 md:hidden"></div>
                            <Dropdown text={props.transaction.day} setText={props.setTransaction} transaction={props.transaction} name="day" content={props.day} />
                        </div>
                    </div>
                    <div class="flex flex-col mb-2 items-center">
                        <div>
                            Type: <Dropdown text={props.transaction.type} setText={props.setTransaction} transaction={props.transaction} name="type" content={props.type} />&nbsp;&nbsp;
                            <input onChange={props.handleChange} name="amount" type="text" id="create-account-first-name" class=" py-2 px-4 flex-1 appearance-none border rounded-lg border-transparent border-gray-300 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent w-20 md:w-aut" placeholder="0.00" /> $
                        </div>
                    </div>
                    <div class="flex flex-col mb-2 items-center">
                        <div class=" relative ">
                            <Dropdown text={props.transaction.name} setText={props.setTransaction} transaction={props.transaction} name="name" content={props.transaction.type == "Income" ? props.nameIn : props.nameOut} />&nbsp;&nbsp;
                            <input onChange={props.handleChange} name="description" type="text" id="create-account-email" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent w-20 md:w-aut" placeholder="Description" />
                        </div>
                    </div>
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

export default ImportOne