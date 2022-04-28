const Transaction = require('../model/Transaction')

//Get all the transactions
 const getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find({ createdBy: req.user.userId }).sort('createdAt');
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

const addTransaction = async (req, res, next) => {
    try {
        req.body.createdBy = req.user.userId
        const { text, amount } = req.body
        const transaction = await Transaction.create(req.body)
        return res.status(201).json({
            success: true, 
            data: transaction
        })
    } catch (err) {
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message)
            return res.status(400).json({
                success: false,
                error: messages
            })
        }else{
            return res.status(500).json({
                success: false,
                error: 'Server Errorrrrrr'
            })
        }
    }
}

const deleteTransaction = async (req, res, next) => {
   try {
       const { body: { text, amount }, user: { userId }, params: { id: transactionId } }= req
       const transaction = await Transaction.findByIdAndRemove({ _id: transactionId, createdBy: userId } )

       if(!transaction){
           return res.status(404).json({
               success: false,
               error: 'No transaction found'
           })
        }res.status(200).json({
            success: true,
            data: {}
        })
   } catch (error) {
    return res.status(500).json({
        success: false,
        error: 'Server Error'
    })
   }

}


module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction
}