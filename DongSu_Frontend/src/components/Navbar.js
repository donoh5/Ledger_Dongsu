import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import logo from '../icons/logo.svg';

import Chart from '../pages/Chart';
import AddTransaction from '../pages/AddTransaction';
import Home from '../pages/Home';

function Navbar() {
    const [home, setHome] = React.useState(true);
    const [chart, setChart] = React.useState(false);
    const [add, setAdd] = React.useState(false);

    function handleMenu(name) {
        if (name === 'home') {
            setHome(true);
            setChart(false);
            setAdd(false);
        } else if (name === 'chart') {
            setHome(false);
            setChart(true);
            setAdd(false);
        } else if (name === 'add') {
            setHome(false);
            setChart(false);
            setAdd(true);
        }
    }

    const designNavMenu = 'hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium';

    return (
        <Router>
            <div>
                <nav class="bg-white shadow ">
                    <div class="max-w-7xl mx-auto px-8">
                        <div class="flex items-center justify-between h-16">
                            <div class="w-full justify-between flex items-center">
                                <a class="flex-shrink-0" href="/">
                                    <img class="h-8 w-8" src={logo} alt="DongSu" />
                                </a>
                                <div class="hidden md:block">
                                    <div class="ml-10 flex items-baseline space-x-4">
                                        <Link onClick={() => handleMenu('home')}
                                            class={`${home ? 'text-gray-800 font-bold' : 'text-gray-300'} ${designNavMenu}`} to="/">
                                            Home
                                        </Link>
                                        <Link onClick={() => handleMenu('chart')}
                                            class={`${chart ? 'text-gray-800 font-bold' : 'text-gray-300'} ${designNavMenu}`} to="/Chart">
                                            Chart
                                        </Link>
                                        <Link onClick={() => handleMenu('add')}
                                            class={`${add ? 'text-gray-800 font-bold' : 'text-gray-300'} ${designNavMenu}`} to="/AddTransaction">
                                            Add New!
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div class="block">
                                <div class="ml-4 flex items-center md:ml-6">
                                </div>
                            </div>
                            <div class="-mr-2 flex md:hidden">
                                <button class="text-gray-800 hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                                    <svg width="20" height="20" fill="currentColor" class="h-8 w-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="md:hidden">
                        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a class="text-gray-300 block px-3 py-2 rounded-md text-base font-medium" href="/#">
                                Home
                            </a>
                            <a class="text-gray-800 block px-3 py-2 rounded-md text-base font-medium" href="/Chart">
                                Chart
                            </a>
                            <a class="text-gray-300 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium" href="/#">
                                Add New!
                            </a>
                        </div>
                    </div>
                </nav>

                <div>
                    <Routes>
                        <Route exact path="/"
                            element={<Home />} />
                        <Route path="/Chart"
                            element={<Chart />} />
                        <Route path="/AddTransaction"
                            element={<AddTransaction />} />
                        <Route path="*"
                            element={<Home />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default Navbar