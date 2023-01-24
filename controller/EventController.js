const axios = require('axios');

const axios_instance = axios.create({
    baseURL: process.env.BACKEND_API_BASEURL
  });

module.exports = {
    async createEvent(req,res,next){
        try {
            let token;
            await axios_instance.post('/api/login',{user_name:process.env.API_USER,password:process.env.API_PASSWORD})
            .then((res) => {
                token = res.data.token;
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
            .then((res) => {
                console.log(res.data);
              }).catch((error) => {
                console.error(error);
              });
            return res.redirect('/create');
        } catch (error) {
            console.log(error);
            return res.redirect('/create');
        }
    }
}