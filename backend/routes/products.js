const express = require('express');
const fs = require('fs')
const uuid4 = require('uuid4')

const routes = express.Router()
const { pagination } = require('../middlewares/pagination');
const ctrProducts = require('../controllers/products')
const util = require('../controllers/util')

routes.get('/:id', async (req, resp)=>{
  try {
    let {id}= req.params
    let data = await ctrProducts.getById(id)
    resp.status(200).send(util.getSuccessMsg(data, 200))
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error))
  }
})

routes.get('/', pagination, async (req, resp)=>{
  try {
    let data = await ctrProducts.getAll(req)
    resp.status(200).send(util.getSuccessMsg(data, 200))
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error))
  }
})

routes.post('/', async (req, resp)=>{
  let {body} = req
  try {
    let {mimetype}= req.files.files
    let extencion = mimetype.split('/')
    let nameImage = `${uuid4()}.${extencion[1]}`
    fs.writeFileSync(`./images/${nameImage}`,req.files.files.data)
    let data = await ctrProducts.save(body, nameImage)
    resp.status(200).send(util.getSuccessMsg(data, 201))
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error))
  }
})

routes.put('/:id', async (req, resp)=>{
  let {body} = req
  let {id}= req.params
  try {
    let data = await ctrProducts.update(body, id)
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
    let data = await ctrProducts.deleted(id)
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