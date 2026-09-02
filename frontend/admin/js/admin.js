const form = document.getElementById("publish-form");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  message.textContent = "Publishing...";

  const payload = {
    id: document.getElementById("project-id").value.trim(),
    name: document.getElementById("project-name").value.trim(),
    description: document.getElementById("description").value.trim(),
    version: document.getElementById("version").value.trim(),
    file_size: document.getElementById("file-size").value.trim(),
    drive_file_id: document.getElementById("drive-file-id").value.trim()
  };

  const secret = document.getElementById("admin-secret").value;

  try {
    const response = await fetch("/api/admin/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Secret": secret
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Publish failed");
    }

    message.textContent = "Project published successfully.";

    form.reset();

  } catch (error) {
    console.error(error);
    message.textContent = error.message;
  }
});
