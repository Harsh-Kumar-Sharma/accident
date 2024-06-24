const fs = require('fs');
const xlsx = require('xlsx');
const path = require('path');

// Absolute path to your Excel file
const excelFilePath = path.join(__dirname, '../Trend Analysis_Testing.xlsm');

// Load the Excel file
const workbook = xlsx.readFile(excelFilePath);

// Assuming you want to read data from the first sheet
const sheetName = workbook.SheetNames[9]; // Change to the correct index if not the first sheet
const sheet = workbook.Sheets[sheetName];

// Convert to JSON with date conversion
const jsonData = xlsx.utils.sheet_to_json(sheet, {
    header: 1, // Use first row as headers
    raw: false, // Parse numeric and date values
    dateNF: 'yyyy-mm-dd', // Date format used in your sheet, adjust as needed
});

// Convert numeric date values to formatted dates
jsonData.forEach(row => {
    if (typeof row['ACCIDENT DATE'] === 'number') {
        row['ACCIDENT DATE'] = excelDateToJSDate(row['ACCIDENT DATE']);
    }
});

// Function to convert Excel date numeric value to formatted date string
function excelDateToJSDate(excelDate) {
    const utcDays = Math.floor(excelDate - 25569);
    const utcValue = utcDays * 86400;
    const dateInfo = new Date(utcValue * 1000);

    // Format the date as DD/MM/YYYY
    const day = ('0' + dateInfo.getDate()).slice(-2);
    const month = ('0' + (dateInfo.getMonth() + 1)).slice(-2);
    const year = dateInfo.getFullYear();

    return `${day}/${month}/${year}`;
}

// Write JSON data to a file
const outputFilePath = path.join(__dirname, 'accident.json');

fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
        console.error('Error writing JSON to file:', err);
    } else {
        console.log(`JSON data has been written to ${outputFilePath}`);
    }
});
