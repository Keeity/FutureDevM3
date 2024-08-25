const jwt = require("jsonwebtoken") //importa o jwt
const PermissionRole = require("../models/PermissionRole")
const Permission = require("../models/Permission")

// permissions vai ser um array de permissões. Ex: ['criar_usuario', 'ler_usuario']
function hasPermission(permissions){
    return async (request, response, next) => { //é responsabilidade da rota retornar a resposta. next é o poder de decisão, se ele chamar o next, ele passa para o próximo middleware. Se ele não chamar, ele para a execução.
//verificar se tem token
        if(!request.headers.authorization){
            return response.status(401).send("Token não fornecido!") //401 é não autorizado
        }
//guarda o token. 
        const token = request.headers.authorization
// Desestruturar o token e colocar na variável decoded. verificar se usuário está autorizado.
        const decoded = jwt.verify(token, process.env.SECRET_JWT)
        request.payload = decoded //guarda o decoded no request.payload

        //agora vai ver qual permissão tem o usuário
        try {

            const roles = await PermissionRole.findAll({
                //com map, pega cada roleid da tabela permissionsRoles.  Ex:  where: roleId: 4, where: roleId: 5...
                where: {
                    roleId: request.payload.roles.map((role) => role.id)
                },
                attributes: ['permissionId'], //só pede a permissionId
                include: [{model: Permission}] //inclui a tabela Permission - traz os dados da permissão
            })
//Pega a role e pesquisa se tem pelo menos uma permissão que contem o array passado. 
            const existPermission = roles.some((role) => {
                const hasPermission = role.permissions.some((permissao) => {
                    return permissions.includes(permissao.description)
                })

                return hasPermission
            })

            if(!existPermission){
                return response.status(401).send("Você não tem permissão para acesar!")
            }

            next()
        } catch (error) {
            console.log(error)
            return response.status(401).send({
                message: "Autenticação Falhou",
                cause: error.message})
        }
    }
}

module.exports = { hasPermission }
