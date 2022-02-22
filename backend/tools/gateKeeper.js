const express = require('express')
const router = express.Router();
const verifyToken = require('./tokenVerifier');
const mongoose = require('mongoose') 

router.get('/user/information',verifyToken)
router.patch('/user/information',verifyToken)
router.get('/user/feed',verifyToken)
router.get("/shop/info",verifyToken)
router.patch("/shop/info",verifyToken)
router.get("/shop/orders/:pageNumber",verifyToken)
router.post("/shop/product", verifyToken)
router.get("/product/list",verifyToken)
router.post("/product",verifyToken)
router.patch("/product/info",verifyToken)
router.delete("/product/:id",verifyToken)
router.all("/inbox/*",verifyToken)
router.all("/order/*",verifyToken)

module.exports = router;


// To add a token base security to a certain path.