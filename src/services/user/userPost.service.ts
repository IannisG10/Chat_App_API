import { v4 as uuidv4 } from 'uuid'
import { userGetDataAcces, userPostDataAcces } from '../../data access';
import { IUser, logUserResponse } from '../../type';
import  bcrypt  from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { comparePassword, generateToken, hashPassword} from '../../utils';

export class userPostService {

    constructor(
        private userPostDataAcces: userPostDataAcces,
        private userGetDataAcces: userGetDataAcces
    ){}

    public async SignUp(newUserWithoutId: Omit<IUser, "id">): Promise<logUserResponse | null> {
        try {
            const id: string =  uuidv4()

            // vérifier si l'email est déjà utiliser
            const IsUserAvailable: IUser | null = await this.userGetDataAcces.getUserByEmail(newUserWithoutId.email)
            if (IsUserAvailable) {
                return null;
            }

            // hasher le mot de passe
            const passworHashed: string = await hashPassword(newUserWithoutId.password)
            await this.userPostDataAcces.signup({
                id: id,
                firstname: newUserWithoutId.firstname,
                lastname: newUserWithoutId.lastname,
                email: newUserWithoutId.email,
                password: passworHashed
            })
    

            if (!process.env.JWT_KEY) {
                console.log(" verifie the JWT_KEY in .env");
                return null;
            };

            // Génerer token
            const token = generateToken({
                id: id,
                email: newUserWithoutId.email,
                password: newUserWithoutId.password
            },process.env.JWT_KEY)

            return Object.assign({},{ id: id, token: token })
        } catch (error) {
            throw error
        }
    }

    public async LogIn(email: string,password: string): Promise<logUserResponse | null >{

        try {
            //  Vérifier si l'email exist 
            const isUserExist: IUser | null = await this.userGetDataAcces.getUserByEmail(email)
            if (!isUserExist) {
               return null
            };


            // Vérifion le mot de passe
            const isPasswordMatched: boolean = await comparePassword(password,isUserExist.password)
            if (!isPasswordMatched){
                return null;
            }

            if (!process.env.JWT_KEY) {
                console.log(" verifie the JWT_KEY in .env");
                return null;
            };

            // génerer un token
            const token = generateToken({ 
                id: isUserExist.id, 
                email: isUserExist.email, 
                password: isUserExist.password 
            },process.env.JWT_KEY)
            
            return Object.assign({},{ id: isUserExist.id, token: token })
        } catch (error) {
            console.log(' Login error');
            throw error
        }
    }

    public async Auth(Token: string): Promise<string | JwtPayload | null > {
        try {
            const token = Token;
            if (!token) return null;

            if (!process.env.JWT_KEY) {;
                // jwt .env non trouvé
                return null;
            };
        
            const payload: JwtPayload | string = jwt.verify(token,process.env.JWT_KEY)   

            return payload;
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                return null;
            }
            throw error;
        }
    }
}