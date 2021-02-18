const moment = require('moment');
const Supplies = require('../models/supplies');

async function getAllSuppliess(req){
  let {pagination}= req.body
  return await Supplies.find({deleted_at: null}).skip(pagination.from).limit(pagination.limit)
}

async function getSuppliesById(id)
{
  return await Supplies.find({_id: id, deleted_at : null})
}

async function save(body){
  let supplie = new Supplies({
    "description": body.description
  })
  return await supplie.save()
}

async function update(body, id){
return await Supplies.updateOne({_id: id, deleted_at:null}, body)
}

async function deleted(id){
  return await Supplies.updateOne({_id: id}, {deleted_at: moment().format("YYYY-MM-DD hh:mm:ss")})
}

module.exports ={
  getAllSuppliess,
  save,
  getSuppliesById,
  update,
  deleted
}