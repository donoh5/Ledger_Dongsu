import axios from 'axios';
import React, { useState, useEffect } from 'react'

import Dropdown from '../components/Dropdown'

function EditOne(props) {
    const editTransaction = () => {
        axios.put(`https://dongsu-back.azurewebsites.net/api/updateTran/` + props.item._id, transaction)
            .then(res => {
                if (res.status === 200) {
                    props.setUpdated(!props.updated);
                    props.setEdit(false);
                }
                else
                    Promise.reject()
            })
            .catch(err => alert(err));
    };

    const deleteTransaction = () => {
        axios.delete(`https://dongsu-back.azurewebsites.net/api/deleteTran/` + props.item._id)
            .then(res => {
                if (res.status === 200) {
                    props.setUpdated(!props.updated);
                    props.setEdit(false);
                }
                else
                    Promise.reject()
            })
            .catch(err => alert(err));
    };

    const [transaction, setTransaction] = useState({
        year: props.item.year,
        month: props.item.month,
        day: props.item.day,
        type: props.item.type,
        name: props.item.name,
        amount: props.item.amount,
        description: props.item.description
    });

    useEffect(function () {
        if (transaction.type === "Expense") {
            setTransaction((prevState) => {
                return { ...prevState, name: props.item.name }
            });
        }
        else {
            setTransaction((prevState) => {
                return { ...prevState, name: props.item.name }
            });
        }
    }, [transaction.type]
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction({
            ...transaction,
            [name]: value,
        });
    };

    const handleClose = () => {
        props.setEdit(false);
    }

    const year = [2021, 2022, 2023, 2024, 2025];
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const day = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    const type = ['Income', 'Expense'];
    const nameIn = ["Earnings", "Other Income"];
    const nameOut = ["Food", "Pet", "Shopping", "Other Expense"];

    return (
        <div class="fixed top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-70 z-40">
            <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <div class="flex flex-col max-w-full px-4 py-8 bg-white rounded-lg shadow-xl sm:px-6 md:px-8 lg:px-10">
                    <div>
                        <div class="p-6">
                            <div class="flex flex-col mb-2 items-center">
                                <div>
                                    <Dropdown text={transaction.year} setText={setTransaction} transaction={transaction} name="year" content={year} />&nbsp;
                                    <Dropdown text={transaction.month} setText={setTransaction} transaction={transaction} name="month" content={month} />&nbsp;
                                    <Dropdown text={transaction.day} setText={setTransaction} transaction={transaction} name="day" content={day} />
                                </div>
                            </div>
                            <div class="flex flex-col mb-2 items-center">
                                <div>
                                    Type: <Dropdown text={transaction.type} setText={setTransaction} transaction={transaction} name="type" content={type} />&nbsp;
                                    $&nbsp;<input onChange={handleChange} value={transaction.amount} name="amount" type="text" id="create-account-first-name" class=" py-2 px-4 flex-1 appearance-none border rounded-lg border-transparent border-gray-300 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent w-14 md:w-auto" placeholder="0.00" />
                                </div>
                            </div>
                            <div class="flex flex-col mb-2 items-center">
                                <div class=" relative ">
                                    <Dropdown text={transaction.name} setText={setTransaction} transaction={transaction} name="name" content={transaction.type == "Income" ? nameIn : nameOut} />&nbsp;&nbsp;
                                    <input onChange={handleChange} value={transaction.description} name="description" type="text" id="create-account-email" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent" placeholder="Description" />
                                </div>
                            </div>
                            <div class="flex w-full my-4">
                                <button onClick={editTransaction} class="py-2 px-4  bg-pink-300 hover:bg-pink-400 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Edit
                                </button>
                            </div>
                            <div class="flex w-full my-4">
                                <button onClick={deleteTransaction} class="py-2 px-4  bg-pink-300 hover:bg-pink-400 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Delete
                                </button>
                            </div>
                            <div class="flex w-full my-4 -mb-2">
                                <button onClick={handleClose} class="py-2 px-4  bg-pink-300 hover:bg-pink-400 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditOne