require('dotenv').config()
const {admins} = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const auth_singup =  async(req, res)=>{
  
    try {
        let {name, email, password, role} = req.body;
        let userexist = await admins.findAll({where:{email}});
        if(!name || !email || !password || !role){
            return res.status(401).send({msg:"please enter all the credentials"})
        }
        
        else if(userexist.length){
            return res.status(409).send({msg:'User already exists'})
        }
        else {
            bcrypt.hash(password, +process.env.saltRound, async function(err, hash) {
                if(err){
                    res.status(500).send({msg:"Internal Server Error"});
                }
                else if(hash){
                    let dealer = admins.create({name, email, password:hash, role});
                    res.status(201).send({msg:'user is created', email, password, name})
                }
            });
        }
        
    } catch (error) {
        res.status(500).send({msg:"Internal Server Error"})
    }
}

const auth_login  = async (req, res) => {
    try {
      const{name, password, email} = req.body;
      let { password: hash, _id, role } = await admins.findOne({where:{email}});
      bcrypt.compare(password, hash, function (err, result) {
        // result == false
        if (err)
          return res.status(400).send({
            msg: "login details are wrong or not able to compare the hash",
          });
        if (result)
          return res.status(200).send({
            msg: "user is logged in ",
            token: jwt.sign({ role }, process.env.jwtSecret),
          });
      });
    } catch (error) {
      res.status(400).send({ msg: "not able to login" });
    }
  };

module.exports = {auth_singup, auth_login};