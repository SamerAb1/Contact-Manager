const { readContacts, saveContacts } = require('../utils/fileUtils');
const { validateContact } = require('../utils/validation');

function addContact(contact, filePath, callback) { 
    readContacts(filePath, (err, contacts) => {
        if (err && err !== 'File not found') {
            return callback(err, []);
        }
        contacts = contacts || []; 
        const validation = validateContact(contact, contacts);
        if (!validation.valid) {
            return callback(validation.error, []);
        }
        contacts.push(contact);
        saveContacts(filePath, contacts, (err) => {
            if (err) return callback("Error: Could not save contacts", []);
            callback(null, contact, contacts.length); // success!
        });
    });
}

function deleteContact(email, filePath, callback) { 
    readContacts(filePath, (err, contacts) => {
        if (err) {
            return callback(err, []);
        }
        const index = contacts.findIndex(
            c => c.email && c.email.toLowerCase() === email.toLowerCase()
        );
        if (index === -1) {
            return callback(`Error: No contact found with email: ${email}`, contacts);
        }
        const deleted = contacts.splice(index, 1)[0];
        saveContacts(filePath, contacts, (err) => {
            if (err) return callback("Error: Could not save contacts", contacts);
            callback(null, deleted, contacts.length); // success!
        });
    });
}

function listContacts(filePath, callback) { 
    readContacts(filePath, (err, contacts) => {
        if (err) {
            return callback(err, []);
        }
        callback(null, contacts);
    });
}

function searchContacts(query, filePath, callback) { 
    readContacts(filePath, (err, contacts) => {
        if (err) {
            return callback(err, []);
        }
        const q = query.toLowerCase();
        const results = contacts.filter(c =>
            c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
        );
        callback(null, results, contacts.length);
    });
}

module.exports = { addContact, deleteContact, listContacts, searchContacts };
