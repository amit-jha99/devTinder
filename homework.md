- Create a repository
- Initialize the repository
- node_modules,package.json,package-lock.json
- Install express
- Create a server
- Listen to port 3000
- write request handler for /test.
- Install nodemon and update scripts inside package.json
- what are dependencies
- what is the use of "-g" while npm install
- Difference between caret and tilde (^ vs ~)

- initialize git
- .gitignore
- Create a remote repo on github
- Push all code to remote origin
- Play with routes and routes extensions,ex./hello,/, hello/2
- Order of the routes matter a lot 
- Install Postman app and make a workspace/collection > test API call
- Write logic to handle GET,POST,PATCH,DELETE,API Calls and test them on POSTMAN.
- Explore routing and use of ?,+,(),* in the routes
- Use of regex in routes /a/ /.*fly$/
- Reading the query params in the routes
- Reading the dynamic routes

- Multiple Router Handlers - Play with the code 
- next()
- next function and errors along with res.send()
- app.use("/route",rH,[rH2,rH3],rH4,rH5)
- what is a Middleware Why do we need it?
- How express JS basically handles requests behind the scenes
- Difference between app.use() and app.all()
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for user routes ,except /user/login
- Error Handling using app.use("/",(err,req,res,next) =>{});

- Create a free cluster on MongoDB official website (Mongo Atlas)
- Install mongoose library
- Connect your application to the Database "Connection-url" /devTinder
- Call the connectDB function and connect to database before starting application on 3000
- Create a userSchema and userModel
- Create POST /singup API  to add data to database
- Push some doucments using API calls from postman
- Error Handling using try ,catch
- JS object vs JSON (difference)
- Add the express.json() middleware to your app
- Make your signup API dynamic to receive data from the end user
- User.findOne with duplicate email ids which object will be returned
- API - Get user by email
- API - Feed API - GET/feed - get all the users from the database
- API - Get user by ID
- Create a delete user API 
- Difference between PATCH and PUT
- API - Update a user
- Explore the Mongoose Documention for Model methods
- What are options in a Model.findOneAndUpdate method, explore more about it 
- API - update the user with email id

- Explore schematype options from the documentation
- add required,unique,lowercase,min, minLength,trim
- Add default 
- Create a custom validate function for gender
- Improve the DB Schema - PUT all appropriate validation on each field in schema 
- Add timestamp to the userSchema
- Add API level validation to PATCH request & Singup POST API.
- Data Sanitization.Add API validation for each field.
- Install validator
- Explore validator library function and user validtor functions for password, email and URL.
- Never trust req.body

- validate data in Signup API
- Install bcrypt package
- Create PasswordHash using bcrypt.hash & save the user is encrypted password.
- Create login API
- Compare passwords and throw errors if email or password is invalid.

- install cookie-parser
- just send a dummy cookie to user
- create GET /profile API and check if you get cookie back
- install jsonwebtoken
- In login API, after email and password validation, create a JWT token and sent it back to user inside cookies.
- read the cookies inside your profiel API and find the loggedIn user.
- userAuth Middleware
- Add the userAuth middleware in Profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days.
- Create userSchema method to getJWT()
- Create userSchema method to comparepassword(passwordInputByUser)

- Explore tinder APIs
- Create a list of all API you can think of in Dev Tinder 
- Group multiple routes under respective routers.
- Read documentation for express.Router
- Create routes folder for managing auth,profile,request routers.
- Create authRouter,profileRouter,requestRouter.
- import these routers in app.js
- Create POST /logout API
- Create PATCH /profile/edit
- Create PATCH/profile/password API=> forgot password API.
- Make sure you validate all data in every POST, PATCH request.

- Create Connection Request Schema
- Send Connection Request API
- Proper validation of Data
- Think about all corner cases
- $or query $and query in mongoose
- pre.save() function
- Read more about indexes in MongoDB
- Why do we need index in DB?
- What is the advantages and disadvantages of creating?

- 
- Write code with proper validations for POST /user/request/review/:status/:requestId 
- Throught process GET vs POST 
- Read about ref and populate 
- write code for GET /user/reqeust/received with all the checks.
- Create GET /user/connections.

- Logic for GET /feed API
- Explore the $nin,$and,$ne and other query operators.


/feed?page = 1&limit = 10 => 1-10 => .skip(0) & .limit(10)

/feed?page= 2&limit= 10 => 11-20 => .skip(10) & .limit(10)

/feed?page = 3&limit = 10 =>21-30 => skip(20) & .limit(10)


.skip() & .limit()

skip = (page-1)*limit