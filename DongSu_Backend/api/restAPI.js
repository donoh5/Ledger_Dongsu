const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

router.get('/Chart/:period',
    function (req, res, next) {
        if (req.params.period === null || req.params.period === '') {
            res.send(null);
            return;
        }

        let SYear = req.params.period.substring(0, 4);
        let SMonth = req.params.period.substring(4, 6);

        var result = [];

        Transaction.find({ year: parseInt(SYear), month: parseInt(SMonth) }).then(
            function (transactions) {
                return JSON.parse(JSON.stringify(transactions));
            }
        ).then(
            function (transactions) {
                let totalDays = getTotalDays(SYear, SMonth);

                for (let i = 1; i < totalDays; i++) {
                    let totalLoop = 0;
                    let totalAmountLoop = 0;

                    transactions.map(function (res, j) {
                        if (res.day == i) {
                            totalAmountLoop++;
                            if (res.type === 'Expense') {
                                totalLoop -= res.amount;
                            } else {
                                totalLoop += res.amount;
                            }
                        }
                    });

                    result.push({
                        day: i,
                        total: totalLoop,
                        totalAmount: totalAmountLoop
                    });
                }

                res.send(result);
            }
        )
    }
)

router.get('/WeeklyDate/:period',
    function (req, res, next) {
        if (req.params.period === null || req.params.period === '') {
            res.send(null);
            return;
        }

        let SYear = req.params.period.substring(0, 4);
        let SMonth = req.params.period.substring(4, 6);

        var result = [];

        let totalDays = getTotalDays(SYear, SMonth) - 1;

        let weekPeriod = [];
        let weekLimit = [];

        switch (totalDays) {
            case 28:
                weekPeriod.push(7);
                weekPeriod.push(7);
                weekPeriod.push(7);
                weekPeriod.push(7);
                weekLimit.push(100);
                weekLimit.push(100);
                weekLimit.push(100);
                weekLimit.push(100);
                break;
            case 29:
                weekPeriod.push(8);
                weekPeriod.push(7);
                weekPeriod.push(7);
                weekPeriod.push(7);
                weekLimit.push(100);
                weekLimit.push(100);
                weekLimit.push(100);
                weekLimit.push(100);
                break;
            case 30:
                weekPeriod.push(8);
                weekPeriod.push(8);
                weekPeriod.push(7);
                weekPeriod.push(7);
                weekLimit.push(100);
                weekLimit.push(100);
                weekLimit.push(100);
                weekLimit.push(100);
                break;
            case 31:
                weekPeriod.push(8);
                weekPeriod.push(8);
                weekPeriod.push(8);
                weekPeriod.push(7);
                weekLimit.push(100);
                weekLimit.push(100);
                weekLimit.push(100);
                weekLimit.push(100);
                break;
            default:
                break;
        }

        Transaction.find({ year: parseInt(SYear), month: parseInt(SMonth) }).then(
            function (transactions) {
                return JSON.parse(JSON.stringify(transactions));
            }
        ).then(
            function (transactions) {
                let totalLoop = 0;

                let i = 1;
                for (i = 1; i <= weekPeriod[0]; i++) {
                    transactions.map(function (res, j) {
                        if (res.day == i) {
                            if (res.name === 'Food') {
                                totalLoop += Number(res.amount);
                            }
                        }
                    });
                }

                let percentageStr = 1;

                percentageStr = Math.round(totalLoop / weekLimit[0] * 12, 0);

                if(percentageStr > 12){
                    percentageStr = 12;
                }

                result.push({
                    lastDay: i - 1,
                    total: totalLoop,
                    limit: weekLimit[0],
                    percentage: percentageStr
                });

                totalLoop = 0;

                for (i = weekPeriod[0]; i <= weekPeriod[0] + weekPeriod[1]; i++) {
                    transactions.map(function (res, j) {
                        if (res.day == i) {
                            if (res.name === 'Food') {
                                totalLoop += Number(res.amount);
                            }
                        }
                    });
                }

                percentageStr = Math.round(totalLoop / weekLimit[1] * 12, 0);

                if(percentageStr > 12){
                    percentageStr = 12;
                }

                result.push({
                    lastDay: i - 1,
                    total: totalLoop,
                    limit: weekLimit[1],
                    percentage: percentageStr
                });

                totalLoop = 0;

                for (i = weekPeriod[0] + weekPeriod[1]; i <= weekPeriod[0] + weekPeriod[1] + weekPeriod[2]; i++) {
                    transactions.map(function (res, j) {
                        if (res.day == i) {
                            if (res.name === 'Food') {
                                totalLoop += Number(res.amount);
                            }
                        }
                    });
                }

                percentageStr = Math.round(totalLoop / weekLimit[2] * 12, 0);

                if(percentageStr > 12){
                    percentageStr = 12;
                }

                result.push({
                    lastDay: i - 1,
                    total: totalLoop,
                    limit: weekLimit[2],
                    percentage: percentageStr
                });

                totalLoop = 0;

                for (i = weekPeriod[0] + weekPeriod[1] + weekPeriod[2]; i <= weekPeriod[0] + weekPeriod[1] + weekPeriod[2] + weekPeriod[3]; i++) {
                    transactions.map(function (res, j) {
                        if (res.day == i) {
                            if (res.name === 'Food') {
                                totalLoop += Number(res.amount);
                            }
                        }
                    });
                }

                percentageStr = Math.round(totalLoop / weekLimit[3] * 12, 0);

                if(percentageStr > 12){
                    percentageStr = 12;
                }

                result.push({
                    lastDay: i - 1,
                    total: totalLoop,
                    limit: weekLimit[3],
                    percentage: percentageStr
                });

                return result;
            }
        ).then(
            function () {
                return result = result.sort((a, b) => a.lastDay - b.lastDay);
            }
        ).then(
            function () {
                res.send(result);
            }
        )
    }
)

