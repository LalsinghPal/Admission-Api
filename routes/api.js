const express = require("express")
const Usercontroller =require("../controller/Usercontroller")
const Teachercontroller = require("../controller/Teachercontroller")
const  Tendercontroller= require("../controller/Tendercontroller")
const route = express.Router()


//route
//http://localhost:5000/api/display

route.get('/display',Teachercontroller.display)

//usercontroller api
route.post('/registerUser',Usercontroller.registerUser)
route.post('/loginUser',Usercontroller.loginUser)
route.get('/getAllUser',Usercontroller.getAllUser)
route.get('/logout',Usercontroller.logout)
route.post('/delete/:id',Usercontroller.delete)


//tendercontroller
route.post('/Tender_insert',Tendercontroller.Tender_insert)
route.get('/tenderdisplay',Tendercontroller.tenderdisplay)
route.post('/delete/:id',Tendercontroller.delete)
route.get('/getSingleUser/:id',Tendercontroller.getSingleUser)




module.exports=route

