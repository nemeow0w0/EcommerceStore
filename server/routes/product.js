const express = require('express');
const router = express.Router();

// controller
const { create, list, read, update, remove, listby, searchFilters, createImages, RemoveImage } = require('../controllers/product');
const { authCheck ,adminCheck } = require('../middlewares/authCheck')

// http://localhost:4100/api/product
router.post('/product', create);
router.get('/products/:count', list);
router.get('/product/:id', read);
router.put('/product/:id',update);
router.delete('/product/:id', remove);
router.post('/productby', listby);
router.post('/search/filters', searchFilters);

router.post('/images',authCheck ,adminCheck, createImages)
router.post('/removeimages',authCheck ,adminCheck, RemoveImage)



module.exports = router