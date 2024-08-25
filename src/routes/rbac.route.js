const { Router } = require('express') //utiliza express
const RbacController = require("../controllers/RbacController")

const RbacRouter = new Router()

RbacRouter.get("/listPermissions", RbacController.listPermissions)  //no ROuter, não precisa colocar () após a função, pois dá a função ao Router e ele que é responsável por executar e passar o req res
RbacRouter.get("/listRoles", RbacController.listRoles)
RbacRouter.post("/createOnePermission", RbacController.createOnePermission)
RbacRouter.post("/createOneRole", RbacController.createOneRole)
RbacRouter.post("/addPermissionToRole", RbacController.addPermissionToRole)
RbacRouter.post("/addRoleToUser", RbacController.addRoleToUser)
RbacRouter.get("/listPermissionsByRole/:id", RbacController.listPermissionsByRole)

module.exports = RbacRouter