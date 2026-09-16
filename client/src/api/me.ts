async function getServerList() {
    try {
        const res = await fetch("/api/me/servers")
        if (!res.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await res.json();
    }
    catch (e) {
        console.error(e);
    }
}