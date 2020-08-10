# Quickstart

To follow along with this quickstart you'll need:

- a tool for sending sending HTTP requests, e.g. Postman, SOAP UI
- access to a test endpoint, e.g. the public sandbox

If you're using the public sandbox as your test endpoint, you'll find that not all reference data is available. 
However, you can query from the following tables, in the `nrds` namespace 
 - AssigningAuthority
 - GpPracticeMembership
 - SexualHealthClinicsWales
 - vwClinicianMaster
 - WelshOrganisation

and WelshGPPracticeMainSites in the `GP2GP`namespace

The full list of names and namespaces is available on the WRDS Website.

> TODO: Find a public version of the data on the WRDS website 

## Search for GP Practices by Health Board

Every GP practice in Wales has a nationally assigned organisation code.

To retrieve a list of all GP Practice Codes within a specific healthboard, we can query the WelshGPPracticeMainSites table with a filter criteria on the attribute `LHBCode`.
The value to filter on will be the organisation code of the local health board, e.g. `7A1` for Besti Cadwaladr University Health Board.

> NOTE: See here for a list of codes for Welsh health boards:  
  https://odsportal.hscic.gov.uk/Organisation/Search?Code=*&Type=LB


#### Request:
Your request should look something like this:

`GET https://sandbox.api.nhs.wales/wrds/reference-data-and-schema-lookup/GetTable/GP2GP/WelshGPPracticeMainSites?GP2GP:LHBCode=7A1`



#### Response
After sending the request above, you should get a response similar to that shown below.

```xml
<nrds:ResultSet xmlns:gp2="http://www.wales.nhs.uk/namespaces/NSD/GP2GP" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:nrds="http://www.wales.nhs.uk/namespaces/NSD">
    <nrds:Row>
        <gp2:ActiveFrom>1900-01-01</gp2:ActiveFrom>
        <gp2:ActiveTo>1900-01-01</gp2:ActiveTo>
        <gp2:Address2>Abertridwr</gp2:Address2>
        <gp2:Address3></gp2:Address3>
        <gp2:Address4>Caerphilly</gp2:Address4>
        <gp2:BloodPressureArchetype>false</gp2:BloodPressureArchetype>
        <gp2:ClinicalSystem>Vision 360 GP</gp2:ClinicalSystem>
        <gp2:DocumentArchetype>false</gp2:DocumentArchetype>
        <gp2:DrugAllergyArchetype>false</gp2:DrugAllergyArchetype>
        <gp2:GP2GPStatus>true</gp2:GP2GPStatus>
        <gp2:LANOrHosted>Hosted</gp2:LANOrHosted>
        <gp2:LargeMessaging>false</gp2:LargeMessaging>
        <gp2:LHBCode>7A6</gp2:LHBCode>
        <gp2:LocalHealthBoard>Aneurin Bevan ULHB</gp2:LocalHealthBoard>
        <gp2:Locality>Caerphilly</gp2:Locality>
        <gp2:LocalOffice>South East Wales</gp2:LocalOffice>
        <gp2:NoOfBranches>3</gp2:NoOfBranches>
        <gp2:OtherName></gp2:OtherName>
        <gp2:PostCode>CF83 4AZ</gp2:PostCode>
        <gp2:PracticeAddress>30 Thomas Street</gp2:PracticeAddress>
        <gp2:PracticeName>Aber Medical Centre</gp2:PracticeName>
        <gp2:PracticePopulation>7992</gp2:PracticePopulation>
        <gp2:PracticeSize>M</gp2:PracticeSize>
        <gp2:SEFIdentifier>Vision3:RCMR_MT030101UK04</gp2:SEFIdentifier>
        <gp2:SuccWCode></gp2:SuccWCode>
        <gp2:SystemSupplier>In Practice Systems</gp2:SystemSupplier>
        <gp2:SystemType></gp2:SystemType>
        <gp2:SystemVersion>3.660.4020.69</gp2:SystemVersion>
        <gp2:Wcode>W00005</gp2:Wcode>
    </nrds:Row>
    <!-- lines omitted for brevity -->
    <nrds:Row>
        <gp2:ActiveFrom>1900-01-01</gp2:ActiveFrom>
        <gp2:ActiveTo>2018-11-01</gp2:ActiveTo>
        <gp2:Address2>Gorseinon</gp2:Address2>
        <gp2:Address3></gp2:Address3>
        <gp2:Address4>Swansea</gp2:Address4>
        <gp2:BloodPressureArchetype>false</gp2:BloodPressureArchetype>
        <gp2:ClinicalSystem>Emis Web</gp2:ClinicalSystem>
        <gp2:DocumentArchetype>false</gp2:DocumentArchetype>
        <gp2:DrugAllergyArchetype>false</gp2:DrugAllergyArchetype>
        <gp2:GP2GPStatus>false</gp2:GP2GPStatus>
        <gp2:LANOrHosted>Hosted</gp2:LANOrHosted>
        <gp2:LargeMessaging>false</gp2:LargeMessaging>
        <gp2:LHBCode>7A3</gp2:LHBCode>
        <gp2:LocalHealthBoard>ABM ULHB</gp2:LocalHealthBoard>
        <gp2:Locality>Swansea</gp2:Locality>
        <gp2:LocalOffice>Mid &amp; West Wales</gp2:LocalOffice>
        <gp2:NoOfBranches>0</gp2:NoOfBranches>
        <gp2:OtherName></gp2:OtherName>
        <gp2:PostCode>SA4  4NU</gp2:PostCode>
        <gp2:PracticeAddress>Alexandra Road</gp2:PracticeAddress>
        <gp2:PracticeName>Pen y Bryn Surgery</gp2:PracticeName>
        <gp2:PracticePopulation>4882</gp2:PracticePopulation>
        <gp2:PracticeSize>M</gp2:PracticeSize>
        <gp2:SEFIdentifier>EMISWeb:RCMR_MT030101UK04</gp2:SEFIdentifier>
        <gp2:SuccWCode>W98012b</gp2:SuccWCode>
        <gp2:SystemSupplier>Emis</gp2:SystemSupplier>
        <gp2:SystemType></gp2:SystemType>
        <gp2:SystemVersion>8.2.7.0000</gp2:SystemVersion>
        <gp2:Wcode>W98787</gp2:Wcode>
    </nrds:Row>
</nrds:ResultSet>
```