var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const mongoose = require('mongoose')
const Person=require('./Models/Person')

var app = express();

const MONGO_URI='mongodb://localhost:27017/appDB'

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); //connect to mongoDB

let p =  Person({
  name: 'mohamed',
  age: 30,
  favoriteFoods: ['Pizza','Pasta']
})
p.save()

Person.create([{ name: 'Will Riker', age: 26, favoriteFoods: ['Pizza','Salad'] }, { name: 'Geordi LaForge',age: 32, favoriteFoods: ['Apple pie']}]);

Person.find({ name: 'Will Riker'},(error, data)=>{
  if(error){
    console.log(error)
  }
  else{
    console.log(data)
  }
});

Person.findOne({ name: 'mohamed'},(error, data)=>{
  if(error){
    console.log(error)
  }
  else{
    console.log(data)
  }
})

Person.findById(("6162bcd172beeb616c3acca9"),(error, data)=>{
  if(error){
    console.log(error)
  }
  else{
    console.log(data)
  }
})

Person.findByIdAndRemove("6162c4ba87fbe4aec4a123fb",(error,deleted)=>{
  if(error){
    console.log(error)
  }
  else{
    console.log(deleted)
  }
}) 


Person.remove({name:'Will Riker'},(error,del)=>{
  if(error){
    console.log(error)
  }
  else{
    console.log(del)
  }
});


Person.find({favoriteFoods:{$all:["Pizza"]}})
.sort({age:'asc'})
.limit(2)
.select('-age')
.exec((err, data)=>{
  if(!err){
    console.log(data);
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
