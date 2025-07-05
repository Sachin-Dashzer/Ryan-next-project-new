// app/api/register/route.js (for App Router)

import Service from '@/models/service'; 
import { withDB } from '@/lib/withDB'; 

async function registerHandler(request) {
  try {
    const data = await request.json();
    
    const newService = new Service(data);
    const savedService = await newService.save();
    
    return Response.json({
      success: true,
      message: 'Service registered successfully',
      data: savedService
    }, { status: 201 });
    
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json({
      success: false,
      message: 'Registration failed',
      error: error.message
    }, { status: 400 });
  }
}

export const POST = withDB(registerHandler);

