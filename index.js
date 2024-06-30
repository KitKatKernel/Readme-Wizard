const inquirer = require('inquirer');
const colors = require('colors');
const fs = require('fs');

// Prompt user for information about the project
inquirer 
    .prompt([
        {   type: 'input',
            name: 'appName',
            message: 'What is the title of this application/project?'.white
        },
        {   type: 'input',
            name: 'description',
            message: 'Provide a brief description of this application'.white
        },
        {   type: 'input',
            name: 'installation',
            message: 'Describe the steps to install the app:'.white
        },
        {   type: 'input',
            name: 'usage',
            message: 'Give instructions on how this app is used'.white
        },
        {   type: 'input',
            name: 'contribution',
            message: 'List your collaborators and resources (with links if possible):'.white
        },
        {   type: 'list',
            name: 'license',
            message: 'What license is your application covered with?'.white,
            choices: ['MIT', 'GPLv3', 'Apache 2.0', 'None']
        },
        {   type: 'input',
            name: 'github',
            message: 'What is your GitHub username?'.white
        },
        {   type: 'input',
            name: 'email',
            message: 'What is your email address?'.white
        },
        {   type: 'input',
            name: 'testing',
            message: 'Provide examples on how to run tests with this app:'.white
        }
    ])
    //Write answers to README.md
    .then(answers => {
        const githubReadme = readmeMD(answers)
        fs.writeFile ('README.md', githubReadme, err => {
            if (err) {
                console.error('What are you doing?? You broke it!'.red)
            } else {
                console.log('README.md has been created successfully.'.green)
            }
        });
    });

// Function to generate license badge of selected license
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
// Grabs current year
function getCurrentYear() {
    return new Date().getFullYear();
}
// Generates license text based on selected license, and uses year and Github username under copyright
function getLicenseText(license, github) {
    const year = getCurrentYear();
    switch (license) {
        case 'MIT':
            return `MIT License\n\nCopyright (C) ${year} ${github}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;
        case 'GPLv3':
            return `GPLv3 License\n\nCopyright (C) ${year} ${github}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`;
        case 'Apache 2.0':
            return `Apache 2.0 License\n\nCopyright (C) ${year} ${github}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`;
        default:
            return '';
    }
}
// Function to create our README, appending our answer variables to the appropirate sections.
// Using regex to enable linebreaks with \n
function readmeMD({appName, description, installation, usage, contribution, license, github, email, testing}) {
    const licenseBadge = getLicenseBadge(license);
    const licenseText = getLicenseText(license, github);
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
- [Tests](#tests)
- [Questions](#questions)

## Installation

${installation.replace(/\\n/g, '\n')}

## Usage

${usage.replace(/\\n/g, '\n')}

## Credits

${contribution.replace(/\\n/g, '\n')}

## License

${licenseText}

## Tests

${testing.replace(/\\n/g, '\n')}

## Questions

For any questions, please reach out to me via [GitHub](https://github.com/${github}) or email at ${email}.
`;
}
