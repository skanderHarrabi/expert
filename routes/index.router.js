const express = require('express');
const multer = require('multer');
const router = express.Router();

const profileController = require('../controllers/profile');

const reservationsController = require('../controllers/reservation');
const rapportController = require('../controllers/rapport');

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');


//les routers de services
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/pdf': 'pdf'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // const isValid = MIME_TYPE_MAP[file.mimetype];
        // let error = new Error('Invalid mime type');
        // if (isValid) {
        //     error = null;
        // }
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        // console.log(file.originalname)
        // console.log(file.mimetype)
        // const name = file.originalname.toLowerCase().split(' ').join('-');
        // console.log(name)
        // const ext = MIME_TYPE_MAP[file.mimetype];
        // cb(null, name + '-' + Date.now() + '.' + ext);
        cb(null, new Date().getTime().toString() + '_' + file.originalname);
    }

});



//register client
router.post('/register-client', multer({ storage: storage }).single("image"), (req, res, next) => {
    ctrlUser.register(req, 'client', res, next);
});
//register admin
router.post('/register-admin', multer({ storage: storage }).single("image"), (req, res, next) => {
    ctrlUser.register(req, 'admin', res, next);
});
//register expert
router.post('/register-expert', multer({ storage: storage }).single("image"), (req, res, next) => {
    ctrlUser.register(req, 'expert', res, next);
});
router.post('/authenticate', ctrlUser.authenticate);
router.get('/user', jwtHelper.verifyJwtToken, ctrlUser.userProfile);


router.post('/profile/add', multer({ storage: storage }).array("image", 3),
    profileController.add_Profile);

router.delete('/profile/delete/:id', profileController.delete_Profile);
router.get('/profile/:id', profileController.get_Profile);
router.get('/profiles', profileController.get_allProfiles);
router.put('/profile/update', jwtHelper.verifyJwtToken, profileController.update_Profile);



router.post('/reserve', jwtHelper.verifyJwtToken, reservationsController.reserve);
router.get('/reservations', reservationsController.get_myReservations);
router.get('/appointments', jwtHelper.verifyJwtToken, reservationsController.get_myAppointments);
router.put('/reservation/:id', jwtHelper.verifyJwtToken, reservationsController.set_ReservationStatus);
router.get('/getMission/:id', jwtHelper.verifyJwtToken, reservationsController.getMission);
router.get('/reservation/myMissions', jwtHelper.verifyJwtToken, reservationsController.getMissions);
router.get('/reservation/history', jwtHelper.verifyJwtToken, reservationsController.getClienthistory);
router.post('/addRaport', rapportController.add_rapport);
// router.post('/upload', multer({ storage: storage }).array("image",3), (req,res)=>{
//     console.log("-->",req.files[0].filename);
//     res.status(200).json('it WORK !!!');
//     });
module.exports = router;
