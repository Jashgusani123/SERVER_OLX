

const ErrorHandle = async(statusCode , error , res)=>{
 return res.status(statusCode).json({
        success:false,
        error:error
    })
}

export {ErrorHandle}