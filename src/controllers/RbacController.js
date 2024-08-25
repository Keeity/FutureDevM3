const Permission = require("../models/Permission")
const PermissionRole = require("../models/PermissionRole")
const Role = require("../models/Role")
const User = require("../models/User")
const UserRole = require("../models/UserRole")

class RbacController {
  //cria rotas para listar permissões e papeis
  async listPermissions(req, res) {
    //req pega os dados e res retorna algo ao usuário
    const data = await Permission.findAll(); // PROCURA TODAS
    return res.status(200).send(data);
  }

  async listRoles(req, res) {
    const data = await Role.findAll();
    return res.status(200).send(data);
  }

  async createOnePermission(req, res) {
    //só precisa da descrição para criar uma permissão
    try {
      const dados = req.body;
      if (!dados.description) {
        return res.status(400).send("A descrição é obrigatória");
      }
      const permissionExists = await Permission.findOne({
        where: { description: dados.description },
      });
      if (permissionExists) {
        return res
          .status(400) //algum erro de negação
          .send("Já existe uma permissão com essa descrição!");
      }
 //se houver descrição e á não estiver criada, CRIA UMA NOVA PERMISSÃO
      const novo = await Permission.create(dados);
      return res.status(201).send(novo); //criou algo novo
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Algo deu errado!");
    }
  }

  async createOneRole(req, res) {
    //só precisa da descrição para criar um papel
    try {
      const dados = req.body;
      if (!dados.description) {
        return res.status(400).send("A descrição é obrigatória");
      }
      const roleExists = await Role.findOne({
        where: { description: dados.description },
      });
      if (roleExists) {
        return res
          .status(400)
          .send("Já existe um papel com essa descrição!");
      }
 //se houver descrição e á não estiver criada, CRIA UM NOVo papel
      const novo = await Role.create(dados);
      return res.status(201).send(novo);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Algo deu errado!");
    }
  }
  async listPermissionsByRole(req, res){ //"/listPermissionsByRole/:id"
    try {
        const {id} = req.params

        const role = await Role.findOne({ //procura um Role e faz o relacionamento com a permission por id
            where: {id: id},
            include: [{model: Permission}] //é um array, com um objeto, que traz atributo model e puxa a tabela Permission
        })

        //poderia fazer com findByPk
        // const role = await Role.findByPk(id, {
        //     include: [{model: Permission}]
        // })

        if(!role){
            return res.status(404).send("Função não encontrada!")
        }

        return res.status(200).send(role)
    } catch (error){
        console.log(error.message)
        return res.status(500).send("Algo deu errado!")
    }
}
async addPermissionToRole(req, res){ 
    try {
        const {permissionId, roleId} = req.body

        if(!permissionId || !roleId){
            return res.status(400).send("O id da permissão e/ou role é obrigatório!")
        }

        const roleExists = await Role.findByPk(roleId)
        const permissionExists = await Permission.findByPk(permissionId)

        if(!roleExists){
            return res.status(400).send("Papel não encontrado!")
        }

        if(!permissionExists){
            return res.status(400).send("Permissão não encontrada!")
        }

        // 1ª forma
        const permissionRoleNovo = await PermissionRole.create({
            permissionId: permissionId, //podia ser apenas permissionId (porque nomes são iguais)
            roleId: roleId
        })

        // 2ª forma - pega a role que existe e adiciona a permissão que existe. quem faz é o sequelize com essa addPermissions criada automaticamente
        //await roleExists.addPermissions(permissionExists)

        return res.status(201).send(permissionRoleNovo)
    } catch (error){
        console.log(error.message)
        return res.status(500).send("Algo deu errado!")
    }
}
async addRoleToUser(req, res){
    try {
        const {userId, roleId} = req.body

        if(!userId || !roleId){
            return res.status(400).send("O id do usuário e/ou role é obrigatório!")
        }

        const userExists = await User.findByPk(userId)
        const roleExists = await Role.findByPk(roleId)

        if(!roleExists){
            return res.status(400).send("Papel não encontrado!")
        }

        if(!userExists){
            return res.status(400).send("Usuário não encontrado!")
        }

        const userRoleNovo = await UserRole.create({
            roleId: roleId,
            userId: userId
        })

        return res.status(201).send(userRoleNovo)
    } catch (error){
        console.log(error.message)
        return res.status(500).send("Algo deu errado!")
    }
}
}

module.exports = new RbacController()  //só aqui é criado o objeto e aí pdoe ser usado e importadoe m outros locais