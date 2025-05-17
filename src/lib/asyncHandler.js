import dbConnect from "./dbConnect";

export const asyncHandler = (fn) => async (req, context) => {
  try {
    await dbConnect();
    return await fn(req, res, next);
  } catch (error) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
