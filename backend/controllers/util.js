const getResponseHeaders = () => {
    return {
        'Access-Control-Allow-Origin': '*'
    }
}

exports.getErrorMsg = (error) =>{
    return  {
        statusCode: error.statusCode ? error.statusCode : 500,
        headers: getResponseHeaders(),
        body: {
            error: error.name ? error.name : "Exception",
            message: error.message ? error.message : "Unknown error"
        }
    }
}

exports.getSuccessMsg = (data, code = 200) => {
    return  {
        statusCode: code,
        headers: getResponseHeaders(),
        body: data
    }
}