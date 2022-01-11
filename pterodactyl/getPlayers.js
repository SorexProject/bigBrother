import { Options, userHeaders, debug } from "../index.js";
import axios from "axios";


async function getPlayers(identifier) {
    try {
        let aujourdhui = new Date();

        Options.method = "get";
        Options.url = `/api/client/servers/${identifier}/players`;
        Options.headers = userHeaders;
        const result = await axios(Options);
        // debug mode
        if (result) {
            if (debug === true) {
                console.log(`${aujourdhui} : route ${Options.url} ${result.status}`);
            }
        }
        if (result) {
            return result.data;
        }
    } catch (error) {
        console.log(`${aujourdhui} : route ${Options.url} : ${error}`);
        return;
    }
}
export { getPlayers };