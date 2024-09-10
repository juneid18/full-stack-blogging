import Blog from "@/module/blogModule";
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request) {
  try {
    const response = await Blog.find()
    return NextResponse.json({
        data: response,
        status: true,
    });
    // const responce = await Blog.find
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: false,
    });
  }
}
