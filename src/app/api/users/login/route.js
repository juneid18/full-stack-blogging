import {connect} from '@/dbconfig/dbconfig';
import User from '@/module/userModule';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

connect();

export async function POST(request = NextRequest){
    try {
        const reqBody = await request.json();   //geting request body
        const {email, password} = reqBody;  // taking email and password from request body
        console.log(reqBody);

        const user = await User.findOne({email}) //finding the similer email in db
        console.log('user exist');

        const validPassword = await bcryptjs.compare(password, user.password); // passowrd bcrypt

        if(!validPassword){
            return NextResponse.json({error: 'check your credential'}, {status: 400})                
        }
        
        // adding id, username, email in tokenData object
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = jwt.sign(tokenData, process.env.TOKEN, {expiresIn: '1d'}); //createing jwt token
        // sending responce 
        const response = NextResponse.json({
            message: "Logged in Successs",
            success: true
        })
        // setting token in cookies
        response.cookies.set('token', token, {
            httpOnly: true
        })
        return response;
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})                
    }
}