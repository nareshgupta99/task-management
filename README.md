# Project Setup
Node v24.13.0
mongo db
Redis



# Architecture 
backend :- all files are seprated to business logic 
config:- contains confuration file like, security config to generate and verify jwt token, reddish config
controllers:- contains the actual business logic
middleware:- contains all middleware like authMiddleware for authenticating and authorised request before reaching to controller
repository:- contains the Monodb schema
routes:- contains the actual endpoint to the controller

# RBAC
To Achieve this created a role field inside user Model ,here i am considering one user have one role, so insteead creating of different document,directly saved into user document.

created a middleware named authorizedRole which recive the array of role and matched with the logined user role if they match we pass to the controller otherwise send a response 403 unauthorised status;


# Caching and Invalidation 
 
caching is impemented using redis. invalidation cache based on TTL of 300 second, and the update and create operation is perfomed.

getAll Task (Admin):- cacheKey-> task:all 

cached:- for get All task, first check in reddis if result exist then send the response back otherwise query from the db first save and return back;

invalidate:- whenever the new task is created

getAllAssignedTasks (user):- cacheKey->task:user:$userId

invalidate:- when manager assigned the task 


# Trade of 

-use global exception handler for clean code,
- use reddis for faster execuation





