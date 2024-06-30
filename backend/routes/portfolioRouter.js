const express = require("express")
const router = express.Router();
const controller =  require('../controllers/portfolio.controller')
const multer = require('multer');
const { protect } = require("../controllers/authController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/resume-parser',protect,upload.single('file'),controller.resumeParser)
router.post('/create-new',protect, controller.createPortfolio)
router.post('/fetch',protect, controller.fetchPortfolio)
router.post('/fetch-portfolio-list',protect, controller.fetchPortfolioList)
router.post('/update',protect, controller.updatePortfolio)

module.exports = router;