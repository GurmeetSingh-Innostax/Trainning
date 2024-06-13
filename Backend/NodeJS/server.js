const express= require("express");
const morgan=require('morgan');
const app=express();
const jwt=require('jsonwebtoken');
const PORT=5000;
const { Client }= require('pg');
const client= new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"1234",
    database:"UsersDetails"
})


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


client.connect();






// To Display all the users 
app.get("/api/users",(req,res)=>{
    console.log("Get Method Working")
    const { query, params, headers } = req;
       
        client.query(`SELECT * FROM users`)
            .then((result)=>{
                console.log(result.rows);
                res.status(200).json({
                    data: result.rows,
                    error: "No Error"
                })
            })
            .catch((error)=>{
                console.log(error.message);
                res.status(500).send("Server Side Error");
            })
            .finally(()=>{
                console.log("Get Users Request Completed");
            })
})


// Operations on a single User
app.route("/api/users/:userId")
    // To Get details of a particular User
    .get((req,res)=>{
        const userId=req.params.userId;
       
        client.query(`SELECT * FROM users WHERE "userId"=$1 `,[userId])
            .then((result)=>{
                console.log(result.rows[0]);
                if(typeof result.rows[0]==="undefined")
                { 
                    res.status(404).send(`There is no user exists with userId=${userId}`);
                   
               }
               else{
                    
                    res.status(200).json({
                        data:result.rows[0],
                        error:"No Error",
                    });
                }


            })
            .catch((error)=>{
                console.log(error.message);
                res.status(500).send("Server Side Error");
            })
            .finally(()=>{
                console.log("Get User Request Completed");
            })

    })

    .post((req,res)=>{
        // To Insert a new User into Database
       console.log("Request Recieved at Post");
        const userId= req.params.userId;
        const firstName=req.body.firstName; 
        const lastName= req.body.lastName;
        const age=req.body.age;
        const homeTown=req.body.homeTown;
        const gender= req.body.gender;
        const emailId= req.body.emailId;
        const password= req.body.password;
        

        
      client.query(`INSERT INTO users("userId","firstName", "lastName", "age", "homeTown","gender","emailId","password") VALUES ($1, $2, $3, $4, $5,$6,$7,$8)`, [userId,firstName, lastName, age, homeTown,gender,emailId, password])
        .then(result => {
        console.log(result.rows);
        res.status(200).send("Data inserted successfully!");
        })
        .catch(error => {
        console.log(error.message);
        res.status(409).send("User ID already exists");
        })
        .finally(() => {
            console.log("Post Request Completed");
        });

    })


    .patch((req,res)=>{
        // To Update entry into Database
        const userId=req.params.userId;
        const userjsonData = req.body;
        console.log("UserData"+ JSON.stringify(userjsonData));
        client.query(`SELECT * FROM users WHERE "userId"=$1`,[userId])
        .then((result)=>{
            if(typeof result.rows[0]==="undefined")
                { 
                    res.status(404).send(`There is no user exists with userId=${userId}`);
                   
               }
            else{

            const DBJsonData= result.rows[0];
             console.log("DBObject"+JSON.stringify(DBJsonData));

             const mismatchedKeys = [];
            for (const key in userjsonData) {
            if (userjsonData.hasOwnProperty(key)) {
                if (DBJsonData[key] !== userjsonData[key]) {
                        mismatchedKeys.push(key);
                }
            }
            }
            console.log(mismatchedKeys);
            for (let i = 0; i < mismatchedKeys.length; i++) {
                const key = mismatchedKeys[i];
                const value = userjsonData[key];
                client.query(`UPDATE users SET "${key}" = '${value}' WHERE "userId" = ${userId}`)
                .then((result)=>{
                    console.log(mismatchedKeys[i]+" is updated");

                })
                .catch((error)=>{
                    console.log(error.message);
                    res.status(500).send("Issue at server end, can't update it at the moment!")

                })
                .finally(()=>{
                    
                    
                })
                
              }
            
              res.status(200).send("User Updated Successfully");
            }
        
        })
        .catch((error)=>{
            console.log(error.message);
            res.status(500).send("User data record not fetched at server!")

        })
        .finally(()=>{
            console.log("PATCH Task completed");
        })
  
    })
        
        


    .delete((req,res)=>{
        const userId = req.params.userId;
        // To delete an entry of user into database

        client.query(`DELETE FROM users WHERE "userId"=$1`,[userId])
            .then((result)=>{
                if (result.rowCount === 0) {
                    res.status(404).send(`There is no user with userId=${userId}`);
                  } else {
                    console.log("Deleted: " + result.rows);
                    res.status(200).send(`Record with userId=${userId} is successfully removed`);
                  }

            })

            .catch((error)=>{
                console.log(error.message);
                res.status(500).send("Error while deleting record into the database.");

            })
            .finally(()=>{
                console.log("Delete Request Completed ")
            })



    })



app.listen(PORT,()=>{
   console.log(`Server is listening at port ${PORT}`) 
})





 