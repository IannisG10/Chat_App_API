import { User, IUser } from "../../type";

export class userGetDataAcces {

    public async getUserByEmail(email: string): Promise<IUser | null> {
        try {
            const data: IUser | null = await User.findOne({ email: email }).exec(); // null if not found
            return data;
        } catch (error) {
            throw error
        }
    }
    
}