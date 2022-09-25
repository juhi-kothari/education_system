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
            const { title, description, duration, price, discount} = req.body;
            const  courseId  = req.params.id;
            const course = await Course.findOneAndUpdate(
                {
                    _id : courseId
                },
                {
                    $set :{
                        title,
                        description,
                        duration,
                        discount,
                        price
                    }
                }
            );
    
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
            const courseId = req.params.id;
            const course = await Course.findById(courseId);

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
            const  courseId  = req.params.id;
            const course = await Course.findById(courseId);
            const deletedCourse = await Course.deleteOne(course);

            res.status(200).send({
                status: true,
                message: "Course deleted Successfully",
                data: deletedCourse
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
            const courseId = req.params.id;
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
            const {courseId , id } = req.params;
            const course = await Course.findById(courseId);
            if(!course){
                res.status(400).send({
                    status: false,
                    message: "Error: Course not exist",
                });

            }
           
            await Course.findOneAndUpdate(
                { 
                    _id : courseId , "instructor._id": id,
                },
                { $set : {
                    
                      "instructor.$.name" : name,
                     "instructor.$.social" : social,
                     "instructor.$.experience" : experience,
                    
                    }
                },
                {
                    upsert:false,
                    runValidators : true
                }
                )
            
            
           
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
           /* course.videos.forEach(video =>{
                if(video._id == id){
                   {
                       video.title =  title,
                       video.url = url,
                       video.description= description
                    }

                }
            })*/
            if(!course){
                res.status(400).send({
                    status: false,
                    message: "Error: Course not found" ,
                });
            }
            await Course.findOneAndUpdate(
                { 
                    _id : courseId , "videos._id": id,
                },
                { $set : {
                    
                     "videos.$.title" : title,
                     "videos.$.url" : url,
                     "videos.$.description" : description,
                    
                    }
                },
                {
                    upsert:false,
                    runValidators : true
                }
                )
        
            await course.save();
            

            res.status(200).send({
                status: true,
                message : "videos updated Successfully",
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