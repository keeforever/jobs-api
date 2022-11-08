const {StatusCodes} = require('http-status-codes')

const notFound=(req,res)=>{
 res.status(StatusCodes.BAD_REQUEST).send('No Routes !!!')
}

module.exports = notFound