import { IDBPDatabase, IDBPTransaction } from "idb";

/**
 * Name of the product store
 */
const name: string = "store_product";

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
    let productStore = database.createObjectStore(name, {
      keyPath: "id",
    });

    productStore.createIndex("category", "categories", {
      multiEntry: true,
    });
  }
};

export { name, upgrade };
