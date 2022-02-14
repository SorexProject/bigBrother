import { Options, userHeaders } from "../index.js";
import axios from "axios";

const power = async(identifier, signal) => {
    try {
        Options.method = "post";
        Options.url = `/api/client/servers/${identifier}/power`;
        Options.headers = userHeaders;
        Options.data = {
            "signal": `${signal}`
        }

        const result = await axios(Options);
        return result.data
    } catch (e) {
        console.error(e);
    }
}

export default power;