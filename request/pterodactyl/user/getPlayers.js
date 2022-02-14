import { Options, userHeaders } from "../index.js";
import axios from "axios";

const getPlayers = async(identifier) => {
    try {
        Options.method = "get";
        Options.url = `/api/client/servers/${identifier}/players`;
        Options.headers = userHeaders;
        const result = await axios(Options);
        return result.data;
    } catch (e) {
        console.error(e);
    }
}

export default getPlayers;