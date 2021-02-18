const Supplies = require('../models/supplies');

async function getAllSuppliess(req){
  let {pagination}= req.body
  return await Supplies.find().skip(pagination.from).limit(pagination.limit)
}

async function getSuppliesById(id)
{
  return await Supplies.find({_id: id})
}


async function save(body){
  let supplie = new Supplies({
    "description": body.description
  })
  return await supplie.save()
}


async function deleted(body){
  
}

module.exports ={
  getAllSuppliess,
  save,
  getSuppliesById
}