import * as t from "io-ts";
import {isEmail} from "@utils/util"

const nonEmptyString =new t.Type<string, string, unknown>("mystring",t.string.is,(u,c)=>{
    if(typeof u!=="string"){
        return t.failure(u,c,"should be string")
    }
    if(u.length<2){
        return t.failure(u,c,"should be more than 2 caracters")
    }

    return t.success(u);
    },
    String);


const emailType=new t.Type<string,string, unknown>(
    "emailType",
    t.string.is,
    (u,c)=>{

        if(typeof u!=="string"){
            return t.failure(u,c,"Should be string")
        }
        if(!isEmail(u)){
            return t.failure(u,c,"Invalid email")
        }

        return t.success(u)
    },
    String
);


export const userCredentialsCodec=t.type({
    grant_type:t.union([t.literal("business_credentials"), t.literal("user_credentials")]),
    audience: t.union([t.literal("onboarding_service"), t.literal("authorization_service"),t.literal("business_service")]),
    email: emailType,
    password: nonEmptyString
});

export const businessCredentialsCodec=t.type({
    grant_type:t.union([t.literal("business_credentials"), t.literal("user_credentials")]),
    audience: t.union([t.literal("onboarding_service"), t.literal("authorization_service"),t.literal("business_service")]),
    business_id: nonEmptyString,
    business_secret: nonEmptyString
});


export const userToken=t.type({
    email: emailType,
    aud: nonEmptyString,
    jti: nonEmptyString,
    issuedurl: nonEmptyString,
    scope: nonEmptyString
});


export type userTokenType = t.TypeOf<typeof userToken>

export type userCredentialsType = t.TypeOf<typeof userCredentialsCodec>

export type businessCredentialsType = t.TypeOf<typeof businessCredentialsCodec>