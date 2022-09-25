const Assessment = require('../../models/Assessment');
const assessmentController = {


    createAssessment: async (req, res) => {
        try {
            res.status(200).send({
                status: true,
                message: "Assessment created successfully"

            });

        } catch (error) {
            res.status(400).send({
                status: false,
                message: "Error:" + error.message
            });
        }

    }
}

module.exports = assessmentController;