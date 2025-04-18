import { userGetDataAcces } from "../../data access";
import { IUser } from "../../type";


export class userGetService {

    constructor(
        private userGetDataAcces: userGetDataAcces
    ){}

    public async getUserByEmail(email: string): Promise<Omit<IUser,"password"> | null> {
        try {
            const user: IUser | null = await this.userGetDataAcces.getUserByEmail(email);
            if (!user) return null;

            const userObject = Object.assign({},{
                id: user.id,
                username: user.username,
                email: user.email
            });
            return userObject
        } catch (error) {
            throw error
        }
    }
}

