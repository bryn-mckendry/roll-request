exports.generateKey = function() {
    const characters = 'BCDFGHJKLMNPQRSTVWXYZ';
    let selects = [];
    for (let i=0; i < 4; i++) {
        selects.push(characters[Math.floor(Math.random() * characters.length)])
    }
    const key = selects.join('');
    return key;
}
