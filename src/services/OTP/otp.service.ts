import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { OTPDataAcces } from '../../data access';
import { generateOTP, sendEmail } from '../../utils';
import { IOtp, OTP } from '../../type';



export class OTPService {
    constructor(
        private OTPDataAccess: OTPDataAcces
    ){}

    public async sendOTP(email: string): Promise<boolean>{
        try {
            await this.OTPDataAccess.deleteOTPByEmail(email)

            const otp = generateOTP();
            const newOTP = new OTP({ email, otp })
            await this.OTPDataAccess.addNewOTP(newOTP)

            const isSended = await sendEmail(email,otp)
            
            if (!isSended) {
                return false;
            }

            return true;
        } catch (error) {
            throw error
        }
    }

    public async verifyOTP(otp: Omit<IOtp,"id" | "verified">): Promise<boolean>{
        try {
            const existingOTP = await this.OTPDataAccess.getOTPByOtp(otp)
    
            if (!existingOTP) {
                return false;
            }
    
            await this.OTPDataAccess.setOtpToVerified(otp);
            return true;
        } catch (error) {
            throw error
        }
    }
}

