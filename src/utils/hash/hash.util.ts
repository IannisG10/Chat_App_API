import bcrypt from 'bcrypt' 


export const comparePassword = async (password: string, lastPassword: string): Promise<boolean> => {
    try {
        const isPasswordMatched = await bcrypt.compare(password,lastPassword);
        if (!isPasswordMatched) {
            return false;
        };
        return true;
    } catch (error) {
        throw error
    }

}