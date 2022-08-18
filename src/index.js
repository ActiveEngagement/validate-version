const core = require('@actions/core');
const semver = require('semver');
const getLastVersion = require('./last_version');
const branchContains = require('./branch_contains');

async function main() {
    try {
        const ref = core.getInput('ref_name');

        const version = semver.clean(ref);

        if(!semver.valid(version)) {
            throw `The current version tag "${ref}" does not contain a valid Semantic Version!`;
        }

        let lastVersion = await getLastVersion();

        if(lastVersion !== null) {
            lastVersion = semver.clean(lastVersion);
        }

        if(lastVersion && semver.lte(version, lastVersion)) {
            throw `The current version "${version}" is not greater than the last version "${lastVersion}"!`;
        }

        const branch = core.getInput('branch');

        if(! await branchContains(branch, ref)) {
            throw `The current version tag "${ref}" must be on the "${branch}" branch!`;
        }
    }
    catch (error) {
        core.setFailed(error);
    }
}

main();
