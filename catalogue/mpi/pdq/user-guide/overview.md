## System Overview

The Patient Demographics Query Service (PDQ) enables application suppliers to query the NHS Wales Master Patient Index (MPI) by specific search criteria for a list of patients comprising patient demographic and identifier details. 

The service is based on the [PDQ-ITI-21](https://oehf.github.io/ipf-docs/docs/ihe/iti21/) transaction from the Integrating the Healthcare Enterprise (IHE) [Patient Demographics Query](https://wiki.ihe.net/index.php/Patient_Demographics_Query) profile. Consumers of the service query a Master Patient Index which presents a consolidated view (the ‘Composite View’) of patient demographic and identifier data assembled from Local Health Board GP, Patient Administration and Departmental Systems implemented in Wales. 

The MPI is by design an [enterprise master patient index](https://en.wikipedia.org/wiki/Enterprise_master_patient_index "Enterprise master patient index") whose aim is to correctly identify patients whenever or wherever they receive treatment. The result of linking patient identity records across a range of information systems is a single ‘gold standard’ identity record for use by new national systems. This helps minimise the number of duplicate records and supports health board system mergers.

### Message Format 
This Service exposes an HTTP SOAP web service endpoint.

The NHS Wales PDQ (Query Parameter Definition) messages conform to the Integrating the Healthcare Enterprise (IHE) Patient Demographics Query (PDQ) profile [HL7v2.5](https://hl7-definition.caristix.com/v2/HL7v2.5/Segments). 

These consist of a QBP^Q22^QBP^Q21 request and corresponding synchronous RSP^K21 responses as per standard HL7.

A successfull response portion of a SOAP message for example will be enclosed with RSP_K21.QUERY_RESPONSE tags and the applicable response tags. Here a partial response showing only the [address fields](https://hl7-definition.caristix.com/v2/HL7v2.3/Fields/PID.11):
 
 ```xml
 <RSP_K21.QUERY_RESPONSE> 
 .... 
        <PID.11>
            <XAD.1>
                <SAD.1>21 Cowbridge Road East</SAD.1>
            </XAD.1>
            <XAD.2>Riverside</XAD.2>
            <XAD.3>Cardiff</XAD.3>
            <XAD.4>South Glamorgan</XAD.4>
            <XAD.5>CF11 9AD</XAD.5>
            <XAD.7>H</XAD.7>
        </PID.11>
...
  </RSP_K21.QUERY_RESPONSE>
 ```

Individual fields will be identified by their specific HL7 field designations. e.g:

 HL7 Field | Description                
-----------|------------------------ 
 PID.3.1   | Patient ID Number        
 PID.5.1   | Patient Surname           
 PID.5.2   | Patient Forename         
 PID.7     | Patient Date of Birth    
 PID.8     | Patient Gender           
 PID.11    | Patient address        


The definitions for the QPD portion of a SOAP Request or the [PID](https://hl7-definition.caristix.com/v2/HL7v2.4/Segments/PID) field definitions in the table above can be found on [Caristix HL7 Definitions](https://hl7-definition.caristix.com/v2/HL7v2.7/Segments/QPD).

### Example Requests

An example of the request portion of a SOAP message when querying *by NHS number* would look like : 

```xml
<QPD>
    <QPD.1>
        <CE.1>IHE PDQ Query</CE.1>
    </QPD.1>
    <QPD.2>PatientQuery</QPD.2>
    <QPD.3>
        <QIP.1>@PID.3.1</QIP.1>
        <QIP.2>5555599226</QIP.2>
    </QPD.3>
    <QPD.3>
        <QIP.1>@PID.3.4</QIP.1>
        <QIP.2>NHS</QIP.2>
    </QPD.3>
    <QPD.3>
        <QIP.1>@PID.3.5</QIP.1>
        <QIP.2>NH</QIP.2>
    </QPD.3>
</QPD>
```

Further example requests can be found in our MPI PDQ Postman project :

[![MPI PDQ Postman project](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f54d6238f91e83aa9aaf)

The List of examples and what they cover inclued in our Postman project are listed below:

### Valid Search Criteria

Valid use case search criteria covered by our examples are:

* Search by NHS Number (single positive result)
* Search by HB PAS number (single positive result)
* Search by forename, surname, DoB (single positive result)
* Search by forename, gender, DoB (single positive result)
* Search by Surname, Postcode (single positive result)

### Examples included of edge cases users may encounter include

* Edge Case 1: Response when searching for WATSON, John | 07/08/1952 | M | CF12 9AD | PAS(129): E976321 covers
   -     Multiple Health board IDs - multiple PID.3 segments with CX.5 = "PI" the same "assigning authority in CX.4/HD.1
   -     Without GP - PD1 segment of the message is missing
   -     Without NHS number - missing NHS segment

* Edge Case 2: Response when searching for HUDSON, Martha | 21/03/1939 | F | CF13 9AD | NHS: 5543223455 | PAS(129): E231796 covers
   -     Deceased patient - returns a PID.29 (Patient Death Date and Time) against the patient
   -     Multiple matches - multiple RSP_K21.QUERY_RESPONSE segments

NOTE: The mock implementations used by the developer portal will also *echo back the QPD section (request details) of the original request* and populates MSH/MSH.7/TS.1 with a fresh timestamp for each request.

To get started making requests take a look at our [quickstart](/api-guides/mpi-pdq/quickstart)

