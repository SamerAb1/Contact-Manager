

function isValidName(name) { 
    return typeof name === 'string' && /^[a-zA-Z\s]+$/.test(name);
}

function isValidEmail(email) {
    return typeof email === 'string' && email.includes('@') && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) { 
    return typeof phone === 'string' && /^[\d-]+$/.test(phone);
}

function validateContact(contact, existingContacts) {
    if (!contact.name || !isValidName(contact.name)) {
        return { valid: false, error: "Error: Name is required and must only contain letters and spaces" };
    }
    if (!contact.email || !isValidEmail(contact.email)) {
        return { valid: false, error: "Error: Email is required" };
    }
    if (!contact.phone || !isValidPhone(contact.phone)) {
        return { valid: false, error: "Error: Phone is required and must be valid" };
    }
    const emailLower = contact.email.toLowerCase();
    const exists = existingContacts.some(
        c => c.email && c.email.toLowerCase() === emailLower
    );
    if (exists) {
        return { valid: false, error: "Error: Contact with this email already exists" };
    }
    return { valid: true };
}


module.exports = { isValidName, isValidEmail, isValidPhone, validateContact };