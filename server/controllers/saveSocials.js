const UserModel = require("../models/user");
const jwt = require('jsonwebtoken');

const saveSocials = async(req, res) => {
    const {tokenMail, socials} = req.body;

    try {
        const decodedTokenMail = jwt.verify(tokenMail, process.env.SECRET_JWT);
        const email = decodedTokenMail.email;
        const user = await UserModel.findOne({email: email});
        user.socialMedia = socials;
        await user.save();

        return res.json({
            message: 'Socials saved', 
            status: 'success'
        })

    } catch (error) {
        return res.json({
            error: error.message,
            status: 'error'
        })
    }
}

module.exports = { saveSocials }