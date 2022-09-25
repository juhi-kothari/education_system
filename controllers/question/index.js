const Question = require('../../models/Question');

const questionController = {

    createQusetion: async(req, res) => {
        try {
            const {title , description, image, marks , options} = req.body;
            const question = new Question({
                title,
                description,
                image,
                marks,
                options
            });
            await question.save();

            res.status(200).send({
                status: true,
                message: "Question created successfully",
                data : question
            });

            
        } catch (error) {
            res.status(400).send({
                status: false,
                message: "Error:" + error.message

            });
        } 

    },
    fetchAllQuestions: async (req, res) => {
        try {
            console.log('hi');
            const questions = await Question.find({});
            res.status(200).send({
                status: true,
                message: "Questions fetched successfully",
                data : questions

            });

        } catch (error) {
            res.status(400).send({
                status: false,
                message: "Error:" + error.message
            });
        }

    },
    fetchQuestionById: async (req, res) => {
        try {
            const id = req.params.id;
            const question = await Question.findById(id);
            res.status(200).send({
                status: true,
                message: "question fetched successfully",
                data : question
            });

        } catch (error) {
            res.status(400).send({
                status: false,
                message: "Error:" + error.message
            });
        }

    },
    deleteQuestionById: async (req, res) => {
        try {
            const questionId = req.params.id;
            const question = await Question.findById(questionId);
            const deletedquestion = await Question.deleteOne(question);

            res.status(200).send({
                status: true,
                message: "Question deleted successfully",
                data : deletedquestion

            });

        } catch (error) {
            res.status(400).send({
                status: false,
                message: "Error:" + error.message
            });
        }

    },
    updateQuestionById: async (req, res) => {
        try {
            const { title, description, image , marks } = req.body;
            const questionId = req.params.id;
            const question = await Question.findOneAndUpdate(
                {
                    _id : questionId
                },
                {
                    $set :{
                        title,
                        description,
                        image,
                        marks
                    }
                }
            );
            await question.save();
            res.status(200).send({
                status: true,
                message: "Question updated successfully"

            });

        } catch (error) {
            res.status(400).send({
                status: false,
                message: "Error:" + error.message
            });
        }

    },
    addOption: async (req, res) => {
        try {
            const { title , correct} = req.body;
            const { questionId } = req.params;
            const question = await Question.findById(questionId);
            const newOption = {
                title,
                correct
            }
            question.options.push(newOption);
            await question.save();

            res.status(200).send({
                status: true,
                message: "option added successfully",
                data: question

            });

        } catch (error) {
            res.status(400).send({
                status: false,
                message: "Error:" + error.message
            });
        }

    },
    updateOption: async (req, res) => {
        try {
            const { title , correct} = req.body;
            const { questionId , id } = req.params;
            const question = await Question.findById(questionId);
            console.log(questionId);
            console.log(id);

            
            if( !question){
                return res.status(400).send({
                    status: false,
                    message: "Error: Question not found" 
                });
               
            }
            await Question.findOneAndUpdate(
                { 
                    _id : questionId , "options._id": id,
                },
                { $set : {
                    
                     "options.$.title" : title,
                     "options.$.correct" : correct,
                    
                    }
                },
                {
                    upsert:false,
                    runValidators : true
                }
                )
                await question.save();
            
            res.status(200).send({
                status: true,
                message: "option updated successfully",
                data : question 

            });

        } catch (error) {
            res.status(400).send({
                status: false,
                message: "Error:" + error.message
            });
        }

    }



}

module.exports = questionController;