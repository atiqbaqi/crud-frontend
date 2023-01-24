const router = require('express').Router();
const EventController = require('../controller/EventController');

router.get('/create', async (req, res)=> {
    res.render('create');
});

router.post('/create', EventController.createEvent);
router.get('/events', EventController.listEvents);

module.exports=router;