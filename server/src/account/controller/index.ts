import { Router } from 'express'
import add from './add'
import all from './all'
import search from './search'

const accountRoutes = function(router: Router) {
  router.post('/account/add', add)
  router.get('/account/all', all)
  router.get('/account/search', search)
}
export {
  accountRoutes
}
