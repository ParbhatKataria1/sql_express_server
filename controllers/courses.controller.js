
const {courses} = require('../models');

const courses_post = async(req, res)=>{
    try {
        const {name} = req.body;
        const data = await courses.create({name});
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({isError:true, error})
    }
}

module.exports = {courses_post};