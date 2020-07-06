# Get GP Address Information for a GP Practice

Take a look at the quickstart to get setup.

This request shows how to use the GetResultSet operation to retrieve the Practice  and Postcode for a GP Practice


### Request
Your request should look something like this:

`POST https://sandbox.api.nhs.wales/wrds/reference-data-standard-lookup`
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mes="http://www.wales.nhs.uk/namespaces/MessageRelease2">
  <soapenv:Header/>
  <soapenv:Body>
    <mes:GetResultSetRequest>
      <mes:AttributeValuePair>
        <mes:Attribute>
          <mes:Name>GpPracticeCode</mes:Name>
          <mes:Namespace>http://www.wales.nhs.uk/nrds</mes:Namespace>
          <mes:Description/>
        </mes:Attribute>
        <mes:Value>W97046</mes:Value>
      </mes:AttributeValuePair>
      <mes:LookupTable>
        <mes:Name>GPpractice</mes:Name>
        <mes:Namespace>http://www.wales.nhs.uk/nrds</mes:Namespace>
      </mes:LookupTable>
      <mes:AttributeToRetrieve>
        <mes:Name>postcode</mes:Name>
        <mes:Namespace>http://www.wales.nhs.uk/nrds</mes:Namespace>
      </mes:AttributeToRetrieve>
      <mes:AttributeToRetrieve>
        <mes:Name>PracticeName</mes:Name>
        <mes:Namespace>http://www.wales.nhs.uk/nrds</mes:Namespace>
      </mes:AttributeToRetrieve>
      <mes:ExactMatch>1</mes:ExactMatch>
    </mes:GetResultSetRequest>
  </soapenv:Body>
</soapenv:Envelope>
```

### Response

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <GetResultSetResponse xmlns="http://www.wales.nhs.uk/namespaces/MessageRelease2">
      <Row>
        <AttributeValuePair>
          <Attribute>
            <Id>ECCCA863-42B0-405F-938B-2863785B5F10</Id>
            <Name>Postcode</Name>
            <Namespace>http://www.wales.nhs.uk/nrds</Namespace>
          </Attribute>
          <Value>CF62 8AZ</Value>
        </AttributeValuePair>
        <AttributeValuePair>
          <Attribute>
            <Id>D5D15286-0B5F-41F7-BC69-01D691CF6431</Id>
            <Name>PracticeName</Name>
            <Namespace>http://www.wales.nhs.uk/nrds</Namespace>
          </Attribute>
          <Value>Ravenscourt Surgery</Value>
        </AttributeValuePair>
      </Row>
    </GetResultSetResponse>
  </soap:Body>
</soap:Envelope>
```
