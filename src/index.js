const core = require('@actions/core');
const semver = require('semver');
const error = require('./error');
const getVersions = require('./versions');
const branchContains = require('./branch_contains');

async function main() {
    try {
        const ref = core.getInput('ref_name');
        const version = semver.clean(ref);

        if(!semver.valid(version)) {
            error.badCurrentRef(ref);
        }

        const allVersions = await getVersions();
        const highestVersion = allVersions[0];

        if (!semver.eq(highestVersion, version)) {
            error.nonHighest(version, highestVersion);
        }

        const branch = core.getInput('branch');

        if(! await branchContains(branch, ref)) {
            error.badBranch(branch, ref);
        }

        core.setOutput('current_version', version);
        core.setOutput('previous_version', allVersions[1]);
    }
    catch (error) {
        core.setFailed(error);
    }
}

main();
