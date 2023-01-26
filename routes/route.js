const router = require('express').Router();
const EventController = require('../controller/EventController');
const auth = require('../middleware/auth');

//create page
router.get('/create', async (req, res)=> {
    res.render('create');
});

//edit page
router.get('/edit/:id', auth, EventController.getEvent);
router.post('/edit/:id', auth, EventController.editEvent);

//create a new event
router.post('/create', auth, EventController.createEvent);

//list events
router.get('/events', EventController.listEvents);

//pagination for datatable
router.get('/server-side-processing', auth,EventController.serverSideProcessing);

//delete event
router.get('/delete/:id', auth, EventController.deleteEvent);

//error page
router.get('/error', async (req, res)=> {
    res.render('error');
});  

module.exports=router;