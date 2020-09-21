import { Router } from 'express'
import npAuth from './npAuth'

const npAuthRoutes = function (router: Router) {
  router.post('/npauth/auth', npAuth)
}
export {
  npAuthRoutes,
}
