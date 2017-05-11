let fs = require("fs");
let util = require('util');
let JsonUtils = require('../utils/JsonUtils');

let json_file = __dirname + "/" + "todos.json";
function Todos() { }

//
Todos.getAll = (callback) => {
  fs.readFile(json_file, 'utf8', (err, data) => {
    let todos = JSON.parse(data);
    return callback(err, JSON.stringify(todos));
  });
};

//
Todos.add = (item, callback) => {
  fs.readFile(json_file, 'utf8', (err, data) => {
    if (err) return callback(err);

    let todos = JSON.parse(data); // convert to json obj
    todos.push(item);
    let json = JSON.stringify(todos); // convert it back to json string
    // write it back 
    fs.writeFile(json_file, json, 'utf8', (err, data) => {
      return callback(err, JSON.stringify(item));
    });
  });
};

//
Todos.remove = (todo_id, callback) => {
  fs.readFile(json_file, 'utf8', (err, data) => {
    if (err) return callback(err);

    let todos = JSON.parse(data);
    let new_todos = todos.filter(function (candidate) {
      return candidate.id !== todo_id;
    });

    // write it back 
    let json = JSON.stringify(new_todos);
    fs.writeFile(json_file, json, 'utf8', (err, data) => {
      return callback(err, JSON.stringify({ id: todo_id }));
    });
  });
};

//
Todos.update = (item, callback) => {
  fs.readFile(json_file, 'utf8', (err, data) => {
    if (err) return callback(err);

    let todos = JSON.parse(data);
    let keys = Object.keys(item);

    for (let todo of todos) {
      if (todo.id == item.id) {
        for (key of keys) {
          todo[key] = item[key];
        }
        break;
      }
    }

    // write it back 
    let json = JSON.stringify(todos);
    fs.writeFile(json_file, json, 'utf8', (err, data) => {
      return callback(err, JSON.stringify(item));
    });
  });
};

//
Todos.toggleAll = (isCompleted, callback) => {
  fs.readFile(json_file, 'utf8', (err, data) => {
    if (err) return callback(err);

    let todos = JSON.parse(data);
    for (let todo of todos) {
      todo.isCompleted = isCompleted;
    }

    // write it back 
    let json = JSON.stringify(todos);
    fs.writeFile(json_file, json, 'utf8', (err, data) => {
      return callback(err, JSON.stringify({ isCompleted }));
    });
  });
};

//
Todos.removeCompleted = (callback) => {
  fs.readFile(json_file, 'utf8', (err, data) => {
    if (err) return callback(err);

    let todos = JSON.parse(data);
    let new_todos = todos.filter(function (candidate) {
      return candidate.isCompleted == false;
    });

    // write it back 
    let json = JSON.stringify(new_todos);
    fs.writeFile(json_file, json, 'utf8', (err, data) => {
      return callback(err, JSON.stringify({}));
    });
  });
};

module.exports = Todos;
