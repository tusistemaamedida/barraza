const express = require('express');

const routes = express.Router()
const { pagination } = require('../middlewares/pagination');
const ctrSupplies = require('../controllers/supplies')
const util = require('../controllers/util')

routes.get('/:id', async (req, resp)=>{
  try {
    let {id}= req.params
    let data = await ctrSupplies.getSuppliesById(id)
    resp.status(200).send(util.getSuccessMsg(data, 200))
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error))
  }
})

routes.get('/', pagination, async (req, resp)=>{
  try {
    let data = await ctrSupplies.getAllSuppliess(req)
    resp.status(200).send(util.getSuccessMsg(data, 200))
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error))
  }
})

routes.post('/', async (req, resp)=>{
  let {body} = req
  try {
    let data = await ctrSupplies.save(body)
    resp.status(200).send(util.getSuccessMsg(data, 201))
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error))
  }
})

routes.put('/:id', async (req, resp)=>{
  let {body} = req
  let {id}= req.params
  try {
    let data = await ctrSupplies.update(body, id)
    console.log(data)
    if(data.nModified=== 0){
      return resp.status(200).send(util.getSuccessMsg("Register not found", 200))
    }
      return resp.status(200).send(util.getSuccessMsg("Register updated", 201))
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error))
  }
})

routes.delete('/:id', async (req, resp)=>{
  let {id}= req.params
  try {
    let data = await ctrSupplies.deleted(id)
    console.log(data)
    if(data.nModified=== 0){
      return resp.status(200).send(util.getSuccessMsg("Register not found", 200))
    }
    return resp.status(200).send(util.getSuccessMsg("Register deleted", 201))
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error))
  }
})


module.exports = routes