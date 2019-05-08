export default function ({ store, redirect }) {
  
  if (store.state.auth.authToken) {
    store.$axios.get('/auth/role').then((data) => {

      const response = data[0]

      if (response.data.success) {
        if (!response.data.role || response.data.role !== 'admin') {
          return redirect('/')
        } 
      }
    }).catch((err) => {
      console.error(err)
      return redirect('/')
    })

  } else {
    return redirect('/login')
  }

}