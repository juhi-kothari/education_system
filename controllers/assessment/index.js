const Assessment = require('../../models/Assessment');

const assessmentController = {


    createAssessment: async (req, res) => {
        try {
            const { title, description, negativeMarking , duration , questions } = req.body;
            const assessment = new Assessment({
                title,
                description,
                negativeMarking,
                duration,
                questions 
            })
            await assessment.save();
            res.status(200).send({
                status: true,
                message: "Assessment created successfully",
                data: assessment

            });

        } catch (error) {
            res.status(400).send({
                status: false,
                message: "Error:" + error.message
            });
        }

    },

    fetchAssessmentById : async (req, res) => {
        try {
            const  assessmentId  = req.params.id;
            console.log(assessmentId);
            const assessment = await Assessment.findById(assessmentId)
            .populate(' questions  ');
            
        
            res.status(200).send({
                status: true,
                message: "Assessment fetched successfully",
                data: assessment

            });

        } catch (error) {
            res.status(400).send({
                status: false,
                message: "Error:" + error.message
            });
        }

    },
    fetchAllAssessment : async (req, res) => {
        try {
    
            const assessment = await Assessment.find({})
            .populate('questions');
            
        
            res.status(200).send({
                status: true,
                message: "Assessment fetched successfully",
                data: assessment

            });

        } catch (error) {
            res.status(400).send({
                status: false,
                message: "Error:" + error.message
            });
        }

    },

    updateAssessment: async (req, res) => {
        try {
            const { title, description, negativeMarking , duration, questionId } = req.body;
            const assessmentId = req.parama.id;
            const assessment = await Assessment.findOneAndUpdate(
                {
                    _id : assessmentId
                },
                {
                    $set:{
                        title,
                        description,
                        negativeMarking,
                        duration,
                       

                    }
                },
                { 
                    $push :{
                    questions : questionId

                   }
                }
            );
           
            await assessment.save();
            res.status(200).send({
                status: true,
                message: "Assessment updated successfully",
                data: assessment

            });

        } catch (error) {
            res.status(400).send({
                status: false,
                message: "Error:" + error.message
            });
        }

    },


    

}

module.exports = assessmentController;