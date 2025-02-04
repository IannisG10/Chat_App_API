import { User, IUser } from "../../type";

export class userPostDataAcces {

    public async signup(newUser: IUser){
        try {
            const data = await User.create(newUser)
            return data;
        } catch (error) {
            throw error
        }
    }

    
}