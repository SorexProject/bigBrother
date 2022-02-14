import { Options, serverHeaders } from "../index.js";
import axios from "axios";

const serverBuild = async(identifier, threads, data, parms) => {
    try {
        Options.method = "patch";
        Options.url = `/api/application/servers/${identifier}/build`;
        Options.headers = serverHeaders;
        Options.data = {
            "allocation": data.attributes.allocation,
            "memory": parms.limits.memory || data.attributes.limits.memory,
            "swap": parms.limits.swap || data.attributes.limits.swap,
            "disk": parms.limits.disk || data.attributes.limits.disk,
            "io": parms.limits.io || data.attributes.limits.io,
            "cpu": parms.limits.cpu || data.attributes.limits.cpu,
            "threads": threads || null,
            "feature_limits": {
                "databases": parms.feature_limits.databases || data.attributes.feature_limits.databases,
                "allocations": parms.feature_limits.allocations || data.attributes.feature_limits.allocations,
                "backups": parms.feature_limits.backups || data.attributes.feature_limits.backups
            }
        }
        const result = await axios(Options);
        return result.data
    } catch (e) {
        console.error(e);
    }
}

export default serverBuild;