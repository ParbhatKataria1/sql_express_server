const {sequelize} = require('./models');

const express = require('express');
const { coursesPath } = require('./routes/courses.route');
const { authPath } = require('./routes/auth.route');
const { studentsPath } = require('./routes/student.route');


const app = express();
app.use(express.json());


app.use('/auth', authPath);

app.use('/api/courses', coursesPath)

app.use('/api/students', studentsPath)




sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log('server started')
    })
})