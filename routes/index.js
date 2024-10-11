var express = require('express');
var router = express.Router();
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Test project' });
});


module.exports = router;
