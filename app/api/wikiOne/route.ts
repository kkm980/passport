/* eslint-disable no-console */
// import { connect } from '@/dbConfig/dbConfig';
// import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
// import bcryptjs from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import axios from 'axios'; // Use ES6 import syntax
// connect();

export async function GET(request: NextRequest, {params}) {
  try {
    const {text, method} = Object.fromEntries(request.nextUrl.searchParams);
    const url =
    `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=${text}`;
      const resp = await fetch(url);
      console.log(resp, "newres");
      const extractAPIContents = (json:any) => {
        const { pages } = json.query;
        return Object.keys(pages).map(id => pages[id].extract);
      };
      const json = await resp.json();
     const contents = extractAPIContents(json);
    const response = NextResponse.json({
      contents: contents,
      success: true,
      text:text
    });

    console.log('response', response, 'response');
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}