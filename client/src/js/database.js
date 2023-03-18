import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    // create connection to database
    const connect = await openDB('jate', 1);

    // create a transaction and define its priveleges, in this case readwrite
    const trans = connect.transaction('jate', 'readwrite');

    // grab the objectStore
    const objStore = trans.objectStore('jate');

    // add to the database
    const data = objStore.put({value: content});

    const result = await data;
    console.log('Content saved to the database', result);
  } catch(err) {
    console.log(err)
  }
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // create connection to database
  const connect = await openDB('jate', 1);

  // create a transaction and define its priveleges, in this case readonly
  const trans = connect.transaction('jate', 'readonly');

  // grab the objectStore
  const objStore = trans.objectStore('jate');

  // store the data in a variable and return it
  const data = await objStore.get(1);
  return data;
}

initdb();
