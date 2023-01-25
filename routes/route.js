const router = require('express').Router();
const EventController = require('../controller/EventController');

//create page
router.get('/create', async (req, res)=> {
    res.render('create');
});

//edit page
router.get('/edit/:id', EventController.getEvent);
router.post('/edit/:id', EventController.editEvent);

//create a new event
router.post('/create', EventController.createEvent);

//list events
router.get('/events', EventController.listEvents);

//pagination for datatable
router.get('/server-side-processing',EventController.serverSideProcessing);
  

module.exports=router;