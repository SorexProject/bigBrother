import { Options, userHeaders } from "../index.js";
import axios from "axios";

async function power(identifier, signal) {
    try {
        console.log(`${identifier} KILLED`)

        Options.method = "post";
        Options.url = `/api/client/servers/${identifier}/power`;
        Options.headers = userHeaders;
        Options.data = {
            "signal": `${signal}`
        }

        const result = await axios(Options);
        return
    } catch (error) {}
}
export { power };