const axios = require('axios');

const axios_instance = axios.create({
    baseURL: process.env.BACKEND_API_BASEURL
});

module.exports = {
    async signup(req,res){
        try {
            const post_signup = {
                method: 'post',
                url: '/api/signup',
                data : req.body
            };
            await axios_instance(post_signup)
            .then((response) => {
                console.log(response.data);
              }).catch((error) => {
                console.error(error);
              });
            return res.redirect('/signup');
        } catch (error) {
            console.log(error);
            return res.redirect('/signup');
        }
    },

    async login(req, res){
        try {
            const email = req.body.email;
            const password = req.body.password;
            await axios_instance.post('/api/check-user-info',{email:email,password:password})
            .then((response) => {
                req.session.user_id = response.data.user_info.id;
                req.session.user_name = response.data.user_info.user_name;
                req.session.email = response.data.user_info.email;
                console.log(req.session);
                return res.redirect('/events');
            }).catch((error) => {
                console.error(error);
                let data={};
                data.errorCode = error.code;
                data.status = error.code =='ECONNREFUSED' ? 503: error.response.status;
                data.errorMessage = error.message;
                return res.render('error',data);
            });
        } catch (error) {
            console.log(error);
            return res.redirect('/login');
        }
    },

    async logout(req,res){
        try {
            req.session.destroy();
            res.redirect('/login');
        } catch (error) {
            console.log(error);
            return res.redirect('/login');
        }
    }
}