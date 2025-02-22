import SQLite from 'react-native-sqlite-storage';

// Open the database
const db = SQLite.openDatabase(
  { name: 'mydatabase.db', location: 'default' },
  () => { console.log('Database opened'); },
  error => { console.log('Error opening database:', error); }
);

// Function to drop and recreate the users table
export const recreateTable = () => {
  db.transaction(tx => {
    // Drop the existing table if it exists
    tx.executeSql('DROP TABLE IF EXISTS users;', [], () => {
      console.log('Table dropped');
      
      // Now create the table again
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT
        );
      `, [], () => {
        console.log('Table created');
      });
    });
  });
};

// Function to create a users table if it doesn't exist (no longer needed if using recreateTable)
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT
      );
    `);
  });
};

// Function to insert data into the table
export const insertUser = (name, email) => {
  db.transaction(tx => {
    tx.executeSql(`
      INSERT INTO users (name, email) VALUES (?, ?);
    `, [name, email], (tx, results) => {
      console.log('User inserted successfully:', results);
    });
  });
};

// Function to get all users from the table
export const fetchUsers = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM users;', [], (tx, results) => {
      let users = [];
      for (let i = 0; i < results.rows.length; i++) {
        users.push(results.rows.item(i));
      }
      callback(users);
    });
  });
};

// Function to update a user's name by id
export const updateUser = (id, newName) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE users SET name = ? WHERE id = ?;', [newName, id]);
  });
};

// Function to delete a user by id
export const deleteUser = (id) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM users WHERE id = ?;', [id]);
  });
};
