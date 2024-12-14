export async function fetchGems(page = 0, size = 50) {
    const res = await fetch(`http://localhost:8080/api/skill-gems/get-all?page=${page}&size=${size}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch gems: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  }