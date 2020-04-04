const express = require ('express');
const router = express.Router();
const admins = require('../model/admin.js');
const mongoose = require('mongoose');

router.get('/admin',(req , res)=>{
    admins.find().exec()
    .then(result=>{
        res.status(200).send(result);
    })
    .catch(err=>{
        res.status(500).json({
            "error":err
        })
    })
})

router.post('/admin',(req,res)=>{
    //console.log("RESPONSE"+res.body.responses);
    const admin = new admins({
        _id: new mongoose.Types.ObjectId(),
        name : req.body.name,
        responses: req.body.responses,
        users:[]
    })

    admin.save().then(result=>{
        console.log(result);
        res.status(201).json({
            createdAdmin : admin
        });
    })
    .catch(err=>console.log(err));

    
});

router.get('/admin/:id',(req,res)=>{
    const id = req.params.id;
    admins.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.get('/admin/responses/:id',(req,res)=>{
    const id= req.params.id;
    admins.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc.responses);
        res.status(200).json({
           responses : doc.responses});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err})
    });
});


router.get('/admin/:id/users',(req,res)=>{
    const id = req.params.id;
    admins.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc.users);
        res.status(200).json(
        doc.users
        )
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err})
    });
});

router.put('/admin/:id/users',(req,res)=>{
    const id = req.params.id;
    admins.findById(id)
    .exec()
    .then(doc=>{
        doc.users.push(req.body);

        doc.save()
        .then(result=>{
            res.send(result);
        })
        .catch(err=>{
            res.status(500).json({error:err})
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });

})



module.exports = router;

