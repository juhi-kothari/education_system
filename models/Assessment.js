const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const AssessmentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  negativeMarking: {
    type: Boolean
  },
  duration: {
    type: Number,
  },

  questions:[{
    question :{
        type : Schema.Types.ObjectId,
        ref : 'Question'
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

module.exports = mongoose.model('Assessment', AssessmentSchema);