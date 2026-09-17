export async function getServerById(id) {
    try {
        const res = await fetch(`/api/servers/${id}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch server: ${res.status}`)
        }
        return await res.json();
    }
    catch (e) {
        console.error(e);
    }
}