'use strict'

module.exports = {
  name: 'user',
  router: {
    prefix: 'api',
    admin_side: true,
    admin_prefix: 'manage',

    controller: __dirname + '/user/api/controller.js',
    admin_controller: __dirname + '/user/api/admin_controller.js',

    actions:{
      create: {
        alias: 'register',
        role: 'guest'
      },
      update: {
        role: 'self'
      }
    },

    admin_actions: {
      create: {
        role: 'admin'
      },
      update: {
        role: 'admin'
      },
      'delete': {
        role: 'admin'
      },
    }
  }

}
