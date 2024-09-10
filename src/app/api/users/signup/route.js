import {connect} from '@/dbconfig/dbconfig';
import User from '@/module/userModule';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import { sendmail } from '@/helper/mailer';

connect();
export async function POST(request = NextRequest){
    try { 

        const reqBody = await request.json();   //getting responce data  
        const {username, email, password} = reqBody; // extracting username, email, password from request body
        console.log(reqBody);

        const user = User.findOne({email}); //finding email is alredy in db

        //hashing the password
        const salt = await bcryptjs.genSalt(10); 
        const hashPassword = await bcryptjs.hash(password, salt);

        // adding hash password in user module
        const newUser = new User({
            username,
            email,
            password: hashPassword
        })
        const savedUser = await newUser.save(); //saving the user data
        console.log(savedUser);

        await sendmail({email, emailType: 'VERIFY', userId: savedUser._id}) //sending the mail of verification

        // pushing next responce
        return NextResponse.json({
            message: "User Registerd Successfull",
            success: true,
            savedUser
        })        
        
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})        
    }
}