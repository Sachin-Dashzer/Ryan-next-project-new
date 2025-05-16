


import { NextResponse } from "next/server";


export async function Get(req , res ){

    try{

        const body = await req.body()


    }
    catch(error){
        console.log(error)
    }
}