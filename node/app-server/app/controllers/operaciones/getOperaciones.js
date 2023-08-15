const Operacion = require('../../models/operacion')
const { checkQueryString, getItems } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { getUserIdFromToken, findUserById, findUserFullById } = require('../auth/helpers')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getOperaciones = async (req, res) => {
  try {

    /* User */
    const tokenEncrypted = req.headers.authorization
    .replace('Bearer ', '')
    .trim()
    let userId = await getUserIdFromToken(tokenEncrypted)
    userId = await isIDGood(userId)
    const user = await findUserById(userId)
    // req.user = user;
    console.log(user)

    let query = await checkQueryString(req.query)
    
    /* Create query by role */
    if (user.role=='COMANDO') {
      query = {}
      query.$and = [];
      query.$and.push({
        'nombre': new RegExp(req.query.filter, 'i')
      })/*
      query.$and.push({
        'user.fuerza': user.fuerza
      })*/
      /*query = {
        $and: [
          {
            'user.fuerza': user.fuerza
          }
        ]
      }*/
    } else if (user.role=='OPERACIONES') {
      query = {}
      query.$and = [];
      /*query.$and.push({
        'nombre': new RegExp(req.query.filter, 'i')
      })*/
      query.$and.push({
        'user.fuerza': user.fuerza
      })
      query.$and.push({
        'user.division': user.division
      })
      /*
      query = {
        $and: [
          {
            'user.fuerza': user.fuerza
          },
          {
            'user.division': user.division
          }
        ]
      }*/
    } else if (user.role=='PATRULLA') {
      query = {}
      query.$and = [];
      /*query.$and.push({
        'nombre': new RegExp(req.query.filter, 'i')
      })*/
      query.$and.push({
        'user': userId
      })/*
      query = {
        $and: [
          {
            'user': userId
          }
        ]
      }*/
    }

    console.log(req.query)
    console.log(query)

    let result = await getItems(req, Operacion, query)
    console.log(result)

    await Promise.all(
      result.docs.map(async element => {
        element.user = await findUserFullById(element.user)
        console.log(element)
        //return element
      })
    )

    result.docs.forEach(element => { 
      // element.user = await findUserById(element.user)
      console.log(element)
    });

    res.status(200).json(result)
    //const query = await checkQueryString(req.query)
    //res.status(200).json(await getItems(req, Operacion, query))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getOperaciones }
