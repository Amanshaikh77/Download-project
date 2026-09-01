export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return Response.json({
        success: true,
        message: "Download Project API is running",
        time: new Date().toISOString()
      });
    }

    if (url.pathname === "/api/projects") {
      return Response.json({
        success: true,
        projects: []
      });
    }

    return new Response("Download Project Worker is running", {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=UTF-8"
      }
    });
  }
};
