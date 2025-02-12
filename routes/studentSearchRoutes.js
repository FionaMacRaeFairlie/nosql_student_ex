const express = require('express');
const router = express.Router();
const path = require('path');

const public = path.join(__dirname, "../public");
router.use(express.static(public));

const controller = require('../controllers/studentSearchController.js');

router.get("/", controller.landing_page);
router.get("/webdev", controller.web_development);
router.get("/aadp", controller.application_arch);
router.get("/lowperformance", controller.low_performance);
router.get("/failedprogramming", controller.fail_programming);
router.get("/passedprogramming", controller.pass_programming);
router.get("/failedse", controller.fail_se);
router.get("/passedse", controller.pass_se);
router.get("/failedwebdev", controller.fail_webdev);
router.get("/passedwebdev", controller.pass_webdev);
router.get("/failedaadp", controller.fail_aadp);
router.get("/passedaadp", controller.pass_aadp);

router.get("/api",controller.serveJson)

router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})
router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})

module.exports = router;