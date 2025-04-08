import { Router, Request, Response} from "express";
import { OTPService, UserPutService } from "../../services";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const OTPRoutes = (router: Router, serviceOTP: OTPService, serivceUserPut: UserPutService) => {

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
            const response: boolean = await serviceOTP.sendOTP(email)

            if (!response){
                res.status(StatusCodes.BAD_REQUEST).send({ "satus": ReasonPhrases.BAD_REQUEST, "message": "try query key=email and value=value of email"})
                return;
            }

            res.status(StatusCodes.OK).send({ "status": ReasonPhrases.OK, "message": "OTP sent successfully" })
        } catch (error) {
            throw error
        }
    })  

    // n'ajout rien pour le body pour le vérification d'un otp
    // ajout body newPassword et query email otp pour le changment d'un mdp
    router.post('/verify-otp',async (req: Request, res: Response) => {
        const dataEmail = req.query.email
        const dataOtp = req.query.otp
        const { newPassword } = req.body
        try {

            if (!dataEmail || !dataOtp) {
                res.status(StatusCodes.BAD_REQUEST).send({ "status": ReasonPhrases.BAD_REQUEST, "message": "try query email and otp" });
                return;
            }

            const email: string = dataEmail.toString();
            const otp: string = dataOtp.toString();

            const response: boolean  = await serviceOTP.verifyOTP({ email,otp })

            if (!response){
                res.status(StatusCodes.BAD_REQUEST).send({ "status": ReasonPhrases.BAD_REQUEST, "message": 'Invalid OTP' });
                return;
            }

            if (!newPassword){
                res.status(StatusCodes.OK).send({ "status": ReasonPhrases.OK, "message": "OTP verification successful" })
                return
            }

            const isPasswordChanged: boolean = await serivceUserPut.updatePasswordByOtpVerification({ email, otp },newPassword);

            if (!isPasswordChanged){
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ "status": ReasonPhrases.INTERNAL_SERVER_ERROR, "message": 'contact the admnistrator' });
                return;
            }

            res.status(StatusCodes.OK).send({
                "status": ReasonPhrases.OK,
                "message": "password change with success"
            })
        } catch (error) {
            throw error
        }
    })
}