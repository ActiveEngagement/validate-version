const core = require('@actions/core');
const exec = require('@actions/exec');
const semver = require('semver');
const error = require('./error');

async function getTags(regex) {
    const output = await exec.getExecOutput(`git tag --list`);
    const all = output.stdout.trim().split(/\r?\n/);
    return all.filter(tag => new RegExp(regex).test(tag));
}

module.exports = async function() {
    const glob = core.getInput('tags');
    const tags = await getTags(glob);
    const versions = tags.map(function(tag) {
        const cleaned = semver.clean(tag);

        if (!semver.valid(cleaned)) {
            error.badVersionTag(tag, glob);
        }

        return cleaned;
    });
    versions.sort((a, b) => semver.compare(b, a));

    return versions;
}