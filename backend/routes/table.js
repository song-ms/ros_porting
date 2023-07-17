/* eslint-disable max-len */
/* !

=========================================================
* Argon React NodeJS - v1.0.0
=========================================================

* Product Page: https://argon-dashboard-react-nodejs.creative-tim.com/
* Copyright 2020 Creative Tim (https://https://www.creative-tim.com//)
* Copyright 2020 ProjectData (https://projectdata.dev/)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react-nodejs/blob/main/README.md)

* Coded by Creative Tim & ProjectData

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
const express = require('express');

const router = express.Router();
const wrap = require('express-async-wrap');

// const asyncify = require('express-asyncify');
// const router = asyncify(express.Router());
const User = require('../models/user');
const reqAuth = require('../config/safeRoutes').reqAuth;
const shell = require('shelljs')
const Tail = require('tail').Tail;


function ToTrimmer(list){
  const word = list.replace(" ", "")
  const word2 = word.replace(/\n/g, "");
  const word3 = word2.replace("\\", "")
  const word4 = word3.replace("[", "")
  const word5 = word4.replace("]", "")
  const word6 = word5.trim()
  const word7 = word6.replace(/"/gm,"")
  const result = word7.split(",  ");
  return result
}

function Counting(){
  const counts = shell.exec("docker images -q | wc -l");
  return counts
}


const ScriptPath = 'cd '+__dirname+'&& cd ../ && cd script &&'

router.get('/sample', (req, res) => {
  // shell.exec(ScriptPath + './stop') 
  // res.send("success")
  const { execSync } = require('child_process');

  // Execute the 'docker images' command and capture the output
  const output = execSync('docker images').toString();

  // Split the output by newline to separate each line
  const lines = output.trim().split('\n');

  // Skip the header line and extract the image tags into an array
  const imageTags = lines.slice(1).map(line => line.split(/\s+/)[1]);

  // Print the array of image tags
  
  console.log(imageTags.slice(0,2));
   
  res.send(imageTags.slice(0,2))
})
router.get('/current_image', (req, res) => {
  // shell.exec(ScriptPath + './stop') 
  // res.send("success")
  const { execSync } = require('child_process');

  // Execute the 'docker images' command and capture the output
  const output = execSync('docker images').toString();

  // Split the output by newline to separate each line
  const lines = output.trim().split('\n');

  // Skip the header line and extract the image tags into an array
  const imageTags = lines.slice(1).map(line => line.split(/\s+/)[1]);

  // Print the array of image tags
  
  console.log(imageTags.slice(0,2));
   
  res.send(imageTags.slice(0,2))
})

router.post('/all', reqAuth, function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      res.json({success: false});
    }
    users = users.map(function(item) {
      const x = item;
      x.password = undefined;
      x.__v = undefined;
      return x;
    });
    res.json({success: true, users: users});
  });
});


router.get('/docker', (req, res) => {
  const list = shell.exec(ScriptPath + './DockerList') 
  // const list = shell.exec('./DockerList');
  // const word2 = word.replace("\\n ", "")
  // const reg = /[\{\}\[\]\/?,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  // word.replace(reg,'');
  const word = list.replace(" ", "")
  const word2 = word.replace(/\n/g, "");
  const word3 = word2.replace("\\", "")
  const word4 = word3.replace("[", "")
  const word5 = word4.replace("]", "")
  const word6 = word5.trim()
  const word7 = word6.replace(/"/gm,"")
  const final = word7.split(",  ");
  fianl_json = {...final};
  // const word = list.split("\n  \"")
  // const docker_list = path.join("docker_list");
  res.json(fianl_json)
});


router.get('/downloading', (req, res) => {
  tail = new Tail("./script_log.txt");
  tail.on("line", function(data) {
    console.log(data);
    res.write(data);
    // console.log("hello");
  });
  tail.on("error", function(error) {
    console.log('ERROR: ', error);
  });
});

router.get('/all_container_list', (req,res) => {
  const running_list = shell.exec(ScriptPath + './AllContainersList');
  const str_running_list = running_list.replace(/\n/g, "");
  const result = ToTrimmer(str_running_list)
  console.log(result);
  res.send(result);
})

router.get('/running_list', (req,res) => {
  const running_list = shell.exec(ScriptPath + './RunningContainersList');
  const str_running_list = running_list.replace(/\n/g, "");
  const result = ToTrimmer(str_running_list)
  console.log(result);
  res.send(result);
})

router.post('/install', wrap(async function(req, res) {
  const dockerNameTag = req.body.version;
  const checker = await Counting();
  if (checker > 5){
    const data = ["fail", checker]
    res.send(data)
    // res.send("Storage is already full (Maximum 2 apps)")
  }
  else{
    const cmd = await shell.exec(ScriptPath + './install '+ dockerNameTag);
    // console.log(cmd)
    res.send(false)
  }
}))

router.post('/stop', (req, res) => {
  const ContainerName = req.body.version;
  shell.exec('docker stop '+ ContainerName);
  res.send("success")
})

router.post('/run', (req, res) => {
  const RunContainerName = req.body.version;
  console.log('docker start ' + RunContainerName);
  // shell.exec('docker start ' + RunContainerName);
  console.log('docker exec ' + RunContainerName + ' ./bringup_app.sh');
  shell.exec('docker exec ' + RunContainerName + ' ./bringup_app.sh &');
  res.send("success")
})


module.exports = router;
