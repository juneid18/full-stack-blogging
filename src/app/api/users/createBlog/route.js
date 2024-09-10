import { NextRequest, NextResponse } from "next/server";
import Blog from '@/module/blogModule';
import { connect } from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from '@/module/userModule';

connect()
export async function POST(request){
    try {
        const reqBody = await request.json();
        const { title, content, tag, image } = reqBody;
        console.log(reqBody);
        const user_ID = await getDataFromToken(request);
        console.log(user_ID);
        const publishAt = new Date();
        const {username} = await User.findById(user_ID);

        console.log(username);
        
        const BlogData = new Blog({
            userid : user_ID,
            username : username,
            title,
            content,
            tag,
            publishedAt:publishAt,
            image
        })

        const addBlog = await BlogData.save();

        return NextResponse.json({
            message:'Blog has created',
            success: true,
            addBlog
        })

        
    } catch (error) {
        console.log("error while creating Blog");
        toast.error(error.message);
        return NextResponse.json({
            message:'Error Occupied while sending blog data',
            success: false,
        })
    }
}