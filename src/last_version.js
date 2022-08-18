const core = require('@actions/core');
const exec = require('@actions/exec');
const semver = require('semver');

async function getAll() {
    const glob = core.getInput('tags');
    let output = await exec.getExecOutput(`git tag --list "${glob}"`);
    const all = output.stdout.trim().split(/\r?\n/);

    all.sort(function(refA, refB) {
        a = semver.clean(refA);
        b = semver.clean(refB);

        if(!semver.valid(a)) {
            throw `An invalid Semantic Version "${refA}" was encountered while scanning for tags with the glob "${glob}.`;
        }

        if(!semver.valid(b)) {
            throw `An invalid Semantic Version "${refB}" was encountered while scanning for tags with the glob "${glob}".`;
        }

        return semver.compare(b, a);
    });

    return all;
}

module.exports = async function() {
    const all = await getAll();
    return all.length > 1 ? all[1] : null;
};