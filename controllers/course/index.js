const Course = require('../../models/Course');

const courseController = {

    createCourse: async (req, res) => {
        try {

            const { title, description, duration, price, discount,instructor,videos } = req.body;
            const course = new Course({
                title,
                description,
                duration,
                price,
                discount,
                instructor,
                videos

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
            const { courseId } = req.queryparams;
            const course = await Course.findById(courseId);
            
               course.title = title,
                course.description = description,
                course.duration = duration,
                course.price = price,
                course.discount = discount

            

            await course.save();

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
            const { courseId } = req.query;
            console.log(courseId);
            const course = await Course.findById({ courseId } );
            console.log(course);

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
            await Course.deleteOne({id : courseId});

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
            const course = await Course.findById(courseId);
            course.instructor.forEach( instructor => {
                if(instructor._id == id){
                    {
                      instructor.name = name,
                       instructor.social = social,
                       instructor.experience = experience

                    }
                    
                }
           })
                await course.save();
    
    
                res.status(200).send({
                    status: true,
                    message: "Instructor updated Successfully",
                });

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

            course.videos.push(newVideo);
            await course.save();


            res.status(200).send({
                status: true,
                message: "video added Successfully",
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
                       video.title =  title,
                       video.url = url,
                       video.decription= description
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