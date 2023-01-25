const router = require('express').Router();
const EventController = require('../controller/EventController');

router.get('/create', async (req, res)=> {
    res.render('create');
});

//create a new event
router.post('/create', EventController.createEvent);

//list events
router.get('/events', EventController.listEvents);
router.get('/server-side-processing',EventController.serverSideProcessing);
  

module.exports=router;