const express = require('express');
const app = express();

app.use(express.json());
const users = [{
    name:'john',
    kidneys:[{
        healthy: false
    }]
}];

app.get('/',function(req,res){
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for(let i=0; i<johnKidneys.length; i++){
        if(johnKidneys[i].healthy){
            numberOfHealthyKidneys++;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

app.post('/',function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy:isHealthy
    })
    res.json({
        msg:'Done!!'
    })
})

app.put('/',function(req,res){
    for(i=0; i<users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})

app.delete('/',function(req,res){
    if(isThereAtleastOneUnhealthyKidney()){
       const newKidneys = [];
    for(let i=0; i<users[0].kidneys.length; i++){
        if(users[0].kidneys[i].healthy){
            newKidneys.push({
                healthy:true
            })
        }
    }
    users[0].kidneys = newKidneys;
    res.json({msg:'Done!!!'})
    }else{
        res.status(411).json({
            msg:'You have no bad kidneys!!'
        })
    }
   
})

function isThereAtleastOneUnhealthyKidney(){
    let atleastUnhealthyKidney = false;
    for (let i=0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].length){
            atleastUnhealthyKidney = true;
        }
    }
    return atleastUnhealthyKidney;
}
app.listen(3000);