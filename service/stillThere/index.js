import listServers from "../../request/pterodactyl/server/listServers.js";
import postShutdown from "./postShutdown.js";
import uptimeIdentifier from "./uptimeIdentifier.js";
import initIdentifier from "./initIdentifier.js";
import deleteIdentifier from "./deleteIdentifier.js";
import getPlayers from "../../request/pterodactyl/user/getPlayers.js";

const stillThere = async() => {
    try {
        const result = await listServers();
        if (result) {
            for (let data of result.data.data) {
                if (data.attributes.egg == 15 && data.attributes.suspended == false && data.attributes.container.installed == 1) {
                    const players = await getPlayers(data.attributes.identifier);
                    if (players.data.onlinePlayers == 0 && players.data.show == 1) {
                        await initIdentifier(data)
                        if (players.data.onlinePlayers == 0) {
                            await uptimeIdentifier(data)
                        }
                        await postShutdown(data);
                    } else {
                        await deleteIdentifier(data)
                    }
                }
            }
        }
        return;
    } catch (error) {
        return;
    }
}

export default stillThere;