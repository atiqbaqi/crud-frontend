const axios = require('axios');

const axios_instance = axios.create({
    baseURL: process.env.BACKEND_API_BASEURL
});

module.exports = {
    async createEvent(req,res){
        try {
            const token = req.token;

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

            let token = req.token;

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
            //Convert Array of object to Array of arrays for json data compatibility for datatable
            let dataArray = (result.data).map(function(obj) {
                return Object.values(obj);
            });

            result.data = dataArray;            
            result.recordsFiltered = result.recordsTotal;
            res.json(result);
        } catch (error) {
            console.log(error);
            return res.render('events');
        }
    },

    async getEvent(req, res){
        try {
            const id = req.params.id;
            console.log(id);

            let token = req.token;

            const get_event_by_id = {
                method: 'get',
                url: '/api/events/'+id,
                headers: { 
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                }
            };
            let event;
            await axios_instance(get_event_by_id).then((response)=>{
                event = response.data;
            }).catch((error) => {
                console.log(error);
            });
            console.log(event);
            return res.render('edit',{event:event});
        } catch (error) {
            console.log(error);
            return res.render('create');
        }
    },

    async editEvent(req, res) {
        try {
            const id = req.params.id;
            console.log(id);

            let token =req.token;

            const update_event = {
                method: 'put',
                url: '/api/events/'+id,
                headers: { 
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                },
                data:req.body
            };
            
            await axios_instance(update_event).then((response)=>{
                console.log(response);
            }).catch((error)=>{
                console.log(error);
            });

            return res.redirect('/edit/'+id);
        } catch (error) {
            console.log(error);
            return res.render('events');
        }
    },

    async deleteEvent(req, res){
        try {
            const id = req.params.id;
            console.log(id);

            let token = req.token;

            const delete_event_by_id = {
                method: 'delete',
                url: '/api/events/'+id,
                headers: { 
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                }
            };

            await axios_instance(delete_event_by_id).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });

            return res.redirect('/events');
        } catch (error) {
            console.log(error);
            return res.render('events');
        }
    }
}