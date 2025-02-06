import { IOtp, OTP } from "../../type";

export class OTPDataAcces {


    public async isAlreadyExistByEMmail(email: string) {
        try {
            const isAlreadyExist = await OTP.findOneAndDelete({ email }).exec();
            return isAlreadyExist;
        } catch (error) {
            throw error
        }
    }

    public async addNewOTP(Otp: Omit<IOtp,"id">){
        try {
            const newOTP = new OTP(Otp)
            const response = await newOTP.save();
            return response
        } catch (error) {
            throw error
        }
    }

    public async getAndDeleteOTPByOtp(Otp: Omit<IOtp,"id">){
        try {
            const existingOTP = await OTP.findOneAndDelete(Otp).exec();
            return existingOTP
        } catch (error) {
            throw error
        }
    }

    public async getAndDeleteOTPByEmail(email: string){
        try {
            await OTP.deleteOne({},{ email: email }).exec();
        } catch (error) {
            throw error
        }
    }
}