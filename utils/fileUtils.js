const fs = require('fs');

function readContacts(filePath, callback) { 
    fs.stat(filePath, (err, stats) => {
        if (err || stats.isDirectory()) {
            // File missing or is a directory
            return callback('File not found', []);
        }
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return callback('Could not read file', []);
            }
            try {
                const contacts = JSON.parse(data);
                if (!Array.isArray(contacts)) return callback('Invalid file format', []);
                return callback(null, contacts);
            } catch(err) {
                return callback('Corrupted contacts file', []);
            }
        });
    });
}

function saveContacts(filePath, contacts, callback) { 
    const json = JSON.stringify(contacts, null, 2);
    fs.writeFile(filePath, json, 'utf8', (err) => {
        if (err) {
            return callback('Error writing file');
        }
        return callback(null);
    });
}

module.exports = { readContacts, saveContacts };
