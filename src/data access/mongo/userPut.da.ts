import { User } from "../../type";

export class userPutDataAccess {


    public async updatePassword(email: string,newHashedPassword: string){
        try {
            const response = await User.updateOne({email: email}, { $set: { password: newHashedPassword } }).exec();
            if (!response){
                return null
            }
            return response;
        } catch (error) {
            throw error
        }
    }
}