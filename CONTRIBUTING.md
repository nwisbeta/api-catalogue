# How to contribute to the NHS Wales API Catalogue

## Table of Contents

[Our Goal](#our-goal)

[How to contribute](#how-to-contribute)

[Editing files and sending a pull request](#editing-files-and-sending-a-pull-request)

[Resources](#resources)

## Our Goal

Welcome and thanks for reading this! We’re a small team at NHS Wales, helping to open up our technical architecture. We're doing so by first making our catalogue of Web APIs accessible.

## How to contribute

We need volunteers to help us and we welcome contributions to improve. This could be to...

- correct inaccuracies, grammar or typos.
- add a new API to the catalogue.
- suggest an improvement in the catalogue structure.

To do so, either open an [issue](https://github.com/nwisbeta/api-catalogue/issues) or edit the files and send a [pull request](https://github.com/nwisbeta/api-catalogue/pulls) - but first check that there's not one already open for the same thing.

## Editing files and sending a pull request

To send us a pull request, first fork the repository and create a new branch for your changes.

```bash
git clone https://github.com/<your-username>/api-catalogue.git

git checkout -b <your-branch-name>
```

We recommend editing the files using [**VS Code**](https://code.visualstudio.com/) with the [**YAML extension**](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml). You will then get intellisense when adding or editing the api.yml and system.yml files.

Make sure you read the guidance in the [README](README.md), so your clear on the content and writing style expected for each file.

When you're done, push your commited changes back to your forked repo.  

```bash
git push -u origin <your-branch-name>
```

Finally, raise a pull request. Pull requests will be automatically checked for correct file structure and then be reviewed by a member of the @nwis/ecosystem team before merging.

## Resources

[About pull-requests](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests)

[Git standard Fork and Pull request Workflow](https://gist.github.com/Chaser324/ce0505fbed06b947d962)
