const express = require("express");
const app = express()
app.use(express.static("public/img"));
app.use(express.static("public/css"));
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const Table = require('cli-table');
const useradmin = require('./model/useradmin');
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
const oracle = require('./model/oracle');


app.get('/bus', getData);
app.get('/user', getData2);
app.get('/taxi', getData3);
app.get('/motor', getData4);
app.get('/covoiturage', getData5);

app.get('/businsert', getData11);
app.get('/taxiinsert', getData12);
app.get('/motorinsert', getData13);
app.get('/covoiturageinsert', getData14);
app.get('/normal1', getData6);


async function connect() {
    try {
      const connection = await oracledb.getConnection({
        user: 'c##useradmin',
        password: '123',
        connectString: 'localhost/orcl'
      });
      console.log('successfully connected');
      return connection;
    } catch (err) {
      console.error(err);
    }
  }

async function login(username, password) {
    try {
        //etablir la connection
      const connection = await connect();
      const result = await connection.execute(
        //selectionner table useradmin qu'on deja creer 
        `select *from useradmin WHERE username = :username AND password = :password`,
                        [username, password],
        { outFormat: oracledb.OBJECT }
      );
      await connection.close();
      return result.rows;
       // si on a pas de connection donc error6
    } catch (err) {
      console.error(err);
    }
  }
//   connection a usernormal
  async function connect2() {
    try {
      const connection = await oracledb.getConnection({
        user: 'c##usernormal',
        password: '123',
        connectString: 'localhost/orcl'
      });
      console.log('successfully connected');
      return connection;
    } catch (err) {
      console.error(err);
    }
  }
  async function login2(username, password) {
    try {
       //etablir la connection
      const connection = await connect2();
      const result = await connection.execute(
         //selectionner table usernormal qu'on deja creer 
        `select *from c##useradmin.usernormal WHERE username = :username AND password = :password`,
                        [username, password],
        { outFormat: oracledb.OBJECT }
      );
      await connection.close();
      return result.rows;
       // si on a pas de connection donc error
    } catch (err) {
      console.error(err);
    }
  }

  app.get('/error1', function(req, res) {
    res.render("ErrorAdmin.ejs")
    });
    app.get('/error2', function(req, res) {
        res.render("errornormal.ejs")
        });
app.get('/log1', function(req, res) {
    res.render("index.ejs")
});
    app.post('/log1', async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const rows = await login(username, password);

        if (rows.length === 0) {
          return res.redirect('/error1');
        }else{res.redirect('/list');}
    });  
    
    app.get('/log2', function(req, res) {
        res.render("index2.ejs")
        });
        app.post('/log2', async (req, res) => {
            const username = req.body.username;
            const password = req.body.password;
            const rows = await login2(username, password);
    
            if (rows.length === 0) {
              return res.redirect('/error2');
            }else{res.redirect('/list2');}
        }); 
    
//     app.post('/hh', async (req, res) => {
//         const username = req.body.username;
//         const password = req.body.password;
//         if (req.body.Sign=== "1") {
//         const rows = await login(username, password);

//         if (rows.length === 0) {
//           return res.status(401).send('Invalid username or password');
//         }else{res.redirect('/list');}
//     }else if(req.body.Sign === "2") {
//         const rows2 = await login2(username, password);

//         if (rows2.length === 0) {
//           return res.status(401).send('Invalid username or password');
//         }else{res.redirect('/user');}
//     } else {
//     res.send('Invalid action');
//   }
//     });    
         

         
          
