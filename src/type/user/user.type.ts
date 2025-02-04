import { Document, Schema, model } from "mongoose";

interface User extends Document {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface IUser {
    id: string;
    firstname: string;
    lastname: string;
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
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
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