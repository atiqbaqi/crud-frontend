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
            // let token;
            // const page = req.query.start;
            // const size = req.query.length;
            // console.log(page+'>>'+size);
            // await axios_instance.post('/api/login',{user_name:process.env.API_USER,password:process.env.API_PASSWORD})
            // .then((response) => {
            //     token = response.data.token;
            // }).catch((error) => {
            //     console.error(error);
            // });

            // const list_event = {
            //     method: 'get',
            //     url: '/api/events',
            //     headers: { 
            //         'Authorization': 'Bearer ' + token, 
            //         'Content-Type': 'application/json'
            //     },
            //     params:{
            //         page:page||1,
            //         size:size||5
            //     }
            // };

            // let data;
            // await axios_instance(list_event)
            // .then((response)=>{
            //     data = response.data;
            // }).catch((err)=>{
            //     console.log(err);
            // });
            // return res.render('events',data);
            return res.render('events');
        } catch (error) {
            console.log(error);
            return res.render('events');
        }
    },

    async serverSideProcessing(req,res){
        try {
            const start = parseInt(req.query.start);
            const size = parseInt(req.query.length);
            let page = Math.floor(start / size) + 1;
            const draw = parseInt(req.query.draw);
            console.log(page+'>>'+size+'>>'+draw);
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
                    page:page||1,
                    size:size||5
                }
            };

            let result;
            await axios_instance(list_event)
            .then((response)=>{
                result = response.data;
            }).catch((err)=>{
                console.log(err);
            });
            console.log(result);
            let dataArray = (result.data).map(function(obj) {
                return Object.values(obj);
            });
            result.data = dataArray;
            console.log(dataArray);
            // result.recordsTotal = 14;
            result.recordsFiltered = result.recordsTotal;
            res.json(result);
        } catch (error) {
            console.log(error);
            return res.render('events');
        }
    }
}