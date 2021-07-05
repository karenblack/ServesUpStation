const { restart } = require('nodemon');

module.exports = function(){
    var express = require('express');
    var router = express.Router();

    const mysql = require('./dbcon.js');

	const getAllQuery = 'SELECT * FROM menuItems';
	const insertQuery = "INSERT INTO `menuItems` (`menuName`, `catID`, `unitPrice`, `description`, `producer`, `year`) VALUES(?, (SELECT `categoryID` FROM `productCategories` WHERE `categoryID` = ?), ?, ?, ?, ?);";
  const searchQuery = "SELECT * FROM menuItems WHERE menuName =?;";
	const updateQuery = "UPDATE `menuItems` SET `menuName`=?, `catID`=?, `unitPrice`=?, `description`=?, `producer`=?, `year`=? WHERE `menuID`= ?;";
	const deleteQuery = "DELETE FROM `menuItems` WHERE `menuID`= ?;";
	// delete table - drop and reset table
	// const dropTableQuery = "DROP TABLE IF EXISTS menuItems";
	// const makeTableQuery = 'CREATE TABLE menuItems(' +
	//                         '`menuID` int(11) NOT NULL AUTO_INCREMENT,' + 
	//                         '`menuName` varchar(255) NOT NULL,' +
	//                         '`catID` int(11) DEFAULT NULL,' + 
	//                         '`unitPrice` decimal(6,2) NOT NULL,' +
	//                         '`description` varchar(255),' +
	//                         '`producer` varchar(255),' +
	//                         '`year` year,' +
	//                         'PRIMARY KEY (`menuid`),' +
	//                         'CONSTRAINT `menuItems_fk1` FOREIGN KEY (`catID`) REFERENCES `productCategories`(`categoryID`) ON DELETE SET NULL';

    const getAllData = (res, next) => {
      mysql.pool.query(getAllQuery, (err, rows) => {
          if(err){
              next(err);
              return;
          }
          res.json(rows);
      });
    };

    /*Display all menuItems */
    router.get('/',function(req,res,next){
      getAllData(res);
    });

    /* Adds a menuItem */
    router.post('/', function(req, res, next){
        var {menuName, catID, unitPrice, description, producer, year} = req.body;
        console.log("post worked");

        mysql.pool.query(
            {sql: insertQuery, 
            values: [menuName, catID, unitPrice, description, producer, year]}, 
            (err, result) => {
            if(err){
              next(err);
              return;
            }

            }
        );
    });


    // Try viewing Teams.js
    /* Search menuItems */  
    router.get('/search/:searchItem', function(req, res, next){
        const searchItem =req.params.searchItem;
        
        mysql.pool.query(
            {sql: searchQuery, 
            values: searchItem}, 
            (err, rows, fields, result) => {
            if(err){
              next(err);
              return;
            }
            res.json(rows);
            }
        );
    });


    // delete
    router.delete('/:menuID',function(req,res,next){
      mysql.pool.query(
        {sql: deleteQuery, 
        values: [req.params.menuID]}, 
        (err, result) => {
        if(err){
          next(err);
          return;
        }

      });
    });

    //safe-update
    router.put('/',function(req,res,next){
      var {menuName, catID, unitPrice, description, producer, year, menuID} = req.body;
      mysql.pool.query(
        {sql: updateQuery, 
        values: [menuName, catID, unitPrice, description, producer, year, menuID]},
        (err, result) => {
          if(err){
            next(err);
            return;
          };
          res.send(result);
        });
    });

    //reset search
    router.get('/resetSearch',function(req,res,next){
      getAllData(res);
    });

    //reset table
    router.get('/reset-table',function(req,res,next){
        console.log("Table was reset");
        mysql.pool.query(dropTableQuery, function(err){
        mysql.pool.query(makeTableQuery, function(err){
            if(err){
            next(err);
            return;
            };
            getAllData(res);
        })
        });
    });

    return router;
}();