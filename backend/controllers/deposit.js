const Deposits = require('../models/deposit');
const uuid4 = require('uuid4')


async function getDeposit(column, street){
  return await Deposits.find({street: street,
    column: column,
    deleted_at : null})
}


async function save(body){
  let count = await validate(body.street, body.column)
  if(count===0){
    if(Array.isArray(body.cards) && body.cards.length > 0 ){
      for(let card of body.cards){
        card.id = uuid4()
      }
    }
    let supplie = new Deposits({
      "street": body.street,
      "column": body.column,
      "cards": body.cards,
      "deleted_at":null
    })
    return await supplie.save()
  }
  return 0
}


async function validate(street, column){
  return await Deposits.count({street: street,
    column: column,
    deleted_at : null})
}

async function updateCard(body, id){
  let data = await Deposits.findOne({_id: id,
    deleted_at : null})
    console.log(data.cards)
    let ok = true
    for(let card of data.cards){
      if(card.column === body.column){
        ok = false
      }
      if(card.id === body.id){
        card.column = body.column
      }
    }
    if(ok){
      return await Deposits.updateOne({_id: id, deleted_at:null}, data)
    }
    return ok
}



module.exports={
  getDeposit,
  save,
  updateCard
}
