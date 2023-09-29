/* eslint-disable no-console */
// import { connect } from '@/dbConfig/dbConfig';
// import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
// import bcryptjs from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import axios from 'axios'; // Use ES6 import syntax
// connect();

export async function GET(request: NextRequest) {
  try {
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

    const data = await axios.get(apiUrl);

    const response = NextResponse.json({
      message: data.data,
      success: true
    });

    console.log('response', response, 'response');
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
