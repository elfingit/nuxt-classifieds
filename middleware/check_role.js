export default function ({ store, redirect }) {

  const debug = require('debug')('client:check_role')
  debug.log = console.log.bind(console)

  if (store.state.auth.authToken) {
    store.$axios.get('/auth/role').then((data) => {

      if (data.data) {

        const response = data.data

        if (response.success) {
          if (!response.role || response.role !== 'admin') {
            return redirect('/')
          }
        }

      } else {
        return redirect('/')
      }
    }).catch((err) => {
      debug(err)
      return redirect('/')
    })

  } else {
    return redirect('/login')
  }

}
