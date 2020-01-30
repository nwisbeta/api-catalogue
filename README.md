# NHS Wales API Catalogue

Catalogue of APIs for NHS Wales systems

The catalogue has the following structure:

    {system-id}/
    ├── system.yml
    ├── {api-id}/
    │   ├── api.yml
    │   └──── spec/
    │         └── open-api.yml or service.wsdl

If an API is deployed to the sandbox, it will be available at: `https://sandbox.api.wales.nhs.uk/{system-id}/{api-id}/`


# Contributing

Pull requests will be reviewed by an admin before merging.  Guidance on how to add new catalogue entries for a system and/or API are detailed below. 

## system.yml
This file holds information about the backend system rather than the APIs it exposes.  
Information that may otherwise be repeated across all of a system's APIs can be added to the `description` item

### short-name
A short name or abbreviation (max 10 chars) to be used as a prefix for each API title when displayed in the API catalogue
### description
A short description (max 80 characters) of what the system does.

## api.yml
This file contains information used to generate a user friendly view of the API Catalogue.
A standard structure
The aim is to provide information that allows somebody with limited knowledge of the architecture to decide whether the API may be suitable for their needs

### title
A short title (max 30 characters) that at the purpose and characteristics of the API.
Do not include system name - when displayed in the API catalogue the system name will be prefixed automatically.

### description
A short description (max 80 characters) of what the API can be used for.
The description should be written in the imperative mood (e.g. "Search for test results" ) to aid brevity.

### overview
A structured description (max 800 characters), containing at least one sentence for each the following
 - What the API does: A slightly more detailed description, optionally with a few specifics about data sources and formats
 - Who uses it and why: examples of current consumers of the API and an example of their main use case.  
 - Where is it available: Mention here if it's only available to specific localities, specialties, etc.

### owner
Name of the team that is the main point of contact for information about this API

### type
API type - SOAP, REST, HL7, GraphQL, etc.


### status
The status of an API is determined by availability.
 - **Live**: in Production
 - **Beta**: in Production but for pilot use only
 - **Alpha**: in SIT but not in production
 - **Experimental**: in internal Dev environment or Sandbox but not in SIT or production
 
 > NOTE: the catalogue structure may be amended in future to support multiple API versions with different status

### open-api.yml or service.wsdl
A WSDL or Open API document for the API
 > NOTE: guidance for these items is still being developed