

module.exports ={
  pagination: (req, resp, next)=>{
    let {query} = req
    let from = query.from? query.from :  0;
    let limit = query.limit? query.limit: 15;
    req.body.pagination = {
      from : parseInt(from),
      limit: parseInt(limit)
    }
    next()
  }
}