const express = require('express');
const router = express.Router();
const Department = require('../models/departments.model')
const Stat = require('../models/stats.model')
const cron = require('node-cron')
const Employee = require('../models/employee.model')


// Initialization
async function StatInitialize() {
    const check = await Stat.find({});
    if(!check)
        await Stat.create({});
}
StatInitialize();

// Attendance Controller

async function AttendanceController(){
    await Employee.updateMany({},{$push:{"AbsentDates":new Date()}})     // date is added to absent array
}

cron.schedule('0 1 0 * * *', function(){   // A trigger to execute at 00:01 everyday. 
    AttendanceController() ;
});


// const def_attendance = async()=>{
//     const employee = await Employee.find({});
//     for(let e of employee)
//     {
//         e.AbsentDates.push(Date.now());
//     }   
// };

// a few random routes
// -----------------------------------------------------------------------


router.get('/', async (req,res)=>{     // home page
    try{
        res.send('Hello')
    }catch(err){
        res.status(500).send(err.message)
    }
}) ;

router.get('/department', async (req,res)=>{    // show New department
    try{
        res.send(Department)
    }catch(err){
        res.status(500).send(err.message)
    }
}) ;
 
// router.post('/attendance/', async (req, res)=>{      // Absent date will be added to employee's absent list
//     try{
//         Attendance.findOne({EmployeeID:req.params.id}).then((doc)=>{
//             doc.AbsentThisMonth.push(Date.now());
//             doc.save() ;
//         })
//         res.json(doc)
//     }
//     catch(err){
//         res.json(err)
//     }
// });


// -------------------------------------------------------------------------


module.exports = router