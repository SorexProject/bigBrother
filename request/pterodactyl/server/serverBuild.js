import { Options, userHeaders } from "../index.js";
import axios from "axios";

const serverBuild = async(identifier, signal) => {
    try {
        Options.method = "post";
        Options.url = `/api/client/servers/${identifier}/power`;
        Options.headers = userHeaders;
        Options.data = {
            "signal": `${signal}`
        }

        const result = await axios(Options);
        return true
    } catch (error) {
        return false
    }
}

export default serverBuild;