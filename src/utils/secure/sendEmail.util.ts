import { Resend } from "resend";

const resend = new Resend('re_21Xnw1Xn_9DVoC4tSauAemMcSF9oeRXhZ')


export const sendEmail = async (destEmail: string,otp: number | string): Promise<null | object> => {
    const { data, error } = await resend.emails.send({
        from: 'Test Resend <onboarding@resend.dev>',
        to: [destEmail],
        subject: 'hello',
        html: `
            <body style="font-family: sans-serif;">
                <div style="width: 100%; height: 100%; border:red solid 1px; display: flex; justify-content: center;" >
                    <p>NOTRE LOGO</p>
                </div>

                <p style="font-family: sans-serif;">Vous avez demandé à réinitialiser votre mot de passe. Voici votre code
                    <a href="#" >
                        OTP
                    </a>
                </p>

                <h2 style="border: rgb(23, 23, 255) solid 1px; width: fit-content; padding: 5px 15px; letter-spacing: 4px; background-color: #c9c9ff; border-radius: 5px;">${otp}</h2>
                <p>Ce code est valable pendant 20 minutes. Ne le partagez avec personne pour des raisons de sécurité.</p>
                <p>Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet e-mail.</p>
                <p>Cordialement,</p>
                <h4>L'équipe de NOTRE EQUIPE</h4>
            </body>
        `,
    }) 

    if (error) {
        console.error(error)
        return null;
    }
    return data;
}