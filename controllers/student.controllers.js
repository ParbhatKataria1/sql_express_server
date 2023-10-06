const { students, courses } = require("../models");
const students_get = async (req, res) => {
  try {
    students.belongsTo(courses);
    const data = await students.findAll({ include: courses });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ isError: true, error });
  }
};

const students_post = async (req, res) => {
  try {
    const { name, email, age, courseID } = req.body;
    const data = await students.create({ name, email, age, courseID });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ isError: true, error });
  }
};

const students_put = async (req, res) => {
  try {
    const data = await students.upsert({
      id: req.params.id,
      ...req.body,
    });
    res.status(200).json({
      isError: false,
      data,
    });
  } catch (error) {
    res.status(400).send({ isError: true, error });
  }
};

const students_delete = async (req, res) => {
  try {
    const data = await students.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      isError: false,
      data,
    });
  } catch (error) {
    res.status(400).send({ isError: true, error });
  }
};

module.exports = { students_get, students_post, students_put, students_delete };
