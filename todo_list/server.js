const express = require('express')
const server = express();
let list=[
  {id:"1",task:"Create Interface",status:"X"},
  {id:"2",task:"Create required Javascript code",status:"Done"},
  {id:"3",task:"Connect to Javascript",status:"X"}
];
let Welcome_Message="Hi, Welcome to this to do list.\n add todos to url to access the items in the to do list."
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.get('/',(req,res)=>res.send(Welcome_Message))
server.get('/todos',(req,res)=>{
  res.send(list);
})
server.get('/todos/:id',(req,res)=>{
  if((req.query.task!=undefined)&&(req.query.done!=undefined)){
    let stat="Done";
    if(req.query.done=="false"){
      stat="X";
    }
    list[req.params.id-1]={id:req.params.id,task:req.query.task,status:stat};
  }else if(req.query.task){
    list[req.params.id-1]['task']=req.query.task;
  }else if(req.query.done!=undefined){
    let stat="Done";
    if(req.query.done=="false"){
      stat="X";
    }
    list[req.params.id-1]['status']=stat;
  }
  res.send(list[req.params.id-1]);
})
server.post('/',(req,res)=>{
  let stat="Done";
  if(req.body.done=false){
    stat="X";
  }
  list.push({
    id:list.length,
    task:req.body.task,
    status:stat
  });
})
server.get('/todos/delete/:id',(req,res)=>{
  if(list.length>=req.params.id){
    list.splice(req.params.id-1,1);
    let count = 1
    for(i in list){
      list[i]['id']=count;
      count+=1;
    }
  }
  res.send(list);
})
server.listen(2121)
