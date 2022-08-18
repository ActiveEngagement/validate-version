const exec = require('@actions/exec');

module.exports = async function(branch, tag) {
    const output = await exec.getExecOutput(`git branch origin/${branch} -a --contains "${tag}"`);
    return output.stdout.includes(`remotes/origin/${branch}`);
};