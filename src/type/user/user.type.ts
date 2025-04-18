import { Document, Schema, model } from "mongoose";


//User: Document MongoDB (schema)
interface User extends Document {
    id: string;
    username: string;
    email: string;
    password: string;
}

// Type native
export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
}

export type logUserResponse = {
    id: string,
    token: string
}

const userSchema = new Schema<User>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    }
})
export const User = model<User>('users',userSchema);