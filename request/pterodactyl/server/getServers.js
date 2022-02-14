import { Options, serverHeaders } from "../index.js";
import axios from "axios";

const getServers = async() => {
    try {
        Options.method = "get";
        Options.url = `/api/application/servers`;
        Options.headers = serverHeaders;
        const result = await axios(Options);
        return result.data;
    } catch (e) {
        console.error(e);
    }
}

export default getServers;