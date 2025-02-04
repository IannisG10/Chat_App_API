import  mongoose  from 'mongoose'

export const syncMongoDB = async (url: string) => {
    try {
        await mongoose.connect(url)
        console.error(' Synchronisation mongoDB ok')
    } catch (error) {
        console.error(' Erreur lors de la synchronisation mongoDB')
        throw error
    }
}