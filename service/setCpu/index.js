import serverBuild from '../../request/pterodactyl/server/serverBuild.js'
import getServers from '../../request/pterodactyl/server/getServers.js'
import chalk from 'chalk';

const setCpu = async() => {
    try {
        const result = await getServers()
        if (result) {
            var thread = 1
            for (let data of result.data) {
                if (data.attributes.suspended == false && data.attributes.container.installed == 1) {
                    if (data.attributes.egg == 15) {
                        // for parms https://dashflo.net/docs/api/pterodactyl/v1/#req_11fc764c3ed648ca8e6d60bff860ca6d 14/02/2022
                        let parms = {
                            "limits": {
                                "io": 500,
                            },
                            "feature_limits": {},
                        }
                        await serverBuild(data.attributes.id, thread, data, parms)
                        thread = thread + 1
                    }
                    if (data.attributes.egg == 19) {
                        let parms = {
                            "limits": {
                                "io": 500,
                            },
                        }
                        await serverBuild(data.attributes.id, thread, data, parms)
                        thread = thread + 1
                    }
                }
            }
            console.log(chalk.yellow(chalk.bold('setCpu executed')))
        }
    } catch (e) {
        console.error(e)
    }
}

export default setCpu