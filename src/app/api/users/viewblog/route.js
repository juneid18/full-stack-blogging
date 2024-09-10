import Blog from "@/module/blogModule";
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request = NextRequest) {
    try {
        const requestBody = await request.json();
        const {id} = requestBody;

        if (!id) {
            return NextResponse.json({
                message: "Id is not received",
                status: false
            }, { status: 400 });
        }
        console.log(id);
        
        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({
                message: "Blog not found",
                status: false
            }, { status: 404 });
        }
        return NextResponse.json({
            data : blog,
            status: true
        })
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            status: false
        })
    }
}