import getServers from "../../request/pterodactyl/server/getServers.js";
import postShutdown from "./postShutdown.js";
import uptimeIdentifier from "./uptimeIdentifier.js";
import initIdentifier from "./initIdentifier.js";
import deleteIdentifier from "./deleteIdentifier.js";
import getPlayers from "../../request/pterodactyl/user/getPlayers.js";

const stillThere = async() => {
    try {
        const result = await getServers();
        if (result) {
            for (let data of result.data) {
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
    } catch (e) {
        console.error(e)
    }
}

export default stillThere;