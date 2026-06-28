import aj from "../lib/arcject.js"
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjectProtection=async(req,res,next)=>{
    try{
        const decision=await aj.protect(req);
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({message:"rate limit exceeded"})
            }
        
        else if(decision.reason.isBot()){
            return res.status(403).json({message:"bot access denied"})
        }
        else{
             return res.status(403).json({message:"Declined due to security policy"})
        }
    }

    //check for the spoofed bot
    if(decision.results.some(isSpoofedBot)){
        return res.status(403).json({error:" spoofed box detected",message:"Malicious activity detected"})
    }

    }catch(error){
        console.error(error);
        next()
       }
}