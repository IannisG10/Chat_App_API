import { Router, Request, Response} from "express";
import { OTPService } from "../../services";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const OTPRoutes = (router: Router, service: OTPService) => {

    router.post('/sendotp', async (req: Request, res: Response) => {

        const  dataEmail  = req.query.email

        try {
            if (!dataEmail) {
                res.status(StatusCodes.BAD_REQUEST).send({
                    "status": ReasonPhrases.BAD_REQUEST,
                    "message": "try query key=email and value=value of email"
                })
                return
            }
    
            const email = dataEmail?.toString();
            const response: boolean = await service.sendOTP(email)

            if (!response){
                res.status(StatusCodes.BAD_REQUEST).send({ "satus": ReasonPhrases.BAD_REQUEST, "message": "try query key=email and value=value of email"})
                return;
            }

            res.status(StatusCodes.OK).send({ "status": ReasonPhrases.OK, "message": "OTP sent successfully" })
        } catch (error) {
            throw error
        }
    })  

    router.post('/verifyotp',async (req: Request, res: Response) => {
        const dataEmail = req.query.email
        const dataOtp = req.query.otp
        try {

            if (!dataEmail || !dataOtp) {
                res.status(StatusCodes.BAD_REQUEST).send({ "status": ReasonPhrases.BAD_REQUEST, "message": "try query email and otp" });
                return;
            }

            const email: string = dataEmail.toString();
            const otp: string = dataOtp.toString();

            const response: boolean  = await service.verifyOTP({ email,otp })

            if (!response){
                res.status(StatusCodes.BAD_REQUEST).send({ "status": ReasonPhrases.BAD_REQUEST, "message": 'Invalid OTP' });
                return;
            }

            res.status(StatusCodes.OK).send({ "status": ReasonPhrases.OK, "message": "OTP verification successful" })
        } catch (error) {
            throw error
        }
    })
}