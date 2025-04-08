import { OTPDataAcces, userGetDataAcces, userPutDataAccess } from "../../data access";
import { IOtp, IUser } from "../../type";
import { comparePassword, hashPassword } from "../../utils";
import  bcrypt from 'bcrypt' 

export class UserPutService {

    constructor(
        private userPutDataAccess: userPutDataAccess,
        private userGetDataAccess: userGetDataAcces,
        private otpDataAccess: OTPDataAcces
    ){}

    public async updatePasswordByEmail(email: string, oldPassword: string, newPassword: string): Promise<boolean>{
        try {
            const isUserExist: IUser | null = await this.userGetDataAccess.getUserByEmail(email)
            if (!isUserExist){
                return false;
            }

            const isPasswordMatched = await comparePassword(oldPassword,isUserExist.password)
            if (!isPasswordMatched){
                return false;
            }

            // hasher le mot de passe
            const passworHashed: string = await hashPassword(newPassword)

            const response = await this.userPutDataAccess.updatePassword(email,passworHashed)
            if (!response){
                return false;
            }

            return true;
        } catch (error) {
            throw error
        }
    }

    public async updatePasswordByOtpVerification(otp: Omit<IOtp,"id" | "verified">,newPassword: string): Promise<boolean>{
        try {
            const isUserExist: IUser | null = await this.userGetDataAccess.getUserByEmail(otp.email)

            if (!isUserExist) return false

            // Vérifiaction OTP
            const OTP: IOtp | null = await this.otpDataAccess.getOTPByOtp(otp)
            if (!OTP) return false;
            if (!OTP.verified) return false;

            // hasher le mot de passe
            const passworHashed = await hashPassword(newPassword);

            const response = await this.userPutDataAccess.updatePassword(otp.email,passworHashed)
            if (!response){
                return false;
            }    

            await this.otpDataAccess.deleteOTPByEmail(otp.email);
            return true;
        } catch (error) {
            throw error
        }
    }

}