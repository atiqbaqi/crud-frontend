const router = require('express').Router();
const EventController = require('../controller/EventController');
const AuthController = require('../controller/AuthController');
const {auth, checkLoggedIn} = require('../middleware/auth');

//create page
router.get('/create', checkLoggedIn, async (req, res)=> {
    const user_name = req.session.user_name;
    res.render('create', {user_name});
});

//edit page
router.get('/edit/:id', checkLoggedIn, auth, EventController.getEvent);
router.post('/edit/:id', checkLoggedIn, auth, EventController.editEvent);

//create a new event
router.post('/create', checkLoggedIn, auth, EventController.createEvent);

//list events
router.get('/events', checkLoggedIn, EventController.listEvents);

//pagination for datatable
router.get('/server-side-processing', checkLoggedIn, auth,EventController.serverSideProcessing);

//delete event
router.get('/delete/:id', checkLoggedIn, auth, EventController.deleteEvent);

//signup
router.get('/signup', async (req, res)=> {
    res.render('signup');
});
router.post('/signup', AuthController.signup);

//login
router.get('/login', async (req, res)=> {
    const user_name = req.session.user_name;
    res.render('login',{user_name});
});
router.post('/login', AuthController.login);

//logout
router.get('/logout', AuthController.logout);

//error page
router.get('/error', async (req, res)=> {
    res.render('error');
});  

module.exports=router;