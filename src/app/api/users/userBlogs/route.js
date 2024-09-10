import Blog from "@/module/blogModule";
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request) {
    const {id} = await request.json();

    try {
        const userResponce = await Blog.find({userid:id});
        return NextResponse.json({
            data: userResponce,
            status: true,
          });
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            status: false,
          });
    }
}