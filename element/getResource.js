async function getResource(identifier) {
    try {
        Options.method = "get";
        Options.url = `/api/client/servers/${identifier}/resources`;
        Options.headers = userHeaders;
        const result = await axios(Options);
        // debug mode
        if (result) {
            if (debug === true) {
                console.log(`${aujourdhui} : route ${Options.url} ${result.status}`);
            }
        }
    } catch (error) {
        console.log(`${aujourdhui} : route ${Options.url} : ${error}`);
        return;
    }
}
export { getResource };