const Course = require('../../models/Course');

const courseController = {

    createCourse: async (req, res) => {
        try {

            const { title, description, duration, price, discount } = req.body;
            const course = new Course({
                title,
                description,
                duration,
                price,
                discount

            });

            await course.save();

            res.status(200).send({
                status: true,
                message: "Course Created Successfully",
            });
        } catch (err) {
            res.status(400).send({
                status: false,
                message: "Error: " + err.message,
            });
        }
    },

    updateCourse: async (req, res) => {
        try {
            const {title, description, duration, price, discount} = req.body;
            const { courseId } = req.params;
            const course = await Course.findById(courseId);
            const  newCourse= {
                title,
                description,
                duration,
                price,
                discount

            };

            await course.save(newCourse);

            res.status(200).send({
                status: true,
                message: "Course Updated Successfully",
            });
        } catch (err) {
            res.status(400).send({
                status: false,
                message: "Error: " + err.message,
            });
        }
    },

    fetchAllCourses: async (req, res) => {
        try {
            const courses = await Course.find({}).select(['title', 'description', 'videos']);

            res.status(200).send({
                status: true,
                message: "Course fetched Successfully",
                data: courses
            });
        } catch (err) {
            res.status(400).send({
                status: false,
                message: "Error: " + err.message,
            });
        }
    },
    fetchCourseById: async (req, res) => {
        try {
            const { courseId } = req.params;
            const course = await Course.findById({courseId});

            res.status(200).send({
                status: true,
                message: "Course fetched Successfully",
                data: course
            });
        } catch (err) {
            res.status(400).send({
                status: false,
                message: "Error: " + err.message,
            });
        }
    },

    deleteCourseById: async (req, res) => {
        try {
            const { courseId } = req.params;
            const course = await Course.findById({courseId});
            await course.deleteOne();

            res.status(200).send({
                status: true,
                message: "Course deleted Successfully",
                data: course
            });
        } catch (err) {
            res.status(400).send({
                status: false,
                message: "Error: " + err.message,
            });
        }
    },
    


    addInstructor: async (req, res) => {
        try {
            const { name, social, experience } = req.body;
            const { courseId } = req.params;
            const course = await Course.findById(courseId);

            const newInstructor = {
                name,
                social,
                experience
            }

            course.instructor.push(newInstructor);
            await course.save();


            res.status(200).send({
                status: true,
                message: "Instructor added Successfully",
            });

        } catch (err) {
            res.status(400).send({
                status: false,
                message: "Error: " + err.message,
            });
        }


    },
    updateInstructor: async (req, res) => {
        try {
            const { name, social, experience } = req.body;
            const { courseId, id } = req.params;

            
            if(){
                const newInstructor = {
                    name,
                    social,
                    experience
                }
    
                course.instructor.push(newInstructor);
                await course.save();
    
    
                res.status(200).send({
                    status: true,
                    message: "Instructor updated Successfully",
                });

            }

           

        } catch (err) {
            res.status(400).send({
                status: false,
                message: "Error: " + err.message,
            });
        }
    },


    addVideo: async (req, res) => {
        try {
            const { title,url,description } = req.body;
            const { courseId} = req.params;
            const course = await Course.findById(courseId);

            const newVideo = {
                title,
                url,
                description
            }

            course.video.push(newVideo);
            await course.save();


            res.status(200).send({
                status: true,
                message: "Instructor added Successfully",
            });

        } catch (err) {
            res.status(400).send({
                status: false,
                message: "Error: " + err.message,
            });
        }
    },
    updateVideo : async (req, res) => {
        try {
            const { title,url,description  } = req.body;
            const { courseId ,id } = req.params;
            const course = await Course.findById(courseId);
            course.videos.forEach(video =>{
                if(video._id == id){
                   {
                       video.title =  title;
                       video.url = url,
                       video.decription= description;
                    }

                }
            })

        
            await course.save();
            

            res.status(200).send({
                status: true,
                message: "Instructor added Successfully",
            });
            
        } catch (err) {
            res.status(400).send({
                status: false,
                message: "Error: " + err.message,
            });
        }
    },



}

module.exports = courseController;