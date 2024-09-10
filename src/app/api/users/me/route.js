import {connect} from '@/dbconfig/dbconfig';
import User from '@/module/userModule';
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helper/getDataFromToken';

connect();
export async function POST(request = NextRequest){
    try {
    // Extraction token 
    const userID = await getDataFromToken(request);
    const user = await User.findById({_id: userID}).select("-password");
    // checking is user avalible
    if (!user) {
        console.log("Error");
    }
    // sending next Responce message
    return NextResponse.json({
        message: 'User found',
        data: user
    })
    } catch (error) {
        throw new Error(error.message);
    }
}