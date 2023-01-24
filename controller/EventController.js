const axios = require('axios');

const axios_instance = axios.create({
    baseURL: process.env.BACKEND_API_BASEURL
  });

module.exports = {
    async createEvent(req,res,next){
        try {
            let token;
            await axios_instance.post('/api/login',{user_name:process.env.API_USER,password:process.env.API_PASSWORD})
            .then((response) => {
                token = response.data.token;
            }).catch((error) => {
                console.error(error);
            });

            const post_event = {
                method: 'post',
                url: '/api/events',
                headers: { 
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                },
                data : req.body
            };

            await axios_instance(post_event)
            .then((response) => {
                console.log(response.data);
              }).catch((error) => {
                console.error(error);
              });
            return res.redirect('/create');
        } catch (error) {
            console.log(error);
            return res.redirect('/create');
        }
    },

    async listEvents(req,res){
        try {
            let token;
            await axios_instance.post('/api/login',{user_name:process.env.API_USER,password:process.env.API_PASSWORD})
            .then((response) => {
                token = response.data.token;
            }).catch((error) => {
                console.error(error);
            });

            const list_event = {
                method: 'get',
                url: '/api/events',
                headers: { 
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                },
                params:{
                    page:req.query.page||1,
                    size:req.query.size||5
                }
            };

            let data;
            await axios_instance(list_event)
            .then((response)=>{
                data = response.data;
            }).catch((err)=>{
                console.log(err);
            });
            return res.render('events',data);
        } catch (error) {
            console.log(error);
            return res.render('events');
        }
    }
}