# Quickstart

To follow along with this quickstart you'll need:

- a tool for sending sending SOAP request, e.g. SOAP UI, Postman or WCF .NET Client
- access to a test endpoint, e.g. the public sandbox

If you're using the public sandbox as your test endpoint, you'll find that not all reference data is available. 
However, you can query from the following tables, in the namespace `http://www.wales.nhs.uk/nrds`
 - AssigningAuthority
 - GpPracticeMembership
 - SexualHealthClinicsWales
 - vwClinicianMaster
 - WelshOrganisation

 and WelshGPPracticeMainSites in the namespace `http://www.wales.nhs.uk/namespaces/NSD/GP2GP`

The full list of names and namespaces is available on the WRDS Website

> TODO: Find a public version of the data on the WRDS website 

## Search for GP Practices by Health Board

Every GP practice in Wales has a nationally assigned organisation code.

To retrieve a list of all GP Practice Codes within a specific healthboard, we can query the WelshGPPracticeMainSites table with a filter criteria on the attribute `LHBCode`.
The value to filter on will be the organisation code of the local health board, e.g. `7A1` for Besti Cadwaladr University Health Board.

> NOTE: See here for a list of codes for Welsh health boards:  
  https://odsportal.hscic.gov.uk/Organisation/Search?Code=*&Type=LB


#### Request:
Your request should look something like this:

`POST https://sandbox.api.nhs.wales/wrds/reference-data-standard-lookup`
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mes="http://www.wales.nhs.uk/namespaces/MessageRelease2">
  <soapenv:Header/>
  <soapenv:Body>
    <mes:LookupRequest>
      <!-- Name and namespace of the table to query -->
      <mes:LookupTable>
        <mes:Name>WelshGPPracticeMainSites</mes:Name>
        <mes:Namespace>http://www.wales.nhs.uk/namespaces/NSD/GP2GP</mes:Namespace>
      </mes:LookupTable>
      <!-- The attribute to retrieve (the WCode is the Organisation code for Welsh GP Practices) -->
      <mes:LookupAttribute>
        <mes:Name>WCode</mes:Name>
        <!-- The namespace for attributes should be the same as the namespace for the table -->
        <mes:Namespace>http://www.wales.nhs.uk/namespaces/NSD/GP2GP</mes:Namespace>
      </mes:LookupAttribute>
      <!-- One or more AttributeValuePairs to define the filter criteria -->
      <mes:AttributeValuePair>
        <mes:Attribute>
          <mes:Name>LHBCode</mes:Name>
          <!-- The namespace for attributes should be the same as the namespace for the table -->
          <mes:Namespace>http://www.wales.nhs.uk/namespaces/NSD/GP2GP</mes:Namespace>
        </mes:Attribute>
        <mes:Value>7A6</mes:Value>
      </mes:AttributeValuePair>
    </mes:LookupRequest>
  </soapenv:Body>
</soapenv:Envelope>
```



#### Response
After sending the request above, you should get a response similar to that shown below:

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
   <soap:Body>
      <LookupResponse xmlns="http://www.wales.nhs.uk/namespaces/MessageRelease2">
         <AttributeValuePair>
            <Attribute>
               <Id>1C96E397-ED04-450F-A220-99E223A2024B</Id>
               <Name>WCode</Name>
               <Namespace>http://www.wales.nhs.uk/namespaces/NSD/GP2GP</Namespace>
            </Attribute>
            <Value>W00005</Value>
         </AttributeValuePair>
         <AttributeValuePair>
            <Attribute>
               <Id>1C96E397-ED04-450F-A220-99E223A2024B</Id>
               <Name>WCode</Name>
               <Namespace>http://www.wales.nhs.uk/namespaces/NSD/GP2GP</Namespace>
            </Attribute>
            <Value>W93001</Value>
         </AttributeValuePair>
         <!-- results omitted for brevity-->
      </LookupResponse>
   </soap:Body>
</soap:Envelope>
```