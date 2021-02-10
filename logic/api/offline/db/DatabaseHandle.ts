import { IDBPDatabase, openDB } from "idb";

import { upgrade as upgradeNavigationStore } from "./store/Navigation";
import { upgrade as upgradeProductStore } from "./store/Product";

const SHOPWARE_PWA_DATABASE_NAME = "shopware_pwa_data";
const SHOPWARE_PWA_DATABASE_VERSION = 1;

const open = async function (): Promise<IDBPDatabase> {
  if (typeof window == "undefined" || !window.indexedDB) {
    throw new Error(
      `Error initialising database ${SHOPWARE_PWA_DATABASE_NAME} - window.indexedDB is not available`
    );
  }

  return openDB(SHOPWARE_PWA_DATABASE_NAME, SHOPWARE_PWA_DATABASE_VERSION, {
    upgrade(database: IDBPDatabase, oldVerison, newVersion, transaction) {
      // Create navigation store
      upgradeNavigationStore(
        database,
        oldVerison,
        newVersion,
        transaction
      );

      // Create product store
      upgradeProductStore(
        database,
        oldVerison,
        newVersion,
        transaction
      );
    },
  });
};

export { open };
