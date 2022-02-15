import { Options, userHeaders } from "../index.js";
import axios from "axios";

const getResourcesServer = async(identifier) => {
    try {
        Options.method = "get";
        Options.url = `/api/client/servers/${identifier}/resources`;
        Options.headers = userHeaders;
        const result = await axios(Options);
        return result.data;
    } catch (e) {
        console.error(e);
    }
};

export default getResourcesServer;