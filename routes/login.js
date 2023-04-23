const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee.model')
const Manager = require('../models/manager.model')

router.post('/employeelogin', async (req, res) => {
    let user;
    try {
        const {UserName,Password}=req.body;
        try{
            user = await Employee.findOne({UserName:UserName});
        }
        catch(err){
            console.log(err);
        }
        if(!user){
            throw new Error("User does not exist");
        }

        const isPasswordCorrect = user.comparePassword(Password) ;

        if(isPasswordCorrect==false){
            console.log('Password is not correct')
            throw new Error("Password is not correct");
        }

        // creating token
        let tokenData={
            id:user.EmployeeID,
            username:user.UserName,
            position: "0" // 0 for employee
        };

        const token=await jwt.sign(tokenData,"secret",{expiresIn:"1h"});

        res.status(200).json({
            status:true,
            success:"SendData",
            token:token,
        })


    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/managerlogin', async (req, res) => {
    let user;
    try {
        const {UserName,Password}=req.body;
        try{
            user = await Manager.findOne({UserName:UserName});
        }
        catch(err){
            console.log(err);
        }
        if(!user){
            throw new Error("User does not exist");
        }

        const isPasswordCorrect = user.comparePassword(Password) ;

        if(isPasswordCorrect==false){
            console.log('Password is not correct')
            throw new Error("Password is not correct");
        }

        // creating token
        let tokenData={
            id:user.ManagerID,
            username:user.UserName,
            position: "1" // 1 for manager
        };

        const token=await jwt.sign(tokenData,"secret",{expiresIn:"1h"});

        res.status(200).json({
            status:true,
            success:"SendData",
            token:token,
        })


    } catch (error) {
        console.log(error);
        next(error);
    }
});


module.exports = router;