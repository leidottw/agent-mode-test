const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

interface TranslationData {
  [key: string]: { [key: string]: string };
}

async function convertCsvToJson(csvFilePath: string, outputDir: string) {
  const languages: string[] = [];
  const translationsByLanguage: { [lang: string]: TranslationData } = {};

  const parser = fs.createReadStream(csvFilePath).pipe(parse({ delimiter: ',', columns: true }));

  for await (const record of parser) {
    const key = record.key;
    delete record.key;

    // First time processing, get all language codes
    if (languages.length === 0) {
      languages.push(...Object.keys(record));

      // Initialize translation structure for each language
      languages.forEach(lang => {
        translationsByLanguage[lang] = {};
      });
    }

    // Split the key by dots and create nested structure
    const keyParts = key.split('.');
    const section = keyParts[0];
    const subKey = keyParts[1];

    // Process each language's translation separately
    languages.forEach(lang => {
      if (!translationsByLanguage[lang][section]) {
        translationsByLanguage[lang][section] = {};
      }
      translationsByLanguage[lang][section][subKey] = record[lang] || '';
    });
  }

  // Create language-specific JSON files
  languages.forEach(lang => {
    const outputPath = path.join(outputDir, `${lang}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(translationsByLanguage[lang], null, 2));
    console.log(`Generated ${lang}.json`);
  });
}

// Check if source CSV file path is provided
const csvFilePath = process.argv[2];
if (!csvFilePath) {
  console.error('Please provide the CSV file path');
  process.exit(1);
}

// Set output directory
const outputDir = path.join(__dirname, '../../src/assets/i18n');

// Execute the conversion
convertCsvToJson(csvFilePath, outputDir).catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
