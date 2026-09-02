function json(data, status = 200) {
  return Response.json(data, { status });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return json({
        success: true,
        message: "Download Project API is running",
        time: new Date().toISOString()
      });
    }

    if (url.pathname === "/api/projects" && request.method === "GET") {
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

        return json({
          success: true,
          projects: result.results || []
        });
      } catch (error) {
        return json({
          success: false,
          error: "Database query failed"
        }, 500);
      }
    }

    if (url.pathname === "/api/admin/publish" && request.method === "POST") {
      try {
        const adminSecret = request.headers.get("X-Admin-Secret");

        if (!env.ADMIN_SECRET || adminSecret !== env.ADMIN_SECRET) {
          return json({
            success: false,
            error: "Unauthorized"
          }, 401);
        }

        const body = await request.json();

        const {
          id,
          name,
          description,
          version,
          file_size,
          drive_file_id
        } = body;

        if (
          !id ||
          !name ||
          !description ||
          !version ||
          !file_size ||
          !drive_file_id
        ) {
          return json({
            success: false,
            error: "All fields are required"
          }, 400);
        }

        const createdAt = new Date().toISOString();

        await env.DB
          .prepare(`
            INSERT INTO projects
            (id, name, description, version, file_size, drive_file_id, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `)
          .bind(
            id,
            name,
            description,
            version,
            file_size,
            drive_file_id,
            createdAt
          )
          .run();

        return json({
          success: true,
          message: "Project published successfully"
        });
      } catch (error) {
        return json({
          success: false,
          error: "Publish failed"
        }, 500);
      }
    }

    return env.ASSETS.fetch(request);
  }
};
