const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  marks: {
    type: Number
  },
  
  options: [{
   
    title: {
      type: String
    },
    correct: {
      type: Boolean
    }
  }],
  createAt:{
    type: Date,
    default : Date.now()
  },
  modifiedAt:{
    type: Date,
    default : Date.now()
  }


});

module.exports = mongoose.model('Question', QuestionSchema);