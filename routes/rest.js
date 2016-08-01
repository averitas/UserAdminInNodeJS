var express = require('express');
var router = express.Router();

/*
//configure of mongodb(Old one)
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/nodeuser1';
*/

//configure of mongoose
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');


/* GET the list of users. */
router.get('/users', function(req, res, next) {

	User.find({},function (err, users) {
		if(err!=null)
			res.sendStatus(400);
		else{
			res.status(200).json(users);
		}
	});

/*	This is the old way of connecting mongodb
	var findUsers = function (db, callback) {
		var cursor = db.collection('usercollection').find();
		cursor.toArray(function (err, docs) {
			if(err != null)
				res.sendStatus(400);
			else
				res.status(200).json(docs);
		});
	};

	MongoClient.connect(url, function (err, db) {
		findUsers(db, function () {
			db.close();
		});
	});*/
});

/* GET the exactly user */
router.get('/user/:un', function (req, res, next) {

	User.find({username:req.params.un},function (err, doc) {
		if(err != null)
			res.sendStatus(400);
		else
			res.status(200).json(doc);
	});

/*  This is the old way of connecting mongodb
	var findUser = function (db, callback) {
		var cursor = db.collection('usercollection').find({username:req.params.un});
		cursor.nextObject(function (err, doc) {
			if(err != null)
				res.sendStatus(400);
			else
				res.status(200).json(doc);
		});
	};

	MongoClient.connect(url, function (err, db) {
		findUser(db, function () {
			db.close();
		});
	});*/
});

router.post('/add',function (req, res, next) {

	var empUser = {username:'',password:'',role:'',fname:'',lname:'',email:'',address:''};

	var income = req.body;
	var newone = new User();

	for(p in empUser){
		newone[p] = income[p];
	}

	newone.password = bCrypt.hashSync(newone.password, bCrypt.genSaltSync(10), null);
	newone.save(function (err) {
		if (err){
            console.log('Error in Saving user: '+err);
            res.sendStatus(500);
        }else{
        	console.log('User Registration succesful'); 
        	res.status(200).json(income);
        }
	});


/*	This is the old way
	var insertUser = function (db, callback) {
		db.collection('usercollection').insertOne(newone,function (err, result) {
			if(err != null)
				res.sendStatus(500);
			else{
				res.status(200).json(newone);
			}
		});
	};

	MongoClient.connect(url, function (err, db) {
		insertUser(db, function () {
			db.close();
		});
	});	*/
});

router.put('/edit',function (req,res,next) {

	var newone = req.body;

	if('password' in newone)
		newone.password = bCrypt.hashSync(newone.password, bCrypt.genSaltSync(10), null);

	User.update({username:newone.username},newone,{upsert:true},function (err, rawRes) {
		if(err)
			res.sendStatus(500);
		else{
			res.status(200).json(newone);
		}
	});

/*	This is the old way
	var updateUser = function (db, callback) {
		db.collection('usercollection').replaceOne({username:newone.username},newone,function (err, result) {
			if(err != null)
				res.sendStatus(500);
			else{
				res.status(200).json(newone);
			}
		});
	};

	MongoClient.connect(url, function (err, db) {
		updateUser(db, function () {
			db.close();
		});
	});	*/

})

router.delete('/delete/:un',function (req, res, next) {

	User.remove({username:req.params.un},function (err, result) {
		if(err != null)
			res.sendStatus(500);
		else{
			res.sendStatus(200);
		}
	});

/*	This is old way
	var deleteUser = function (db, callback) {
		db.collection('usercollection').deleteOne({username:req.params.un},function (err, result) {
			if(err != null)
				res.sendStatus(500);
			else{
				res.sendStatus(200);
			}
		});
	};

	MongoClient.connect(url, function (err, db) {
		deleteUser(db, function () {
			db.close();
		});
	});	*/

});

module.exports = router;