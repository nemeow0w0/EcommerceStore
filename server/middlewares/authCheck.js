const jwt = require('jsonwebtoken')
const prisma = require('../config/prisma')


exports.authCheck =  async (req, res, next) => {
    try {
        // code
        //console.log("👉 authCheck เริ่มทำงาน")
        const headerToken = req.headers.authorization
        if(!headerToken){
            return res.status(401).json({ message: " No Token Authorization"})
        }
        const token = headerToken.split(" ")[1]


        const decoded = jwt.verify(token,process.env.SECRET)
        req.user = decoded;
        //console.log("✅ authCheck ผ่าน:", decoded)

        const user = await prisma.user.findFirst({
            where:{
                email: req.user.email
            }
        })
        if(!user.enabled){
            return res.status(400).json({ message: 'this account cannot access'})
        }
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: " Token Invalid"})
    }
}


exports.adminCheck = async(req, res, next ) => {
    try {
        // code
        const { email } = req.user
        //console.log('admin check',email)

        const adminUser = await prisma.user.findFirst({
            where:{ email:email}
        })
        if(!adminUser || adminUser.role !== 'admin'){
            return res.status(403).json({ message: 'Acess Denied Admin Only'})
        }
        next(); // ไปต่อ
    } catch (err) {
        console.log(500).json({ message:" Error Admin access denied"})
    }
}