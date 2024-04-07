// merges a file named "new-generated-translations.json" with "generated-translations.json"
// by adding keys not found in "new-generated-translations.json" to it
const fs = require('fs');

const newGenTr = JSON.parse(fs.readFileSync('./new-generated-translations.json', 'utf8'));
const genTr = JSON.parse(fs.readFileSync('./generated-translations.json', 'utf8'));

for (const langCode in newGenTr) {
    const lang = newGenTr[langCode];
    // check if we are adding a new lang
    if (!(langCode in genTr)) {
        genTr[langCode] = lang;
    }
    const oldLang = genTr[langCode];
    for (const key in lang) {
        const value = lang[key];
        oldLang[key] = value;
    }
}

fs.writeFileSync('./merged-translations.json', JSON.stringify(genTr, null, 4), "utf-8");