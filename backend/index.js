const express = require('express');
const mysql = require('mysql');


const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {EMAIL, PASSWORD} = require('./env')
const Mailgen = require('mailgen')

const app = express();

const port = 3556;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));





const connection = mysql.createConnection({
  host: '0.0.0.0',
  user: 'root',
  password: '',
  database: 'roadmate'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connexion à la base de données réussie');
  }
});

app.get('/api/villes', (req, res) => {
  const query = 'SELECT * FROM city';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des villes :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des villes' });
    } else {
      console.log('Villes récupérées avec succès');
      res.json(results);
    }
  });
});





app.get('/api/guido/:location', (req, res) => {
  const  location  = req.params.location;
  console.log(location)
  const query = `SELECT * FROM guidesinfo WHERE location = '${location}'`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des guides dans la ville :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des guides dans la ville' });
    } else {
      console.log('Guides dans la ville récupérés avec succès');
      res.json(results);
    }
  });
});


app.get('/api/guides/:name', (req, res) => {
  const guideName = req.params.name;

  const query = `SELECT * FROM guidesinfo WHERE fullName = '${guideName}'`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des informations du guide:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des informations du guide' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Guide not found' });
      } else {
        console.log('Informations du guide récupérées avec succès');
        const guideInfo = results[0];
        res.json(guideInfo);
      }
    }
  });
});





//Sign in management
app.post("/signin" ,(req, res)=>{
  const { username, password } = req.body;
  console.log({username, password});
  connection.query('SELECT * FROM users WHERE username=?',[username],(error,results)=>{
    if(error){
      console.error('Error querying MySQL:',error);
      res.status(500).json({success:false, message:'Internal server error'});
  } else if(results.length === 0){
      res.status(404).json({success:false, message:'User not found'});
  }else{
    const user = results[0];

    // Compare the provided password with the password stored in the database
    if (password === user.password) {
      // Passwords match, sign-in successful
      res.status(200).json({ success: true, message: 'Sign-in successful' });
    } else {
      // Passwords do not match
      res.status(401).json({ success: false, message: 'Incorrect password' });
    }
  }
});
});

//ForgotPassword
app.post("/forgotpass", (req, res) => {
  const { email } = req.body;
  console.log({ email });
  const code = crypto.randomBytes(4).toString("hex");
  console.log(code);

  // Check if the user exists in the database
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.error("Error checking user in the database:", error);
        res.status(500).json({ message: "Internal server error" });
      } else if (results.length === 0) {
        // User does not exist, return an error response
        res.status(400).json({ message: "User not found" });
      } else {
        // User exists, update the reset code in the database
        connection.query(
          "UPDATE users SET code = ? WHERE email = ?",
          [code, email],
          (error, results) => {
            if (error) {
              console.error("Error updating reset code in the database:", error);
              res.status(500).json({ message: "Internal server error" });
            } else {
              sendResetCode(email, code, res);
            }
          }
        );
      }
    }
  );
});



app.post('/resetpass', (req, res) => {
  const { email, code, password } = req.body;
  console.log('Reset Password:', email, code, password);

  connection.query(
    'SELECT * FROM users WHERE email = ? AND code = ?',
    [email, code],
    (error, results) => {
      if (error) {
        console.error('Error checking user in the database:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      } else if (results.length === 0) {
        // Incorrect code
        console.log('Incorrect code');
        res.status(200).json({ success: false, message: 'Incorrect code' });
      } else {
        // Code matches, update password in the database
        connection.query(
          'UPDATE users SET password = ? WHERE email = ?',
          [password, email],
          (error, results) => {
            if (error) {
              console.error('Error updating password in the database:', error);
              res.status(500).json({ success: false, message: 'Internal server error' });
            } else {
              console.log('Password updated successfully');
              res.status(200).json({ success: true, message: 'Password updated successfully' });
            }
          }
        );
      }
    }
  );
});







// Sign up screen management
app.post("/signup" ,(req, res)=>{
  const { username, email, password, repeatPassword } = req.body;

  connection.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], (error, results) => {
    if (error) {
      console.error('Error querying MySQL:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length > 0) {
      const existingUser = results.find(user => user.username === username);
      if (existingUser) {
        res.status(400).json({ message: 'Username already exists' });
      } else {
        res.status(400).json({ message: 'Email already exists' });
      }
    } else if (password !== repeatPassword) {
      res.status(400).json({ message: 'Passwords do not match' });
    } else {

       const confirmationCode = crypto.randomBytes(5).toString('hex');
         // Store user in database with unconfirmed status
         connection.query(
          'INSERT INTO users (username, email, password, confirmation_code, is_confirmed) VALUES (?, ?, ?, ?, ?)',
          [username, email, password, confirmationCode, false],
          (error) => {
            if (error) {
              console.error('Error inserting user into MySQL:', error);
              res.status(500).json({ message: 'Internal server error' });
            }
            else {
              // Send confirmation email
              sendConfirmationCode(email, confirmationCode, res);
          }
        }
      );
    }
  });
});
          