function getTotalDays(year, month) {
    return new Date(year, month, 0).getDate() + 1;
}

router.get('/ChartDay/:day',
    function (req, res, next) {
        if (req.params.day === null || req.params.day === '') {
            res.send(null);
            return;
        }

        let SYear = req.params.day.substring(0, 4);
        let SMonth = req.params.day.substring(4, 6);
        let SDay = req.params.day.substring(6, 8);

        Transaction.find({ year: parseInt(SYear), month: parseInt(SMonth), day: parseInt(SDay) }).then(
            function (transactions) {
                res.send(transactions);
            }
        )
    }
)

router.post('/Add',
    function (req, res, next) {
        Transaction.create(req.body).then(
            function (transactions) {
                res.send(transactions)
            }
        ).catch(next);
    }
);

router.get('/Total/:period',
    function (req, res, next) {
        if (req.params.period === null || req.params.period === '') {
            res.send(null);
            return;
        }

        let SYear = req.params.period.substring(0, 4);
        let SMonth = req.params.period.substring(4, 6);
        let totalIncome = 0;
        let totalExpense = 0;

        var result = [];

        Transaction.find({ year: parseInt(SYear), month: parseInt(SMonth) }).then(
            function (transactions) {
                return JSON.parse(JSON.stringify(transactions));
            }
        ).then(
            function (transactions) {
                transactions.map(function (res, j) {
                    if (res.type === 'Expense') {
                        totalExpense += Number(res.amount);
                    } else {
                        totalIncome += Number(res.amount);
                    }
                });
            }
        )

        Transaction.find({}).then(
            function (transactions) {
                return JSON.parse(JSON.stringify(transactions));
            }
        ).then(
            function (transactions) {
                let totalAmount = 0;
                let totalAmountPrev = 0;

                transactions.map(function (res, j) {
                    if (Number(res.year) <= Number(SYear) && Number(res.month) <= Number(SMonth)) {
                        if (res.type === 'Expense') {
                            totalAmount -= Number(res.amount);
                        } else {
                            totalAmount += Number(res.amount);
                        }
                    }
                });

                if (Number(SMonth) === 1) {
                    SYear = Number(SYear) - 1;
                    SMonth = 12;
                } else {
                    SMonth = Number(SMonth) - 1;
                }

                transactions.map(function (res, j) {
                    if (Number(res.year) <= Number(SYear) && Number(res.month) <= Number(SMonth)) {
                        if (res.type === 'Expense') {
                            totalAmountPrev -= Number(res.amount);
                        } else {
                            totalAmountPrev += Number(res.amount);
                        }
                    }
                });

                result.push({
                    total: totalAmount,
                    income: totalIncome,
                    expense: totalExpense,
                    compare: Math.round((totalAmount - totalAmountPrev) / Math.abs(totalAmountPrev) * 100, 0)
                });

                res.send(result);
            }
        )
    }
);

