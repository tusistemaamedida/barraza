const express = require('express');

const routes = express.Router()
const { pagination } = require('../middlewares/pagination');
const ctrSupplies = require('../controllers/supplies')

routes.get('/:id', async (req, resp)=>{
  try {
    let {id}= req.params
    let data = await ctrSupplies.getSuppliesById(id)
    resp.status(200).send({data:data})
  } catch (error) {
    console.log(error)
    resp.status(500).send({msg:"there is a problem"})
  }
})

routes.get('/', pagination, async (req, resp)=>{
  try {
    let data = await ctrSupplies.getAllSuppliess(req)
    resp.status(200).send({data:data})
  } catch (error) {
    console.log(error)
    resp.status(500).send({msg:"there is a problem"})
  }
})

routes.post('/', async (req, resp)=>{
  let {body} = req
  try {
    let data = await ctrSupplies.save(body)
    resp.status(201).send(data)
  } catch (error) {
    console.log(error)
    resp.status(500).send({msg:"there is a problem"})
  }
})


module.exports = routes