const inquirer = require('inquirer');
const colors = require('colors');
const fs = require('fs');

inquirer 
    .prompt([
        {   type: 'input',
            name: 'appName',
            message: 'What is the title of this application/project?'
        },
        {   type: 'input',
            name: 'description',
            message: 'Provide a brief description of this application'
        },
        {   type: 'input',
            name: 'installation',
            message: 'Describe the steps to install the app:'
        },
        {   type: 'input',
            name: 'usage',
            message: 'Give instructions on how this app is used'
        },
        {   type: 'input',
            name: 'contribution',
            message: 'List your collaborators and resources (with links if possible):'
        },
        {   type: 'list',
            name: 'license',
            message: 'What license is your application covered with?',
            choices: ['MIT', 'GPLv3', 'Apache 2.0', 'None']
        },
        {   type: 'input',
            name: 'testing',
            message: 'Provide examples on how to run tests with this app:'
        }
    ])

    .then(answers => {
        const githubReadme = readmeMD(answers)
        fs.writeFile ('README.md', githubReadme, err => {
            if (err) {
                console.error ('What are you doing??  You broke it!')
            } else {
                console.log('README.md has been created successfully.')
            }
        });
        console.log(answers);
    });

function getLicenseBadge(license) {
    switch (license) {
        case 'MIT':
            return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        case 'GPLv3':
            return '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
        case 'Apache 2.0':
            return '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
        default:
            return '';
    }
}

function readmeMD({appName, description, installation, usage, contribution, license, testing}) {
    const licenseBadge = getLicenseBadge(license);
    return `
# ${appName}

${licenseBadge}

## What is This Project?

${description}

## Table of Contents

Explore the contents of this guide:

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

${installation}

## Usage

${usage}

## Credits

${contribution}

## License

This project is licensed under the ${license} license.

## Tests

${testing}
`;
}
