//Aplicações HTTP => APIs
import http from 'node:http';
import { Http2ServerRequest } from 'node:http2';
import { json } from './middlewares/json.js';
import { routes } from './middlewares/routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';


//Common JS => require //Não usa tanto mais
//Esmodules => import/export

// - Criar usuários
// - Listagem usuários
// - Edição de usuários
// - Remoção de usuários

// - HTTP
//     - Método HTTP
//     - URL

// GET, POST, PUT, PATCH, DELETE

// GET: Buscar uma informação do back-end
// POST: criar uma informação no back-end
// PUT: Atualizar um recurso no back-end
// PATCH: Atualizar uma informação específica de um recurso no back-end
// DELETE: Deletar um recurso no back-end

// GET /users => Buscando usuários do back-end
// POST /users => Criar um usuário no back-end

// Stateful != Stateless


//JSON - JavaScript Object Notation

//Cabeçalho (Requisição/Resposta) => Metadados

// HTTP Status Code


// Query Parameters: URL Stateful -> filtros, paginação, não-obrigatórios
// http://localhost:3333/users?userId=1


// Route Parameters: Identificação de recurso
// GET http://localhost:3333/users/1
// DELETE http://localhost:3333/users/1


// Request Body: Envio de informações de um formulário
// POST http://localhost:3333/users


// Edição e remoção do usuário



const server = http.createServer(async(request, response) => {
    const { method, url } = request


    await json(request, response)
    
    const route = routes.find(route => {
        return route.method == method && route.path.test(url)
    })

    if (route) {
        const routeParams = request.url.match(route.path)

        // console.log()
        const { query, ...params } = routeParams.groups

        request.params = params
        request.query = query ? extractQueryParams(query) : {}


        return route.handler(request, response)
    }

    return response.writeHead(404).end()

})

server.listen(3333) //localhost: 3333