router.get('/Monthly/:period',
    function (req, res, next) {
        if (req.params.period === null || req.params.period === '') {
            res.send(null);
            return;
        }

        let nameList = ["Earnings", "Other Income", "Food", "Pet", "Shopping", "Other Expense"];

        let SYear = req.params.period.substring(0, 4);
        let SMonth = req.params.period.substring(4, 6);

        var result = [];

        Promise.all(nameList.map(function (res, k) {
            let totalLoop = 0;

            return Transaction.find({ year: parseInt(SYear), month: parseInt(SMonth), name: res }).then(
                function (transactions) {
                    return JSON.parse(JSON.stringify(transactions));
                }
            ).then(
                function (transactions) {
                    transactions.map(function (res, j) {
                        totalLoop += Number(res.amount);
                    });

                    return transactions;
                }
            ).then(
                function (transactions) {
                    return result.push({
                        name: res,
                        total: totalLoop
                    });
                }
            );
        })).then(
            function () {
                return result = result.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
            }
        ).then(
            function () {
                res.send(result);
            }
        )
    }
);

router.delete('/deleteTran/:_id',
    function (req, res, next) {
        Transaction.findOneAndDelete({ _id: req.params._id }).then(
            function (transactions) {
                res.send(transactions)
            }
        )
    }
);

router.put('/updateTran/:_id',
    function (req, res, next) {
        Transaction.findOneAndUpdate({ _id: req.params._id }, req.body).then(
            function (transactions) {
                Transaction.findOne({ _id: req.params._id }).then(
                    function (transactions) {
                        res.send(transactions)
                    }
                )
            }
        )
    }
);

router.get('/Search/:type/:period',
    function (req, res, next) {
        if (req.params.period === null || req.params.period === '') {
            res.send(null);
            return;
        }

        let SYear = req.params.period.substring(0, 4);
        let SMonth = req.params.period.substring(4, 6);

        let typeList = ["Expense", "Income"];
        let nameList = ["Earnings", "Other Income", "Food", "Pet", "Shopping", "Other Expense"];

        var result = [];

        if (typeList.includes(req.params.type)) {
            Transaction.find({ year: parseInt(SYear), month: parseInt(SMonth), type: req.params.type }).then(
                function (transactions) {
                    return JSON.parse(JSON.stringify(transactions));
                }
            ).then(
                function (transactions) {
                    return transactions.map(function (res, j) {
                        result.push({
                            day: res.day,
                            amount: res.amount,
                            description: res.name + " (" + res.description + ")"
                        });
                    });
                }
            ).then(
                function (transactions) {
                    res.send(result);
                }
            );
        } else if (nameList.includes(req.params.type)) {
            Transaction.find({ year: parseInt(SYear), month: parseInt(SMonth), name: req.params.type }).then(
                function (transactions) {
                    return JSON.parse(JSON.stringify(transactions));
                }
            ).then(
                function (transactions) {
                    return transactions.map(function (res, j) {
                        result.push({
                            day: res.day,
                            amount: res.amount,
                            description: res.name + "(" + res.description + ")"
                        });
                    });
                }
            ).then(
                function (transactions) {
                    res.send(result);
                }
            );
        } else {
            Transaction.find({ year: parseInt(SYear), month: parseInt(SMonth), description: { '$regex': req.params.type, '$options': 'i' } }).then(
                function (transactions) {
                    return JSON.parse(JSON.stringify(transactions));
                }
            ).then(
                function (transactions) {
                    return transactions.map(function (res, j) {
                        result.push({
                            day: res.day,
                            amount: res.amount,
                            description: res.name + "(" + res.description + ")"
                        });
                    });
                }
            ).then(
                function (transactions) {
                    res.send(result);
                }
            );
        }
    }
);

module.exports = router;