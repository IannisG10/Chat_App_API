import { Document, Schema, model } from 'mongoose'

interface Otp extends Document {
    id: string,
    email: string;
    otp: string;
    verified: boolean
}

export interface IOtp {
    id: string,
    email: string,
    otp: string,
    verified: boolean
}

const otpSchema = new Schema<Otp>({
    id: {
        type: String,
        required: false,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
})
export const OTP = model<Otp>('otps',otpSchema);