const axios = require('axios');
let Github

if(process.env.github_token){
  Github = axios.create({
    headers: { Authorization: `Bearer ${process.env.github_token}` }
  });
}else{
  Github = axios.create();
}
 

module.exports = Github;
