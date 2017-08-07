const fs = require('fs-extra');
const mustache = require('mustache');
const componentTemplate = require('./js.template');
const chalk = require('chalk');
const htmlTemplate = require('./html.template');
const scssTemplate = require('./scss.template');
const fileName = process.argv[2].trim();
if (typeof(fileName) !== 'string') throw new Error('No name provided for the component.');

const componentName = fileName.charAt(0).toUpperCase() + fileName.slice(1) + 'Component';
const elementName = fileName.toLowerCase() + '-element'; 
console.log(chalk.green.bold('[generate.js] - Generating a component in your current directory.'));
console.log(chalk.yellow('[generate.js] - Component Name: ' + componentName + '; Element Name: ' + elementName));
const workingDirectory = process.cwd();
const directoryToCreate = `${workingDirectory}/src/${fileName}`;
console.log(chalk.yellow('[generate.js] - Directory to create', directoryToCreate));
console.log('[generate.js] - Checking that the directory does not exist.');

fs.pathExists(directoryToCreate)
// The path is checked.
.then(exists => { // exists is boolean
    // Ensure the directory does not already exist to avoid overwriting the user's files.
    if (exists) throw new Error('Directory already exists! Exiting...');
    // Create the directory by using the current execution path plus the name of the generated result (nameValue).
    return fs.ensureDir(directoryToCreate);
})
// The directory is created.
.then(dir => {
    console.log(chalk.green('[generate.js] - Directory created ', directoryToCreate));
    console.log('[generate.js] - Generating templates.');
    const view = {
        fileName: fileName,
        component: componentName,
        element: elementName
    }
    const componentClass = mustache.render(componentTemplate, view);
    const componentHtml = mustache.render(htmlTemplate, view);
    const componentStyles = mustache.render(scssTemplate, view);
    console.log('[generate.js] - Templates generated.');
    console.log('[generate.js] - Writing component files.');
    fs.writeFileSync(directoryToCreate + `/${fileName}.js`, componentClass);
    fs.writeFileSync(directoryToCreate + `/${fileName}.html`, componentHtml);
    fs.writeFileSync(directoryToCreate + `/${fileName}.css`, componentStyles);
    fs.writeFileSync(directoryToCreate + `/${fileName}.scss`, componentStyles);
    console.log(chalk.green.bold('[generate.js] - Finished creating your component!'));
})
// A promise threw an error.  Log the error and exist.
.catch(err => {
    console.log(err.message);
    process.exit(1);
})
