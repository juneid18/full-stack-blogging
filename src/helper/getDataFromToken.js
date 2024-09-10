const { NextRequest } = require("next/server");
import jwt from 'jsonwebtoken';

export const getDataFromToken = (request = NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || ""; // gathering token from cookies
        const decodedToken = jwt.verify(token, process.env.TOKEN); //verifining JWT token
        return decodedToken.id; //returing verify token
    } catch (error) {
        console.log(error.message);
    }
}