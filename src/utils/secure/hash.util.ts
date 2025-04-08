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


export const hashPassword = (password: string): Promise<string> => {
    return new Promise((resolve,reject) => {
        bcrypt.genSalt(10,(err,salt) => {
            if (err){
                reject(err)
                return;
            }

            bcrypt.hash(password,salt,(err,hash) => {
                if (err){
                    reject(err)
                    return; 
                }
                resolve(hash);
            });
        });
    });
}

