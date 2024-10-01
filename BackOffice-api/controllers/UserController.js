const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { name } = require('body-parser');


dotenv.config();



module.exports = {
    signIn: async (req, res) => {
        try{
            const username = req.body.username;
            const password = req.body.password;

            const user = await prisma.user.findFirst({
                select: {
                    id: true,
                    name: true,
                    role: true
                },
                where:{
                    username: username,
                    password: password,
                    status: 'use'
                }
            })
            if (user != null){
                const key = process.env.SECRET_KEY;
                const token = jwt.sign(user, key, { expiresIn: '30d'});

                return res.send({ token: token, name: user.name, id: user.id })
            }else{
                return res.status(401).send();
            }
        }catch(e){
            return res.status(500).send({ error : e.message });
        }
    }
}