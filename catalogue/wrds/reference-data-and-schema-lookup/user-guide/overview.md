## System Overview
The Welsh Reference Data Service (WRDS) hosts curated sets of reference data for NHS Wales, for example:

 - Organisational data such as Practitioners, GP Practices, Health Professionals, Hospitals
 - Clinical coding systems such as ICD-10 and OPCS 4.
 - Service location - web endpoints for other national services
 - Code translations, e.g. to translate clinician code from PAS system domain to LIMS

You can use data from WRDS to ensure consistency with other NHS Wales applications and conform with mandated information standards.

There are three APIs that you can use to fetch reference data for your application:

 - **Standard Lookup**: a SOAP service for querying reference data
 - **Data and Schema Lookup**: a REST flavoured API for querying reference data and the underlying data structure
 - **Bulk Data Sync**: allows registered applications to fetch data in bulk and then subscribe for incremental updates 

## WRDS - Reference Data and Schema Lookup
The Data and Schema Lookup API is a "REST flavoured" API that you can use to query tables of reference data and their underlying structure.

It has three operations. `GetTable` is used to fetch data, whereas `GetNamespaceSchema` and `GetTableSchema` are used to get XML schema definitons that describe the data returned from GetTable.

### GetTable
Returns zero or more rows of data from a reference data table. The returned XML will conform to schema from the corresponding `GetSchema` operation

Format: `GET .../GetTable/{namespace}/{tablename}?[namespace:attribute=value]`

URL Parameters:
 - Namespace - this is the short version of the namespace, e.g. `nrds` not `http://www.wales.nhs.uk/nrds`
 - Table Name - the table you wish to query within the namespace

Query Parameters:
 - Zero or more attribute-value pairs that set the filter criteria, e.g. `?nrds:LHBcode=7A2`

### GetTableSchema
Returns an XML Schema for the results of the corresponding `GetTable` operations.  
The returned schema will import definitions from schema a corresponding call to `GetNamespaceSchema`

Format: `GET .../GetTableSchema/{namespace}/{tablename}`

URL Parameters:
 - Namespace - this is the short version of the namespace, e.g. `nrds` not `http://www.wales.nhs.uk/nrds`
 - Table Name - the table to be fetched from `GetTable`

### GetNamespaceSchema
Returns an XML schema defining elements for all available attributes in the namespace.

Format: `GET .../GetNamespaceSchema/{namespace}`

URL Parameters:
 - Namespace - this is the short version of the namespace, e.g. `nrds` not `http://www.wales.nhs.uk/nrds`



