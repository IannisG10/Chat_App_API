import { syncMongoDB } from "./synch/mongo.sync";
import { userPostDataAcces } from "./mongo/userPost.da";
import { userGetDataAcces } from "./mongo/userGet.da";
import { OTPDataAcces } from "./OTP/otp.da";
import { userPutDataAccess } from "./mongo/userPut.da";



export {
    syncMongoDB,
    userPostDataAcces,
    userGetDataAcces,
    OTPDataAcces,
    userPutDataAccess
}