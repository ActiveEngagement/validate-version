module.exports =
{
    badCurrentRef(ref) {
        throw `The current version tag "${ref}" does not contain a valid Semantic Version. This was probably either ` +
              `a typo or an accidental push.`;
    },

    nonHighest(currentVersion, highestVersion) {
        throw `The current version "${currentVersion}" is not the highest version "${highestVersion}" in the ` +
              `repository. This indicates that you are attempting to push a version that is lower than a previous one.`;
    },

    badBranch(branch, ref) {
        throw `The "${branch}" branch does not contain the current version tag "${ref}. You may have created the ` +
              `tag on the wrong branch.`;
    },

    badVersionTag(tag, regex) {
        throw `The repository contains the version tag "${tag}", which is not a valid Semantic Version. All tags ` +
              `matched by the regular expression /${regex}/ must be valid Semantic Versions.`;
    }
};