import { Request, Response, Router } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { userPostService } from "../../services"
import { logUserResponse } from "../../type"

export const UserRoutePost = (router: Router, service: userPostService) => {

    router.post('/signup', async (req: Request, res: Response) => {
        // Get the data from the request  
        const {  username, email, password } = req.body

        try {
            // test if all the datas are filled
            if ( !username || !email || !password){
                res.status(StatusCodes.BAD_REQUEST).send({
                    "status": ReasonPhrases.BAD_REQUEST,
                    "message": "all property is required"
                })
                return;
            }
            const  response: logUserResponse | null = await service.SignUp({  username, email, password })
            if (!response) {
                res.status(StatusCodes.BAD_REQUEST).send({
                    "status": ReasonPhrases.BAD_REQUEST,
                    "message": "email already exist"
                })
                return;
            }
            res.cookie("token_chat",response.token,{
                httpOnly: true,
                sameSite: true,
                maxAge: 24 * (60 * (60 * 1000)) // 24h
            })

            res.status(StatusCodes.OK).send({
                "status": ReasonPhrases.OK,
                "message": {
                    "id": response.id
                }
            })    

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw error
        }
    })

    router.post('/login', async (req: Request, res: Response) => {
        const { email, password } = req.body

        try {
            if (!email || !password){
                res.status(StatusCodes.BAD_REQUEST).send({
                    "status": ReasonPhrases.BAD_REQUEST,
                    "message": "all property is required"
                })
                return;
            }
            const response: logUserResponse | null = await service.LogIn(email,password);
            if (!response) {
                res.status(StatusCodes.BAD_REQUEST).send({
                    "status": ReasonPhrases.BAD_REQUEST,
                    "message": "try to change the password and/or email"
                })
                return
            }

            res.cookie("token_chat",response.token,{
                httpOnly: true,
                sameSite: true,
                secure: true,
                maxAge: 24 * (60 * (60 * 1000)) // 24h
            })

            res.status(StatusCodes.OK).send({
                "status": ReasonPhrases.OK,
                "message": {
                    "id": response.id
                }
            })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw error
        }
    })

    router.get('/auth', async (req: Request, res: Response) => {

        try {
            const token = req.cookies.token_chat;

            const isVerified = await service.Auth(token)

            if (!isVerified) {
                res.status(StatusCodes.NOT_FOUND).send({
                    "status": ReasonPhrases.NOT_FOUND,
                    "message": "log or signup first"
                })
                return;
            }

            res.status(StatusCodes.OK).send({
                "status": ReasonPhrases.OK,
                "message": isVerified
            })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw error
        }
    })
}
