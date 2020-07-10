# Get GP Address Information for a GP Practice

This guide explains how you can use a wildcard filter with the `GetResultSet` operation.  If you haven't already, take a look at the [quickstart](/wrds-reference-data-standard-lookup/api-guide/quickstart) to get set up for sending requests.  

We'll search for Health Boards with a postcode beginning with 'CF' (i.e. in the Cardiff postal area).  

In our request, we set the value of `<ExactMatch>` to `false` to indicate that special characters in `AttributeValuePair` value may contain wilcards.  The wildcard rules are the same as for the SQL LIKE operator, so you use `%` to represent zero or more characters and `_` to represents a single character. 

In this example we're also using wildcards to filter for organisation names ending with `HB` to identify them as health boards.  This is not the recommended approach.


### Request
Your request should look something like this:

`POST https://sandbox.api.nhs.wales/wrds/reference-data-standard-lookup`
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mes="http://www.wales.nhs.uk/namespaces/MessageRelease2">
   <soapenv:Header/>
   <soapenv:Body>
      <mes:GetResultSetRequest>
         <!-- Name and namespace of the table to query -->
         <mes:LookupTable>
            <mes:Name>WelshOrganisation</mes:Name>
            <mes:Namespace>http://www.wales.nhs.uk/nrds</mes:Namespace>
         </mes:LookupTable>
         <!-- One or more attributes to retrieve in the result set -->
         <mes:AttributeToRetrieve>
            <mes:Name>org_code</mes:Name>
            <mes:Namespace>http://www.wales.nhs.uk/nrds</mes:Namespace>
         </mes:AttributeToRetrieve>
         <mes:AttributeToRetrieve>
            <mes:Name>org_name</mes:Name>
            <mes:Namespace>http://www.wales.nhs.uk/nrds</mes:Namespace>
         </mes:AttributeToRetrieve>
         <!-- One or more AttributeValuePairs to define the filter criteria -->
         <mes:AttributeValuePair>
            <mes:Attribute>
               <mes:Name>org_postcode</mes:Name>
               <mes:Namespace>http://www.wales.nhs.uk/nrds</mes:Namespace>
            </mes:Attribute>
            <mes:Value>CF%</mes:Value>
         </mes:AttributeValuePair>
         <mes:AttributeValuePair>
            <mes:Attribute>
               <mes:Name>org_name</mes:Name>
               <mes:Namespace>http://www.wales.nhs.uk/nrds</mes:Namespace>
            </mes:Attribute>
            <mes:Value>%HB</mes:Value>
         </mes:AttributeValuePair>
         <!-- Exact Match indicator.  Set to 'false' if using wilcards, otherwise 'true' to improve performance -->
         <mes:ExactMatch>false</mes:ExactMatch>
      </mes:GetResultSetRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

### Response
After sending the request above, you should get a response similar to that shown below:

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
   <soap:Body>
      <GetResultSetResponse xmlns="http://www.wales.nhs.uk/namespaces/MessageRelease2">
         <Row>
            <AttributeValuePair>
               <Attribute>
                  <Id>CE75B557-7308-4777-909F-B08F89410F1F</Id>
                  <Name>org_code</Name>
                  <Namespace>http://www.wales.nhs.uk/nrds</Namespace>
               </Attribute>
               <Value>6A8</Value>
            </AttributeValuePair>
            <AttributeValuePair>
               <Attribute>
                  <Id>95814003-E1AE-4D13-9FD4-1966B7768482</Id>
                  <Name>org_name</Name>
                  <Namespace>http://www.wales.nhs.uk/nrds</Namespace>
               </Attribute>
               <Value>Cardiff LHB</Value>
            </AttributeValuePair>
         </Row>
        <!-- results omitted for brevity -->
         <Row>
            <AttributeValuePair>
               <Attribute>
                  <Id>CE75B557-7308-4777-909F-B08F89410F1F</Id>
                  <Name>org_code</Name>
                  <Namespace>http://www.wales.nhs.uk/nrds</Namespace>
               </Attribute>
               <Value>6B8</Value>
            </AttributeValuePair>
            <AttributeValuePair>
               <Attribute>
                  <Id>95814003-E1AE-4D13-9FD4-1966B7768482</Id>
                  <Name>org_name</Name>
                  <Namespace>http://www.wales.nhs.uk/nrds</Namespace>
               </Attribute>
               <Value>Merthyr Tydfil LHB</Value>
            </AttributeValuePair>
         </Row>
      </GetResultSetResponse>
   </soap:Body>
</soap:Envelope>
```
