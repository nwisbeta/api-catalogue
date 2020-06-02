# API Catalogue Processor

A Github Action for the generating Azure API Management resource templates from the NHS Wales API catalogue format

# Deploying the Templates

The generated templates can be deployed to an API Management instance using the `deploy-to-azure-apim.js` script, e.g.

    node deploy-to-azure-apim ./path/to/templates/ my-api-instance-name Acc3s5\T0kenFromAP!ManaG3ment==

The script will parse the filenames of the resource templates to determine the API name and HTTP verb/method to use for deployment

The files will only be processed if they are named in the correct way, e.g. my-cool-api.PUT.json

> NOTE: for SOAP APIs with a WSDL specification, two resource templates are generated. The first is to create the API using the WSDL (via a `PUT` request), the second is to update the display name and description (via a `PATCH` request).  
The reason for this is the WSDL's service name and annotations override the `displayName` and `description` properties in the template, but the WSDL schema does not allow service names in the format we desire (e.g. with spaces).