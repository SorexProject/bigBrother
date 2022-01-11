import { Options, userHeaders, debug } from "../index.js";
import axios from "axios";

async function power(identifier, signal) {
    try {
        Options.method = "post";
        Options.url = `/api/client/servers/${identifier}/power`;
        Options.headers = userHeaders;
        Options.data = {
            "signal": `${signal}`
        }

        const result = await axios(Options);
        // debug mode
        if (result) {
            if (debug === true) {
                console.log(`${aujourdhui} : route ${Options.url} ${result.status}`);
            }
        }
        return identifier + "kill";
    } catch (error) {}
}
export { power };