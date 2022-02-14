import { Options, serverHeaders } from "../index.js";
import axios from "axios";

const listServers = async() => {
    try {
        Options.method = "get";
        Options.url = `/api/application/servers`;
        Options.headers = serverHeaders;
        const result = await axios(Options);
        if (result) {
            return result.data;
        }
    } catch (e) {
        return;
    }
}

export default listServers;