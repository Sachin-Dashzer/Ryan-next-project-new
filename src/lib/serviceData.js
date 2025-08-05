
const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/service/get-service`;

export const getAllServices = async () => {
  try {
    const res = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.error("getAllServices error:", error.message);
    return [];
  }
};

export const getServiceBySlug = async (id) => {
  try {
    const res = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();
    const Services = result.data || [];

    return Services.find((Service) => Service.metadata?.pageurl === id) || null;
  } catch (error) {
    console.error("getServiceBySlug error:", error.message);
    return null;
  }
};
