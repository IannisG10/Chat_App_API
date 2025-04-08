import { Request, Response, Router } from "express"
import { userGetService } from "../../services/user/userGet.service"
import { StatusCodes } from "http-status-codes"

export const UserRouteGet = (router: Router, service: userGetService) => {

    router.get('/user/:email', async (req: Request, res: Response) => {
        const { email } = req.params

        try {
            const user = await service.getUserByEmail(email)
            if (user){
                res.status(StatusCodes.OK).send(user)
            } else {
                res.status(StatusCodes.NOT_FOUND)
            }
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw error
        }
    })
}