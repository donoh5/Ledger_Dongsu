import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Dropdown from '../components/Dropdown'
import ChartRow from '../components/ChartRow';
import ChartRowSearch from '../components/ChartRowSearch';

function Chart() {
    const date = new Date();
    const year = [2021, 2022, 2023, 2024, 2025];
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const [transaction, setTransaction] = useState([]);
    const [transactionSearch, setTransactionSearch] = useState([]);

    const [period, setPeriod] = useState({
        year: date.getFullYear(),
        month: date.getMonth() + 1
    });

    const [searchText, setSearchText] = useState("");

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    useEffect(function () {
        if (searchText !== "") {
            axios.get(`https://dongsu-back.azurewebsites.net/api/Search/` + searchText + `/` + period.year + ('00' + period.month).slice(-2)).then(
                function ({ data }) {
                    setTransactionSearch(data);
                }
            ).catch(
                function (error) {
                    console.log("Error: " + error);
                }
            )
        }
    }, [searchText]
    );

    useEffect(function () {
        axios.get(`https://dongsu-back.azurewebsites.net/api/Chart/` + period.year + ('00' + period.month).slice(-2)).then(
            function ({ data }) {
                setTransaction(data);
            }
        ).catch(
            function (error) {
                console.log("Error: " + error);
            }
        )
    }, [period]
    );

    const [updated, setUpdated] = useState(false);

    useEffect(function () {
        axios.get(`https://dongsu-back.azurewebsites.net/api/Chart/` + period.year + ('00' + period.month).slice(-2)).then(
            function ({ data }) {
                setTransaction(data);
            }
        ).catch(
            function (error) {
                console.log("Error: " + error);
            }
        )
    }, [updated]
    );

    const table = function () {
        return transaction.map(function (res, i) {
            return (<ChartRow item={res} period={period.year + ('00' + period.month).slice(-2)} updated={updated} setUpdated={setUpdated} />)
        }
        )
    };

    const tableSearch = function () {
        return transactionSearch.map(function (res, i) {
            return (<ChartRowSearch item={res} period={period.year + ('00' + period.month).slice(-2)} updated={updated} setUpdated={setUpdated} />)
        }
        )
    };

    return (
        <>
            <div class="container my-8 mx-auto px-4 sm:px-8 max-w-3xl dark:text-white">
                <div class="py-8">
                    <div class="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                        <div>
                            <Dropdown text={period.year} setText={setPeriod} transaction={period} name="year" content={year} />&nbsp;
                            <Dropdown text={period.month} setText={setPeriod} transaction={period} name="month" content={month} />
                        </div>
                        <div class="text-end">
                            <form class="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                                <div class=" relative ">
                                    <input onChange={handleSearch} type="text" id="&quot;form-subscribe-Filter" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent" placeholder="TYPE" />
                                </div>
                                <button class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-pink-300 rounded-lg shadow-md hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-pink-200" type="submit">
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                    <div class="my-4 -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table class="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th scope="col" class="px-5 py-3 bg-white w-1/3 border-b border-gray-200 text-gray-800 dark:border-gray-500 dark:bg-gray-700 dark:text-white text-left text-sm uppercase font-normal">
                                            Date
                                        </th>
                                        <th scope="col" class="px-5 py-3 bg-white w-1/3 border-b border-gray-200 text-gray-800 dark:border-gray-500 dark:bg-gray-700 dark:text-white text-left text-sm uppercase font-normal">
                                            Amount
                                        </th>
                                        <th scope="col" class="px-5 py-3 bg-white w-1/3 border-b border-gray-200 text-gray-800 dark:border-gray-500 dark:bg-gray-700 dark:text-white text-left text-sm uppercase font-normal">
                                            {searchText !== "" ? "Description" : "Total Transaction"}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchText !== "" ? tableSearch() : table()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default Chart