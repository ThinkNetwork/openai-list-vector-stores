window.function = async function(api_key, limit, order, after, before) {
    // Validate API Key
    if (!api_key.value) {
        return "Error: OpenAI API Key is required.";
    }

    // Construct query parameters
    const queryParams = new URLSearchParams();
    if (limit.value) queryParams.append("limit", limit.value);
    if (order.value) queryParams.append("order", order.value);
    if (after.value) queryParams.append("after", after.value);
    if (before.value) queryParams.append("before", before.value);

    // API endpoint URL
    const apiUrl = `https://api.openai.com/v1/vector_stores?${queryParams.toString()}`;

    // Make API request
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${api_key.value}`,
                "OpenAI-Beta": "assistants=v2"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return `Error ${response.status}: ${errorData.error?.message || "Unknown error"}`;
        }

        // Parse and return the response
        const responseData = await response.json();
        return JSON.stringify(responseData, null, 2);

    } catch (error) {
        return `Error: Request failed - ${error.message}`;
    }
};
