var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
// var mongoose = require('mongoose');

var port = 8081;

// var db = 'mongodb://localhost/bookstore';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

// mongoose.connect(db);

app.get('/', function(req,res){
   res.send('happy to learn nodeJS');
});

app.get('/api', function(req,res){
  var filename = "." + "/api.json";
  var content = fs.readFileSync(filename);
  res.json(JSON.parse(content));
});

// app.get('/api/:id', function(req, res){
//   console.log('Getting one book');
// });

app.post('/send', function(req,res){
  var filename = "." + "/api.json";
  var content = fs.readFileSync(filename);
  var api = JSON.parse(content);

  if(api['first_ten'].length > 0){
    api['onduty'].push(api['first_ten'][0]);
    api['first_ten'].splice(0,1);

    if(api['first_ten'].length == 0){
      api['next_available_five'] = api['sencond_five'];
    }
  }else if(api['next_available_five'].length > 0){
    api['onduty'].push(api['next_available_five'][0]);
    api['next_available_five'].splice(0,1);
  }

  fs.writeFile(filename, JSON.stringify(api) , function (err) {
    if (err) throw err;
    console.log('Replaced!');
    var content2 = fs.readFileSync(filename);
    res.json(JSON.parse(content2));
  });

});

app.post('/release', function(req,res){
  var name = req.body.name;
  var filename = "." + "/api.json";
  var content = fs.readFileSync(filename);
  var api = JSON.parse(content);

  var iObj = api['onduty'].find(x => x.name == name);
  if(iObj){
    var i = api['onduty'].indexOf(iObj);

    if(api['sencond_five'].indexOf(api['sencond_five'].find(x => x.name == name)) != -1 && api['first_ten'].length<5){
      api['next_available_five'].push(api['onduty'][i]);
      api['onduty'].splice(i,1);
    }
    if(api['sencond_five'].indexOf(api['sencond_five'].find(x => x.name == name)) != -1 && api['first_ten'].length>4){
      api['next_available_five']=[];
      api['onduty'].splice(i,1);
    }
    if(api['sencond_five'].indexOf(api['sencond_five'].find(x => x.name == name)) == -1){
      api['first_ten'].push(api['onduty'][i]);
      api['onduty'].splice(i,1);
      if(api['first_ten'].length>4){
        api['next_available_five']=[];
      }
    }
  }

  fs.writeFile(filename, JSON.stringify(api) , function (err) {
    if (err) throw err;
    console.log('Replaced!');
    var content2 = fs.readFileSync(filename);
    res.json(JSON.parse(content2));
  });

});

app.put('/api/:id',function(req,res){
  
});

app.delete('/api/:id', function(req,res){
  
});

app.listen(port, function(){
  console.log('App listning on port :' + port);
});