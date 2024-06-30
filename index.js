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
        {   type: 'input',
            name: 'license',
            message: 'What license is your application covered with?'
        },
        {   type: 'input',
            name: 'testing',
            message: 'Provide examples on how to run tests with this app:'
        }
    ])
    // 2nd Pompdorodo
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

function readmeMD({appName, description, installation, usage, contribution, license, testing}) {
    return `
    # ${appName}

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

    ${license}

    ${testing}
    `;
}