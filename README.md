# NHS Wales API Catalogue

The files in this repository are used to generate documentation and user guides for NHS Wales APIs. 

The catalogue has the following structure:

    {system-id}/
    ├── system.yml
    ├── {api-id}/
    │   ├── api.yml
    │   ├── spec/
    │   │   └── open-api.yml or service.wsdl
    │   └── user-guide/
    │       └── # see user-guide section below

If an API has a sandbox implementation, it will be available at: `https://sandbox.api.wales.nhs.uk/{system-id}/{api-id}/`

Below is more detail on each of the catalogue files and guidance on the expected content and writing style.

## system.yml
This file holds information about the backend system that exposes one or more APIs.  
Information that may otherwise be repeated across all of a system's APIs can be added to the `description` field.

### short-name
A short name or abbreviation (max 10 chars) to be used as a prefix for each API title when displayed in the API catalogue.
### description
A short description (max 80 chars) of what the system does.

## api.yml
This file contains information used to generate a user friendly view of the API Catalogue. The aim is to provide information that allows somebody with limited knowledge of the architecture to decide whether the API may be suitable for their needs.

### title
A short title (max 30 chars) that states the purpose and characteristics of the API.
Do not include system name - when displayed in the API catalogue the system name will be prefixed automatically.

### description
A short description (max 80 chars) of what the API can be used for.
The description should be written in the imperative mood (e.g. "Search for test results" ) to aid brevity.

### overview
A structured description (max 800 chars), containing at least one sentence for each the following:
 - What the API does: A slightly more detailed description, optionally with a few specifics about data sources and formats.
 - Who uses it and why: examples of current consumers of the API and an example of their main use case.  
 - Where is it available: Mention here if it's only available to specific localities, specialties, etc.

### owner
Name of the team that is the main point of contact for information about this API.

### type
API type - SOAP, REST, HL7, GraphQL, etc.


### status
The status of an API is determined by availability.
 - **Live**: in Production.
 - **Beta**: in Production but for pilot use only.
 - **Alpha**: in SIT but not in production.
 - **Experimental**: in internal Dev environment or Sandbox but not in SIT or production.
 
 > NOTE: the catalogue structure may be amended in future to support multiple API versions with different status.

## open-api.yml or service.wsdl
A WSDL or Open API document for the API.
 > NOTE: guidance for these items is still being developed.


## user-guide

Although some reference documentation will be auto-generated from the `spec/service.wsdl` or `spec/open-api.yml`, you can provide more detail by adding a user guide. 
To include an API user guide, add markdown files in a `user-guide` folder structured as show below:

    user-guide/
    ├── overview.md
    ├── quickstart.md
    ├── how-to/
    │   ├── 1-{description}.md
    │   ┊    
    │   └── n-{description}.md   
    ├── concepts/
    │   ├── {concept}.md
    │   ┊    
    │   └── {concept}.md

More information about the content of each markdown file is provided below.

#### overview.md - Technical overview
This overview is aimed at developers, so you should go into more technical detail than the catalogue description.
Explain what the API does and how it works, e.g. 'it's a FHIR API that lets you retrieve ValueSets resources of SNOMED concepts', it's a SOAP API that triggers a questionnaire to be sent.
Be sure to highlight any technology and concepts that the user should be familiar with.

#### quickstart.md - How to get started
This should provide a short and clear example of how to use the API. 
You can assume the reader has some familiarity with the required technology, but highlight anything advanced or unconventional - i.e. gotchas!
Show sample requests, responses and explain error handling where appropriate

#### how-to - Walk-through guides for common scenarios
These should be examples written in the same style as the quickstart but it's ok for these to be lengthier, more complex examples of usage.

#### concepts - detail on API 
These are descriptions of key concepts specific to the API, e.g. a Document Metadata standard.
Where relevant, link to information sources (e.g. where concepts reference from some external standard.) 

