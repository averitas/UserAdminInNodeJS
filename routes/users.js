var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
	/*var collection = db.get('usercollection');
	collection.find({},{},function (err, docs) {
		res.render('users', { title: 'Users', data:docs })
	});*/
});

module.exports = router;