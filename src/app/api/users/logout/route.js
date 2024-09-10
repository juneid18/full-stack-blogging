import {connect} from '@/dbconfig/dbconfig';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request = NextRequest){
    try {
        // sending responce message
        const response = NextResponse.json({
            message: 'Logout Successfuly',
            success: true
        })
        // seting cookie to '' empty
        response.cookies.set('token', "",{
            httpOnly: true,
            expires: new Date(0),
        })
        return response;
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})                
    }
}