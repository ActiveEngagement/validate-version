# validate-version

This lightweight, opinionated GitHub Action ensures that your version tags are valid Semantic Versions and that the current one is greater than the previous one. It will also ensure that the current tag is a part of a specified branch.

## Getting Started

Since `validate-version` relies on the full Git history to validate the current tag against previous ones, you will need to disable "shallow cloning." This feature is enabled by default in the [checkout](https://github.com/actions/checkout) action, and can be disabled like so:

```yaml
- uses: actions/checkout@v3
    with:
    fetch-depth: 0
```

Now use the action in your workflow:

```yaml
- uses: ActiveEngagement/validate-version@v0.0
  with:
    # REQUIRED. The name of the current Git ref. This is the easiest way to access and pass it.
    ref_name: ${{ github.ref_name }}

    # REQUIRED. The branch on which the version tag must reside.
    branch: master

    # OPTIONAL. A glob matching all the version tags in the repository. The default is fine for most projects.
    tags: v*
```

That's all! Now when your workflow is triggered by a tag push, the tag will first be validated.

`validate-version` will now throw an error if:
- the current version is invalid,
- any of the version tags in the repository are invalid,
- the current version is not greater than the last one, or
- the required branch does not contain the current version tag.

## Notes

### The Last Version

In the context of the `validate-version` action, the "last version" refers **not** to the chronologically last version, but to the highest (per Semantic Versioning) version in the repository (aside from the current one).

This precludes a situation like the following:
- developer pushes tag `v0.1.0`
- developer attempts to push tag `v0.0.1` and is rejected
- developer accidentally pushes tag `v0.0.2` and is *accepted*, since the chronologically "last" version is `v0.0.1`.    

`validate-version` instead only permits versions that are higher than all other versions.