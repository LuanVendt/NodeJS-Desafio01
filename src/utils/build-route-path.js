// /users/:id
export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g //regex
    const pathWhitParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')


    const pathRexex = new RegExp(`^${pathWhitParams}(?<query>\\?(.*))?$`)

    return pathRexex
}