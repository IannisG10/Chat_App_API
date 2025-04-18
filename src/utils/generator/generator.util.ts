import randomstring from "randomstring"
import { IUser } from "../../type"
import jwt from 'jsonwebtoken'

export const generateOTP = () => {
    return randomstring.generate({
        length: 6,
        charset: 'numeric'
    })
}

// génerer un token
export const generateToken = (User: Omit<IUser, "username">,JWT_KEY: string): string => {
    const token: string =  jwt.sign(
        User,
        JWT_KEY,
        { 
            expiresIn: (24 * (60 *(60 * 1000))) + 15
        }
    )
    return token
}

