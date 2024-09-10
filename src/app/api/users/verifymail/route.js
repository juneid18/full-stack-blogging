import {connect} from '@/dbconfig/dbconfig';
import User from '@/module/userModule';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request = NextRequest){
    try {
        const reqBody = await request.json(); //taking responce
        const {token} = reqBody; //taking token from request body
        console.log(token);

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt : Date.now()}}); //finding token and expiry
        if(!user){
            return NextResponse.json({error: "invalid token"}, {status: 500})                 
        }
        console.log(user);
        
        user.isVerified = true;
        user.isAdmin = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "Email verification is successfull",
            success: true
        })   
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400})                
    }
             
}