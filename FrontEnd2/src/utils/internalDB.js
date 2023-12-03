import { openDB } from "idb";

const DB_NAME = "BimmersDB";
const DB_VERSION = 3;
const OBJECT_STORE_NAME = "EventsStore" + DB_VERSION;

async function openDatabase() {
  try {
    const db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
          // Create a new object store
          const store = db.createObjectStore(OBJECT_STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      },
    });
    return db;
  } catch (err) {
    console.error("Failed to create DB object store", err);
  }
}

export const fetchSavedEvents = async () => {
  const db = await openDatabase();
  const tx = db.transaction(OBJECT_STORE_NAME, "readonly");
  const store = tx.objectStore(OBJECT_STORE_NAME);
  const items = await store.getAll();

  return items;
};

export async function saveEventsToDB(newData) {
  const db = await openDatabase();
  const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
  const store = tx.objectStore(OBJECT_STORE_NAME);

  if (newData && newData.length > 0) {
    await store.clear();
  }

  for (const item of newData) {
    store.add(item);
  }

  await tx.done;

  fetchSavedEvents();
}

export async function clearEventsFromDB() {
  const db = await openDatabase();
  const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
  const store = tx.objectStore(OBJECT_STORE_NAME);

  await store.clear();
}