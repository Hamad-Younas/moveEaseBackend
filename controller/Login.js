const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { connection } = require("../utils/database");

function GenerateToken(user) {
  const payload = {
    // role: user.role,
    id: user.Id,
    email: user.Email
  };
  const token = jwt.sign(payload, "123456asdfghjkljasjdhgasdyt6rt2376tuasgd");
  return token;
}

async function Login(req, response) {
  console.log(req.query.email, req.query.password)
  const email = req.query.email;
  const password = crypto
    .createHash("sha256")
    .update(req.query.password)
    .digest("hex");

  connection.query(
    `
    SELECT Id,Email,CompanyLogo,CompanyName FROM Companies 
    WHERE Email='${email}' AND Password='${password}' and Active = true
    `,
    (err, res) => {
      if (err) throw err;
      else {
        if (res.length == 0) {
          return response.status(200).json({ message: "invalid" });
        } else {
          var token = GenerateToken(res);
          return response.status(200).json({
            message: "success",
            email: res[0].Email,
            id: res[0].Id,
            logo: res[0].CompanyLogo,
            name: res[0].CompanyName,
            token: token,
          });
        }
      }
    }
  );
}

async function LoginAdmin(req, response) {
  console.log(req.query.email, req.query.password)
  const email = req.query.email;
  const password = crypto
    .createHash("sha256")
    .update(req.query.password)
    .digest("hex");

  connection.query(
    `
    SELECT id,email FROM Users 
    WHERE email='${email}' AND password='${password}'
    `,
    (err, res) => {
      if (err) throw err;
      else {
        if (res.length == 0) {
          return response.status(200).json({ message: "invalid" });
        } else {
          var token = GenerateToken(res);
          return response.status(200).json({
            message: "success",
            email: res[0].Email,
            token: token,
          });
        }
      }
    }
  );
}

async function CompanyCount(req, res) {
  connection.query(
    'SELECT COUNT(Id) AS count FROM Companies',
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ message: 'Error executing query' });
      } else {
        if (result.length === 0) {
          return res.status(200).json({ message: 'invalid' });
        } else {
          return res.status(200).json({ count: result[0].count });
        }
      }
    }
  );
}


async function AllCompany(req, res) {
  connection.query(
    'SELECT * FROM Companies',
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ message: 'Error executing query' });
      } else {
        if (result.length === 0) {
          return res.status(200).json({ message: 'invalid' });
        } else {
          return res.status(200).json(result);
        }
      }
    }
  );
}


module.exports = {
  Login,
  LoginAdmin,
  CompanyCount,
  AllCompany
};
