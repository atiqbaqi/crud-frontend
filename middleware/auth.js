const axios = require('axios');

const axios_instance = axios.create({
    baseURL: process.env.BACKEND_API_BASEURL
});

const auth = async (req, res, next) => {
    try {
        await axios_instance.post('/api/login',{user_name:process.env.API_USER,password:process.env.API_PASSWORD})
            .then((response) => {
                req.token = response.data.token;
                next();
            }).catch((error) => {
                console.error(error);
                return res.redirect('/error');
            });
    } catch (error) {
        return res.status(500).send('Authentication error: ' + error.message);
    }
}

module.exports = auth;