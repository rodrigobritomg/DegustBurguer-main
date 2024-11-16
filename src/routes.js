import { Router } from 'express'

const routes = new Router()

routes.get('/', (request, response) => {
    return response.status(200).json({ message: 'Olá Mundo!' })
})

export default routes