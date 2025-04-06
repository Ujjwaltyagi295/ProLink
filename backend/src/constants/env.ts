const getenv=(key:string , defaultvalue?:string):string=>{
    const value= process.env[key] || defaultvalue
    if(value=== undefined){
        throw new Error(`missing environment variable: ${key}`,)

    }
    return value
}

export const NODE_ENV = getenv("NODE_ENV", "development");
export const PORT = getenv("PORT", "4004");
export const DATABASE_URI = getenv("DATABASE_URI");
export const APP_ORIGIN = getenv("APP_ORIGIN");
export const JWT_SECRET = getenv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getenv("JWT_REFRESH_SECRET");
