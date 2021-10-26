const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const { Sequelize, DataTypes } = require('sequelize');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


const sequelize = new Sequelize("ToDo", "postgres", "MORISGRISHA", {
  dialect: "postgres",
  host: "localhost"
});

const func = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

};
func();

const ToDo = sequelize.define('ToDo', {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });

 



if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./file');
  }
  app.get("/string", (req, res) => {
    ToDo.findAll()
      .then((ToDos) => {
        res.status(200).json({ ToDos });
      })
      .catch(function (err) {
        console.log("findAll failed with error: " + err);
        return null;
      });
  });

  app.get("/string/:index", (req, res) => {
    const id = req.params.index;
    ToDo.findByPk(id)
      .then((ToDos) => {
        res.status(200).json({ ToDos });
      })
      .catch(function (err) {
        console.log("findByPk failed with error: " + err);
        return null;
      });
  });
app.put('/put-todo', (req, res) => {
    ToDo.update( {
        title: req.body.title,
        description: req.body.description
    }).then(() => {
        console.log(id);
      }).catch(function (err) {
            console.log("update failed with error: " + err );
            return 0;
        });
});
app.patch("/string/:index", (req, res) => {
    const id = req.params.index;
    ToDo.update(
      { title: req.body.title, description: req.body.description },
      { where: { id: id } }
    )
      .then(() => {
        res.status(200).json({});
      })
      .catch(function (err) {
        console.log("update failed with error: " + err);
        return 0;
      });
  
    res.status(200).json({ message: "Ok update" });
  });
app.post('/string', (req, res) => {
    ToDo.create({
        title: req.body.title,
        description: req.body.description
    }).then(ToDo => {
        res.status(200).json(ToDo);
    }).catch(function(err){
        console.log("create failed with error: " + err);
        return 0;
    });
});
app.delete("/string/:index", (req, res) => {
  const id = req.params.index;
  ToDo.destroy({
    where: { id: id },
  })
    .then(() => {
      res.status(200).json({ msg: "строка " + id + " удалена" });
    })
    .catch(function (err) {
      console.log("delete failed with error: " + err);
      return 0;
      // handle error;
    });
});

http.createServer(app).listen(80, () => {
    console.log('Server is working on port 80');
})