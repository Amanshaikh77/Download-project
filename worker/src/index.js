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
      try {
        const result = await env.DB
          .prepare(`
            SELECT
              id,
              name,
              description,
              version,
              file_size,
              drive_file_id,
              created_at
            FROM projects
            ORDER BY datetime(created_at) DESC
          `)
          .all();

        return Response.json({
          success: true,
          projects: result.results || []
        });
      } catch (error) {
        return Response.json(
          {
            success: false,
            error: "Database query failed"
          },
          { status: 500 }
        );
      }
    }

    return new Response("Download Project Worker is running", {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=UTF-8"
      }
    });
  }
};
