import { request } from 'node:http';
import { Database } from './config/database.js';
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js';
import multer from 'multer';
import multerConfig from './config/multer.js'

const upload = multer(multerConfig)



const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (request, response) => {
            const { search } = request.query

            const tasks = database.select('tasks', search ? {
                id: search,
                title: search,
            } : null)

            return response.end(JSON.stringify(tasks))
        }
    },

    //Aqui
    {
        method: 'POST',
        path: buildRoutePath('/tasks-pdf'),
        handler: (request, response) => {
             console.log(request)
           const { title, description } = request.body

            const task = {
                id: randomUUID(),
                title: request.title,
                description: request.description,
            }

            database.insert('tasks', task)
            return response.writeHead(201).end()

        }
    },
    //aqui
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (request, response) => {
           const { title, description } = request.body
           console.log(request.body)

            const task = {
                id: randomUUID(),
                title: request.title,
                description: request.description,
            }

            database.insert('tasks', task)
            return response.writeHead(201).end()

        }
    },

    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),///groups/:groupId
        handler: (request, response) => {

            const id  = request.params.id

            database.delete('tasks', id)

            return response.writeHead(204).end()
        },
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),///groups/:groupId
        handler: (request, response) => {

            const { title, description, completed_at } = request.body
            const id  = request.params.id

            console.log(request)
           
            database.update('tasks', id, {
                title,
                description,
                completed_at,
                updated_at: new Date()
            })

            return response.writeHead(204).end()
        },
    }
]