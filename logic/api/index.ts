import * as OnlineApi from "./online"
import * as OfflineApi from "./offline"

const enum ENV {
  ONLINE = "online",
  OFFLINE = "offline"
}

const Api = OfflineApi

export default Api