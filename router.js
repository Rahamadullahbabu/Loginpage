var express = require("express");
var router = express.Router();

const  credential = {
    Username : "admin",
    password : "admin123"
}


router.post('/login', (req, res)=>{
    if(req.body.Username == credential.Username && req.body.password == credential.password ){
        req.session.user = req.body.Username;
        res.redirect('/route/dashboard');
        
    }else{
        res.end("Invalid Username")
    }
});


router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})


router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', { title: "Express", logout : "logout Successfully...!"})
        }
    })
})

module.exports = router;