//sendConfirmationCode

const sendConfirmationCode = (userEmail, confirmationCode, res) => {
  let config = {
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD
    }
  };
  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Roadmate',
      link: 'https://mailgen.js/'
    }
  });

  let response = {
    body: {
      name: 'Roadmate',
      link:'www.roadmate.com',
      intro: 'Welcome to Roadmate!',
      table: {
        data: [
          {
          item: 'Confirmation Code',
          description: confirmationCode
        },
        {
          item: 'Instructions:',
          description: 'Please enter the confirmation code in the Roadmate app to complete your registration.'
        }
      ]
      },
      outro: 'If you have any questions, feel free to contact our support team.'
    }
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: 'Roadmate - Registration Confirmation',
    html: mail
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: 'You should receive an email with the confirmation code.'
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

module.exports = {
  sendConfirmationCode
};




//sendResetCode


const sendResetCode = (userEmail, confirmationCode, res) => {
  let config = {
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD
    }
  };
  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Roadmate',
      link: 'https://mailgen.js/'
    }
  });

  let response = {
    body: {
      name: 'Roadmate',
      link:'www.roadmate.com',
      intro: 'Welcome to Roadmate!',
      table: {
        data: [
          {
          item: 'Reset Code',
          description: confirmationCode
        },
        {
          item: 'Instructions:',
          description: 'Please enter the code in the Roadmate app to reset your password.'
        }
      ]
      },
      outro: 'If you have any questions, feel free to contact our support team.'
    }
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: 'Roadmate - password reset',
    html: mail
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: 'You should receive an email with the confirmation code.'
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

module.exports = {
  sendResetCode
};









// Confirm Email 
app.post("/confirmemail/resendcode",(req,res)=>{
  const email = req.body.email;
  
  const newConfirmationCode = crypto.randomBytes(20).toString('hex');
  // Update the user's confirmation code in the database
  connection.query(
    'UPDATE users SET confirmation_code = ? WHERE email = ?',
    [newConfirmationCode, email],
    (error) => {
      if (error) {
        console.error('Error updating confirmation code in the database:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        // Send the new confirmation code to the user's email
        sendConfirmationCode(email, newConfirmationCode, res);
      }
    }
  );
});


app.post('/confirmemail/confirm',(req,res)=>{

      const {email, confirmationCode} = req.body;
       console.log({email});

      //check if user exists
      connection.query('SELECT * FROM users WHERE email =? ',[email],(error,results)=>{
        if (error){
          console.error('Error querying MySQL:', error);
          res.status(500).json({success:false, message: 'Internal server error'});
        } else if(results.length === 0){
          res.status(404).json({succes:false, message:'User not found'});
        }else{
          const user = results[0];

          if(user.confirmation_code === confirmationCode){
            //Update the user's confirmmation status in the database
              connection.query(
                'UPDATE users SET is_confirmed=? WHERE email =?',
                [true,email],
                (error)=>{
                  if(error){
                    console.error('Error updating confirmation status in the database:',error);
                    res.status(500).json({success:false, message: 'Internal server error'});
                  }else{
                    res.status(200).json({success: true, message: 'Confirmation successful'});
                  }
                }
              );
          }else{
                res.status(500).json({success:false, message:'Invalid confirmation code'});
          }
        }
      });
});


app.post('/api/reservation', (req, res) => {
  const { guideName, clientName, date, duration } = req.body;
  const query = 'INSERT INTO reservations (guideName, clientName, date, duration) VALUES (?, ?, ?, ?)';
  connection.query(query, [guideName, clientName, date, duration], (error, results) => {
    if (error) {
      console.error('Erreur lors de la création de la réservation :', error);
      res.status(500).json({ error: 'Erreur lors de la création de la réservation' });
    } else {
      console.log('Réservation créée avec succès');
      res.json({ success: true, message: 'Réservation créée avec succès' });
    }
  });
});






app.listen(port, () => {
  console.log(`Serveur API en cours d'exécution sur le port ${port}`);
});
