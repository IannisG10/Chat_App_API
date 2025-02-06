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
            await this.OTPDataAccess.getAndDeleteOTPByEmail(email)

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

    public async verifyOTP(otp: Omit<IOtp,"id">): Promise<boolean>{
        try {
            const existingOTP = await this.OTPDataAccess.getAndDeleteOTPByOtp(otp)
    
            if (!existingOTP) {
                return false;
            }
    
            return true;
        } catch (error) {
            throw error
        }
    }
}

