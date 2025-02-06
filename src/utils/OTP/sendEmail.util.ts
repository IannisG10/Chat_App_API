import { Resend } from "resend";

const resend = new Resend('re_21Xnw1Xn_9DVoC4tSauAemMcSF9oeRXhZ')


export const sendEmail = async (destEmail: string,otp: number | string): Promise<null | object> => {
    const { data, error } = await resend.emails.send({
        from: 'Test Resend <onboarding@resend.dev>',
        to: [destEmail],
        subject: 'hello',
        html: `
            <strong> 
                <h2 style="color:blue;" >${otp}</h2> this is your OTP to reset password. Don't partage this. 
            </stong>
        `,
    }) 

    if (error) {
        console.error(error)
        return null;
    }
    

    return data;
}