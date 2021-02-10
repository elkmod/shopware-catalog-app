import { IDBPDatabase, IDBPTransaction } from "idb";

/**
 * Name of the product store
 */
const name: string = "store_navigation";

/**
 * Abstraction for creation of product store
 */
const upgrade = function (
  database: IDBPDatabase,
  oldVersion: number,
  newVersion: number | null,
  transaction: any
) {
  if (oldVersion < 1) {
    let navigationStore = database.createObjectStore(name, {
      keyPath: "id",
    });

    navigationStore.createIndex("depth", "depth");
  }
};

export { name, upgrade };
