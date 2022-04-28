const express = require('express')
const router = express.Router()
//const authentification = require('../controller/verifyToken')
const { getTransactions, addTransaction, deleteTransaction } = require('../controller/transaction')

router.get('/api/transaction',  getTransactions)
router.post('/api/transaction',  addTransaction)
router.delete('/api/transaction/:id',  deleteTransaction)



module.exports = router