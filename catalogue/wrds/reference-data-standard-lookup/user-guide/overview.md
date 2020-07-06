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

## WRDS - Reference Data Standard Lookup
The Standard Lookup API is a SOAP web service that you can use to query tables of reference data.

It has two operations, `GetResultSet` for fetching subsets of table data and `Lookup` for retrieving a specific column (attribute) of the data. Both operations require you to supply the namespace and table name to query along with filter criteria and attributes to retrieve..

You can find information about available namespaces and tables on the WRDS Website

> TODO: Find a public version of the data on the WRDS website 

### GetResultSet
Returns zero or more rows, each containing one or more attribute-value pairs from a reference data table.

In the request you must specify:

 - The namespace and table name to query.
 - One or more attributes to retrieve
 - Zero or more attribute-value pairs that set the filter criteria for the query.
 - An "Exact Match" indicator to control how the filter criteria is interpreted. If Exact Match is false then wildcards can be used in the values of the attribute value pairs.

### Lookup
Returns a list of attribute-value pairs with data from specific column of a reference data table.

In the request you must specify:

 - The namespace and table name to query.
 - The attribute to retrieve
 - Zero or more attribute-value pairs that set the filter criteria for the query.