async function getData(req, res) {
  let connection;
  try {
      //connection avec Oracle database c##useradmin
    connection = await oracledb.getConnection({
        user: 'c##useradmin',
        password: '123',
        connectString: 'localhost/orcl'
    });
    console.log('Connection was successful!');
    // select de la table qu'on veut afficher
    const result = await connection.execute(     
      `SELECT * FROM bus`
    );
    //afficher  la table
    console.log(result.rows);
    // pour qu'on puisse acceder a la table en utilisant data dans le tableau
    res.render('table', { data: result.rows });
  } catch (err) {
    console.error(err);
    res.send('Error: ' + err.message);
  } finally {
    // si tous se passe bien la connection va etre fermer
    if (connection) {
      try {
        await connection.close();
        console.log('Terminer');
      } catch (err) {
        console.error(err);
      }
    }
  }
}
async function getData2(req, res) {
 //connection avec Oracle database c##useradmin
     let connection;
    try {
      connection = await oracledb.getConnection({
          user: 'c##useradmin',
          password: '123',
          connectString: 'localhost/orcl'
      });
      console.log('Connection was successful!');
  
      // execute the SELECT statement
      const result = await connection.execute(
        
        `SELECT * FROM useradmin`
  
      );
     
    
      console.log(result.rows);
  
      // render the template
      res.render('table2', { data: result.rows });
  
    } catch (err) {
      console.error(err);
      res.send('Error: ' + err.message);
    } finally {
      // close the database connection
      if (connection) {
        try {
          await connection.close();
          console.log('Connection was closed!');
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  async function getData3(req, res) {
    // establish a connection to the Oracle database
    let connection;
    try {
      connection = await oracledb.getConnection({
          user: 'c##useradmin',
          password: '123',
          connectString: 'localhost/orcl'
      });
      console.log('Connection was successful!');
  
      // execute the SELECT statement
      const result = await connection.execute(
        
        `SELECT * FROM taxi`
  
      );
     
    
      console.log(result.rows);
  
      // render the template
      res.render('table3', { data: result.rows });
  
    } catch (err) {
      console.error(err);
      res.send('Error: ' + err.message);
    } finally {
      // close the database connection
      if (connection) {
        try {
          await connection.close();
          console.log('Connection was closed!');
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  async function getData4(req, res) {
    // establish a connection to the Oracle database
    let connection;
    try {
      connection = await oracledb.getConnection({
          user: 'c##useradmin',
          password: '123',
          connectString: 'localhost/orcl'
      });
      console.log('Connection was successful!');
  
      // execute the SELECT statement
      const result = await connection.execute(
        
        `SELECT * FROM motor`
  
      );
     
    
      console.log(result.rows);
  
      // render the template
      res.render('table4', { data: result.rows });
  
    } catch (err) {
      console.error(err);
      res.send('Error: ' + err.message);
    } finally {
      // close the database connection
      if (connection) {
        try {
          await connection.close();
          console.log('Connection was closed!');
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  async function getData5(req, res) {
    // establish a connection to the Oracle database
    let connection;
    try {
      connection = await oracledb.getConnection({
          user: 'c##useradmin',
          password: '123',
          connectString: 'localhost/orcl'
      });
      console.log('Connection was successful!');
  
      // execute the SELECT statement
      const result = await connection.execute(
        
        `SELECT * FROM covoiturage`
  
      );
     
    
      console.log(result.rows);
  
      // render the template
      res.render('table5', { data: result.rows });
  
    } catch (err) {
      console.error(err);
      res.send('Error: ' + err.message);
    } finally {
      // close the database connection
      if (connection) {
        try {
          await connection.close();
          console.log('Connection was closed!');
        } catch (err) {
          console.error(err);
        }
      }
    }
  }




  async function getData6(req, res) {
    // establish a connection to the Oracle database
    let connection;
    try {
      connection = await oracledb.getConnection({
          user: 'c##usernormal',
          password: '123',
          connectString: 'localhost/orcl'
      });
      console.log('Connection was successful!'); 
      // execute the SELECT statement
      const result = await connection.execute(       
        `SELECT * FROM c##useradmin.covoiturage`
      );  
      console.log(result.rows);
      // render the template
      res.render('table6', { data: result.rows });
    } catch (err) {
      console.error(err);
      res.send('Error: ' + err.message);
    } finally {
      // close the database connection
      if (connection) {
        try {
          await connection.close();
          console.log('Connection was closed!');
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  async function getData7(req, res) {
    // establish a connection to the Oracle database
    let connection;
    try {
      connection = await oracledb.getConnection({
          user: 'c##usernormal',
          password: '123',
          connectString: 'localhost/orcl'
      });
      console.log('Connection was successful!');
  
      // execute the SELECT statement
      const result = await connection.execute(
        
        `SELECT * FROM c##useradmin.taxi`
  
      );
     
    
      console.log(result.rows);
  
      // render the template
      res.render('table7', { data: result.rows });
  
    } catch (err) {
      console.error(err);
      res.send('Error: ' + err.message);
    } finally {
      // close the database connection
      if (connection) {
        try {
          await connection.close();
          console.log('Connection was closed!');
        } catch (err) {
          console.error(err);
        }
      }
    }
  }




  async function getData8(req, res) {
    // Etablir connexion au user normal
    let connection;
    try {
      connection = await oracledb.getConnection({
          user: 'c##usernormal',
          password: '123',
          connectString: 'localhost/orcl'
      });
      console.log('Connection was successful!');
      // select la table apres avoir doonées la permission pour access
      const result = await connection.execute(
             `SELECT * FROM c##useradmin.bus`
      );
      console.log(result.rows);
      res.render('table8', { data: result.rows });
    } catch (err) {
      console.error(err);
      res.send('Error: ' + err.message);
    } finally {
      // Terminet la connexion
      if (connection) {
        try {
          await connection.close();
          console.log('Connection was closed!');
        } catch (err) {
          console.error(err);
        }
      }
    }
  }


  async function getData9(req, res) {
    // establish a connection to the Oracle database
    let connection;
    try {
      connection = await oracledb.getConnection({
          user: 'c##usernormal',
          password: '123',
          connectString: 'localhost/orcl'
      });
      console.log('Connection was successful!');
  
      // execute the SELECT statement
      const result = await connection.execute(
        
        `SELECT * FROM c##useradmin.motor`
  
      );
     
    
      console.log(result.rows);
  
      // render the template
      res.render('table9', { data: result.rows });
  
    } catch (err) {
      console.error(err);
      res.send('Error: ' + err.message);
    } finally {
      // close the database connection
      if (connection) {
        try {
          await connection.close();
          console.log('Connection was closed!');
        } catch (err) {
          console.error(err);
        }
      }
    }
  }






  //reservation table les gens qui on reserver:


  async function getData11(req, res) {
    // establish a connection to the Oracle database
    let connection;
    try {
      connection = await oracledb.getConnection({
          user: 'c##useradmin',
          password: '123',
          connectString: 'localhost/orcl'
      });
      console.log('Connection was successful!');
  
      // execute the SELECT statement
      const result = await connection.execute(
        
        `SELECT * FROM busreserver`
  
      );
     
    
      console.log(result.rows);
  
      // render the template
      res.render('table11', { data: result.rows });
  
    } catch (err) {
      console.error(err);
      res.send('Error: ' + err.message);
    } finally {
      // close the database connection
      if (connection) {
        try {
          await connection.close();
          console.log('Connection was closed!');
        } catch (err) {
          console.error(err);
        }
      }
    }
  }


  async function getData12(req, res) {
    // establish a connection to the Oracle database
    let connection;
    try {
      connection = await oracledb.getConnection({
          user: 'c##useradmin',
          password: '123',
          connectString: 'localhost/orcl'
      });
      console.log('Connection was successful!');
  
      // execute the SELECT statement
      const result = await connection.execute(
        
        `SELECT * FROM taxireserver`
  
      );
     
    
      console.log(result.rows);
  
      // render the template
      res.render('table12', { data: result.rows });
  
    } catch (err) {
      console.error(err);
      res.send('Error: ' + err.message);
    } finally {
      // close the database connection
      if (connection) {
        try {
          await connection.close();
          console.log('Connection was closed!');
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  async function getData13(req, res) {
    // establish a connection to the Oracle database
    let connection;
    try {
      connection = await oracledb.getConnection({
          user: 'c##useradmin',
          password: '123',
          connectString: 'localhost/orcl'
      });
      console.log('Connection was successful!');
  
      // execute the SELECT statement
      const result = await connection.execute(
        
        `SELECT * FROM motorreserver`
  
      );
     
    
      console.log(result.rows);
  
      // render the template
      res.render('table13', { data: result.rows });
  
    } catch (err) {
      console.error(err);
      res.send('Error: ' + err.message);
    } finally {
      // close the database connection
      if (connection) {
        try {
          await connection.close();
          console.log('Connection was closed!');
        } catch (err) {
          console.error(err);
        }
      }
    }
  }


  async function getData14(req, res) {
    // establish a connection to the Oracle database
    let connection;
    try {
      connection = await oracledb.getConnection({
          user: 'c##useradmin',
          password: '123',
          connectString: 'localhost/orcl'
      });
      console.log('Connection was successful!');
  
      // execute the SELECT statement
      const result = await connection.execute(
        
        `SELECT * FROM covoituragereserver`
  
      );
     
    
      console.log(result.rows);
  
      // render the template
      res.render('table14', { data: result.rows });
  
    } catch (err) {
      console.error(err);
      res.send('Error: ' + err.message);
    } finally {
      // close the database connection
      if (connection) {
        try {
          await connection.close();
          console.log('Connection was closed!');
        } catch (err) {
          console.error(err);
        }
      }
    }
  }


















app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/list', function(req, res) {
    res.render("list.ejs")
});
app.get('/list2', function(req, res) {
    res.render("listnormal.ejs")
});














// app.post('/ll', (req, res) => {
//     let username = req.body.username;
//     let password = req.body.password;
    
//     if (req.body.Sign === "1") {
//       // Login action
//       oracledb.getConnection({
//         user: 'c##useradmin',
//         password: '123',
//         connectString: 'localhost/orcl'
//       }, function(err, connection) {
//         if (err) {
//           console.error(err.message);
//           return;
//         }
//         connection.execute(
//           `SELECT * FROM useradmin WHERE username = :username AND password = :password`,
//           {username: username, password: password},
//           function(err, result) {
//             if (err) {
//               console.error(err.message);
//               doRelease(connection);
//               return;
//             }
//             if (result.rows.length > 0) {
//               res.send('Login successful');
//             } else {
//               res.send('Login failed');
//             }
//             doRelease(connection);
//           });
//       });
//     } else if (req.body.Sign === "2") {
//         oracledb.getConnection({
//             user: 'c##useradmin',
//           password: '123',
//           connectString: 'localhost/orcl'
//           }, function(err, connection) {
//             if (err) {
//               console.error(err.message);
//               return;
//             }
//             connection.execute(
//               `SELECT * FROM usernormal WHERE username = :username AND password = :password`,
//               {username: username, password: password},
//               function(err, result) {
//                 if (err) {
//                   console.error(err.message);
//                   doRelease(connection);
//                   return;
//                 }
//                 if (result.rows.length > 0) {
//                   res.send('Login successful');
//                 } else {
//                   res.send('Login failed');
//                 }
//                 doRelease(connection);
//               });
//           });
//     } else {
//       res.send('Invalid action');
//     }
//   });
 