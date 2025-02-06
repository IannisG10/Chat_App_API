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

    public async getOTPByOtp(Otp: Omit<IOtp,"id" | "verified">): Promise<IOtp | null>{
        try {
            const otp: IOtp | null = await OTP.findOne(Otp).exec();
            return otp;
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

    public async deleteOTPByEmail(email: string){
        try {
            await OTP.deleteOne({},{ email: email }).exec();
        } catch (error) {
            throw error
        }
    }

    public async setOtpToVerified(Otp: Omit<IOtp,"id" | "verified">){
        try {
            await OTP.updateOne(Otp, { $set: { verified: true } })
        } catch (error) {
            throw error
        }
    }
}