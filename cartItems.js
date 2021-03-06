module.exports = function(){
    var express = require('express');
    var router = express.Router();
    const mysql = require('./dbcon.js');

    const getAllQuery = 'SELECT * FROM cartItems;';
    const insertQuery = 'INSERT INTO `cartItems` (`cartID`, `menuID`, `quantity`) VALUES ((SELECT `cartID` FROM `carts` WHERE `cartID` = ?), (SELECT `menuID` FROM `menuItems` WHERE `menuID` = ?), ?);';
    const updateQuery = "UPDATE `cartItems` SET cartID=?, menuID=?, quantity=? WHERE `detailsID`= ?;";
    const deleteQuery = "DELETE FROM `cartItems` WHERE `detailsID`= ?";
    // const dropTableQuery = "DROP TABLE IF EXISTS cartItems";
    // const makeTableQuery = "CREATE TABLE `cartIems` (" + 
    //                         "`detailsID` int(11) NOT NULL AUTO_INCREMENT," + 
    //                         "`cartID` int(11) NOT NULL," + 
    //                         "`menuID` int(11) NOT NULL," +
    //                         "`quantity` int(11) NOT NULL," +                        
    //                         "PRIMARY KEY (`detailsID`)," +
    //                         "CONSTRAINT `cartItems_fk1` FOREIGN KEY (`cartID`) REFERENCES `carts`(`cartID`) ON DELETE CASCADE," +
    //                         "CONSTRAINT `cartItems_fk2` FOREIGN KEY (`menuID`) REFERENCES `menuItems`(`menuID`) ON DELETE CASCADE);"

    //retrieves all data from query pool
    const getAllCartItems = (res) => {
        mysql.pool.query(getAllQuery, (err, rows, fields) => {
            if(err){
                next(err);
                return;
            }
            res.json(rows);
        });
    };

    router.get('/',function(req,res,next){
        getAllCartItems(res);
        });

    router.post('/', function(req, res, next){
        let {cartID, menuID, quantity} = req.body;
        console.log("post worked");
        
        mysql.pool.query(
            {sql: insertQuery, 
            values: [cartID, menuID, quantity]}, 
            (err, result) => {
            if(err){
            next(err);
            return;
            }
        
            getAllCartItems(res);
        
            }
        );
    });

    // delete
    router.delete('/:detailsID',function(req,res,next){
    console.log("delete worked");
    mysql.pool.query(
        {sql: deleteQuery, 
        values: [req.params.detailsID]}, 
        (err, result) => {
        if(err){
        next(err);
        return;
        }
    });
    });

    //safe-update
    router.put('/', function(req, res, next){
        let {cartID, menuID, quantity, detailsID} = req.body;
        console.log("update worked");
        
        mysql.pool.query(
            {sql: updateQuery, 
            values: [cartID, menuID, quantity, detailsID]}, 
            (err, result) => {
            if(err){
            next(err);
            return;
            }
            res.send(result);       
            }
        );
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
            getAllCartItems(res);
        })
        });
    });
    return router;
}();