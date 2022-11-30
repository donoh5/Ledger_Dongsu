import axios from 'axios';
import React, { useState, useEffect } from 'react'

import ImportOne from '../components/ImportOne';
import ImportExcel from '../components/ImportExcel';

function AddTransaction() {
    const createTransaction = (event) => {
        event.preventDefault();
        axios.post(`https://dongsu-back.azurewebsites.net/api/Add`, transaction)
            .then(res => {
                if (res.status === 200) {
                    alert('Transaction successfully added');
                }
            })
            .catch(err => alert(err));
    };

    const createTransactionExcel = (event) => {
        event.preventDefault();
        excelData.map((transaction) => {
            if(transaction[0].value !== '' && transaction[1].value !== '' && transaction[2].value !== '' && transaction[3].value !== '' && transaction[4].value !== '') {
                axios.post(`https://dongsu-back.azurewebsites.net/api/Add`, {
                    year: transaction[0].value.split('-')[0],
                    month: transaction[0].value.split('-')[1],
                    day: transaction[0].value.split('-')[2],
                    type: transaction[1].value,
                    amount: transaction[2].value,
                    name: transaction[3].value,
                    description: transaction[4].value
                })
                .then(res => {
                    if (res.status !== 200) {
                        alert('Transaction failed to add');
                    }
                })
                .catch(err => alert(err));
            }
        })
    };

    const date = new Date();

    const [transaction, setTransaction] = useState({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        type: "Expense",
        name: "",
        amount: "0",
        description: ""
    });

    useEffect(function () {
        if (transaction.type === "Expense") {
            setTransaction((prevState) => {
                return { ...prevState, name: "Food" }
            });
        }
        else {
            setTransaction((prevState) => {
                return { ...prevState, name: "Earnings" }
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

    const year = [2021, 2022, 2023, 2024, 2025];
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const day = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    const type = ['Income', 'Expense'];
    const nameIn = ["Earnings", "Other Income"];
    const nameOut = ["Food", "Pet", "Shopping", "Other Expense"];

    const [excelData, setExcelData] = useState([
        [{ value: "2022-11-28" }, { value: "Expense" }, { value: "10.13" }, { value: "Food" }, { value: "Bubble tea" }],
        [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
        [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
        [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
        [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
        [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
        [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
        [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
        [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
        [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    ]);

    const [isMultiple, setIsMultiple] = useState(false);

    return (
        <div class="container my-10 md:my-20 mx-auto px-4 max-w-3xl">
            <div class="flex flex-col max-w-full px-4 py-8 bg-white rounded-lg border-2 shadow-xl sm:px-6 md:px-8 lg:px-10">
                <div class="items-center mb-4 hidden md:flex">
                    <input id="default-checkbox" type="checkbox" onChange={() => setIsMultiple(!isMultiple)} value={isMultiple} class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Excel Import</label>
                </div>
                {isMultiple === true ? <ImportExcel excelData={excelData} setExcelData={setExcelData} createTransactionExcel={createTransactionExcel} /> :
                <ImportOne createTransaction={createTransaction} transaction={transaction} setTransaction={setTransaction}
                year={year} month={month} day={day} type={type} nameIn={nameIn} nameOut={nameOut} handleChange={handleChange} />}
            </div>
        </div>
    )
}

export default AddTransaction