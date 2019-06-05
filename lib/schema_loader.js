'use strict'

const fs = require('fs')
const path = require('path')

const express = require('express');
const router = express.Router();
const empty_body = require('../api/middleware/empty_body')

const schema_loader = (dir) => {

  return new Promise((resolve, reject) => {

    fs.readdir(dir, (err, files) => {

      if (err)
        return reject(err)

      let schemas = files.filter(el => /\.js$/.test(el))
      schemas = schemas.map((el) => {
        return dir + '/' + el
      })

      return resolve(schemas)
    })

  })
}

const routes_builder = (app, route_config, name) => {

  let prefix = route_config.prefix

  const actions = Object.keys(route_config.actions)

  actions.forEach((action) => {

    switch (action) {
      case "create":
        if (route_config.actions[action].alias) {
          router.post(prefix + '/' + name )
        }
        break;
    }

  })

}

const schemas_instancer = (schemas, app) => {

  return new Promise((resolve, reject) => {

    app.set('schemas', new Map())

    schemas.forEach((el) => {
      const key = path.basename(el, '.js')
      const schema = require(el)
      app.get('schemas').set(key, schema)
      routes_builder(app, schema.router, schema.name)
    })

    resolve(true)

  })
}


module.exports = { schema_loader, schemas_instancer }
