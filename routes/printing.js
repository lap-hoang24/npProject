const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   res.send(req, "cd printing test success")
})



module.exports = router;