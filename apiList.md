# DevTinder APIS
## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password  Forgot password API

## connectionRequestRouter
- POST /request/send/:status/:userId status=ignored,interested
- POST /request/review/:status/:requestId


- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:reqeuestId

## userRouter
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profile of other users on platform.


Status: ignore,intereted,accepted,rejected