const Task = require("../repository/task.schema");
const User = require("../repository/user.schema");
const asyncErrorHandler = require("../config/GlobalExceptionHandler");
const {verifyToken} = require("../middleware/auth.middleware");
const redisClient = require("../config/redis.config");

const createTask = asyncErrorHandler(async (req, res) => {
    const body = req.body;

    const {title,description,status} =body;

    if(!title){
        return res.status(400).json({
            message: "title is required"
        });
    }else if(!description){
        return res.status(400).json({
            message: "description is required"
        });
    }else if(!status){
        return res.status(400).json({
            message: "status is required"
        });
    }


        // cache invalidation to all task
     const cacheKey = `tasks:all`;
     await redisClient.del(cacheKey);

      let token = req.headers.authorization;
      const decodeToken  = verifyToken(token);
      const {id} = decodeToken;

    const task ={
        title,
        description,
        status, 
        createdBy:id
    }
   // creating a record
    const savedTask = await Task.create(task);

    res.status(201).json({
        status:true,
        message: "Task created successfully",
        data: savedTask
    });
});

const getTasks = asyncErrorHandler(async (req, res) => {
    
    const cacheKey = `tasks:all`;
    // check and return if result persent in cache
     const cachedTasks = await redisClient.get(cacheKey);
    if (cachedTasks) {
        return res.status(200).json({
            status:true,
            message: "Tasks fetched successfully",
            data: JSON.parse(cachedTasks)
        });
    }
    
    const tasks = await Task.find();
    
      await redisClient.setEx(
        cacheKey,
        300,
        JSON.stringify(tasks)
    );

    res.status(200).json({
        status:true,
        message: "Tasks fetched successfully",
        data: tasks
    });
});


const assignedTaskToUser = asyncErrorHandler(async (req, res) => {
    const { taskId, userId } = req.body;

    if (!taskId || !userId) {
        return res.status(400).json({
            message: "taskId and userId are required"
        });
    }



   
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    
    // cache invalidiate for userId, to get the updated record 
    const cacheKey = `tasks:user:${userId}`;
     await redisClient.del(cacheKey);

    const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { assignedTo: userId },
        { new: true }
    ).populate("assignedTo", "name email");

    if (!updatedTask) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

  
    res.status(200).json({
        message: "Task assigned successfully",
        data: updatedTask
    });
});


const getAssignedTask=asyncErrorHandler(async(req,res)=>{
     let token = req.headers.authorization;
     let decodedToken = verifyToken(token);
     const {email,id}=decodedToken;

     const cacheKey = `tasks:user:${id}`;

     const cachedTasks = await redisClient.get(cacheKey);
    if (cachedTasks) {
        return res.status(200).json({
            status:true,
            message: "Tasks fetched successfully",
            data: JSON.parse(cachedTasks)
        });
    }
    
     

    const tasks = await Task.find({ assignedTo: id });


     await redisClient.setEx(
        cacheKey,
        300,
        JSON.stringify(tasks)
    );


      res.status(200).json({
        message: "Tasks fetched successfully",
        data: tasks
    });
})


const updateTaskStatus = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    let token = req.headers.authorization;
     let decodedToken = verifyToken(token);
     const {email,userId}=decodedToken;

    const cacheKey = `tasks:user:${userId}`;
     await redisClient.del(cacheKey);

    if(!id){
        res.status(400).json({
            status:false,
            message: "id is required"
        })
    }

    if(!status){
        res.status(400).json({
            status:false,
            message: "status is required"
        })
    }

    const updatedTask = await Task.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );

    if (!updatedTask) {
        return res.status(404).json({
            status:false,
            message: "Task not found"
        });
    }

    res.status(200).json({
        message: "Task status updated",
        data: updatedTask
    });
});

module.exports = { createTask, getTasks ,assignedTaskToUser,getAssignedTask,updateTaskStatus};


