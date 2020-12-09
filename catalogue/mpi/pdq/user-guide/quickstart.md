## Quickstart

To follow along with this quickstart you'll need:

- a tool for sending sending HTTP requests, e.g. Postman, SOAP UI
- access to a test endpoint, e.g. the public sandbox

There are a number of different combinations of fields that can be combined to search the MPI. A sample of these will be detailed with examples below. 

### HTTP Header values

To POST any search requests successfully you will need to set the following API Header values. There would be entered under the [Headers tab](https://learning.postman.com/docs/sending-requests/requests/#configuring-request-headers) in Postman or as a [custom HTTP header](https://www.soapui.org/docs/functional-testing/teststep-reference/http-request/headers/) in SOAPUI.

 Field                     |  Value
:--------------------------|:-------------------------------------------------------------
 Ocp-Apim-Subscription-Key |  &ltyour subscription key\>                                
 SOAPAction                |  http://apps.wales.nhs.uk/mpi/InvokePatientDemographicsQuery 
 Content-Type              |  text/xml                                                    

<your subscription key>* is unique to you and is allocated when you sign up to the [NHS Wales Developer Portal](https://developer.nhs.wales/) and subscribe to sandbox api's under your profile (visible once you have signed in). If you use one of the tryit links on the portal for a sandbox api you will see that it is automatically included in each api call.

### Search the MPI PDQ by NHS Number:

Here is a patient demographic query search performed against the MPI search by NHS Number. The input fields are included between the `<PDQ>` tags below. The Nhs Number, 5555599226, is referred to here in the request:

```xml
    ...
    <QIP.1>@PID.3.1</QIP.1>
    <QIP.2>5555599226</QIP.2>
    ...
```

#### Request:

Your complete request which should be sent as an HTTP POST to the [sandbox endpoint](https://dhew-apim-dev.azure-api.net/mpi/pdq) should look like this:

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mpi="http://apps.wales.nhs.uk/mpi/" xmlns:urn="urn:hl7-org:v2xml">
   <soapenv:Header/>
   <soapenv:Body>
      <mpi:InvokePatientDemographicsQuery>
            <QBP_Q21 xmlns="urn:hl7-org:v2xml">
                <MSH>
                    <MSH.1>|</MSH.1>
                    <MSH.2>^~\&amp;</MSH.2>
                    <MSH.3>
                        <HD.1>218</HD.1>
                    </MSH.3>
                    <MSH.4>
                        <HD.1>218</HD.1>
                    </MSH.4>
                    <MSH.5>
                        <HD.1>100</HD.1>
                    </MSH.5>
                    <MSH.6>
                        <HD.1>100</HD.1>
                    </MSH.6>
                    <MSH.7>
                        <TS.1>20180730144339</TS.1>
                    </MSH.7>
                    <MSH.9>
                        <MSG.1>QBP</MSG.1>
                        <MSG.2>Q22</MSG.2>
                        <MSG.3>QBP_Q21</MSG.3>
                    </MSH.9>
                    <MSH.10>9783</MSH.10>
                    <MSH.11>
                        <PT.1>T</PT.1>
                    </MSH.11>
                    <MSH.12>
                        <VID.1>2.5</VID.1>
                    </MSH.12>
                    <MSH.17>GBR</MSH.17>
                    <MSH.19><CE.1>EN</CE.1></MSH.19>
                </MSH>
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
                <RCP>
                    <RCP.1>I</RCP.1>
                </RCP>
            </QBP_Q21>
      </mpi:InvokePatientDemographicsQuery>
   </soapenv:Body>
</soapenv:Envelope>
```

#### Response

After sending the request above, you should get a response similar to that shown below.

Note the response portion of this request is included between the 

```xml
<RSP_K21.QUERY_RESPONSE> ... </RSP_K21.QUERY_RESPONSE> tags
```

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
   <soap:Body>
      <InvokePatientDemographicsQueryResponse xmlns="http://apps.wales.nhs.uk/mpi/">
         <RSP_K21 xmlns="urn:hl7-org:v2xml">
            <MSH>
               <MSH.1>|</MSH.1>
               <MSH.2>^~\&amp;</MSH.2>
               <MSH.3>
                  <HD.1>100</HD.1>
               </MSH.3>
               <MSH.4>
                  <HD.1>100</HD.1>
               </MSH.4>
               <MSH.5>
                  <HD.1>218</HD.1>
               </MSH.5>
               <MSH.6>
                  <HD.1>218</HD.1>
               </MSH.6>
               <MSH.7>
                  <TS.1>20201130032309</TS.1>
               </MSH.7>
               <MSH.9>
                  <MSG.1>RSP</MSG.1>
                  <MSG.2>K22</MSG.2>
                  <MSG.3>RSP_K22</MSG.3>
               </MSH.9>
               <MSH.10>41</MSH.10>
               <MSH.11>
                  <PT.1>P</PT.1>
               </MSH.11>
               <MSH.12>
                  <VID.1>2.5</VID.1>
               </MSH.12>
               <MSH.17>GBR</MSH.17>
               <MSH.19>
                  <CE.1>EN</CE.1>
               </MSH.19>
            </MSH>
            <MSA>
               <MSA.1>AA</MSA.1>
               <MSA.2>9783</MSA.2>
            </MSA>
            <QAK>
               <QAK.1>PatientQuery</QAK.1>
               <QAK.2>OK</QAK.2>
            </QAK>
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
            <RSP_K21.QUERY_RESPONSE>
               <PID>
                  <PID.1>001</PID.1>
                  <PID.3>
                     <CX.1>28905311</CX.1>
                     <CX.4>
                        <HD.1>100</HD.1>
                     </CX.4>
                     <CX.5>PE</CX.5>
                  </PID.3>
                  <PID.3>
                     <CX.1>E123679</CX.1>
                     <CX.4>
                        <HD.1>129</HD.1>
                     </CX.4>
                     <CX.5>PI</CX.5>
                  </PID.3>
                  <PID.3>
                     <CX.1>H8565187</CX.1>
                     <CX.4>
                        <HD.1>149</HD.1>
                     </CX.4>
                     <CX.5>PI</CX.5>
                  </PID.3>
                  <PID.3>
                     <CX.1>206385</CX.1>
                     <CX.4>
                        <HD.1>154</HD.1>
                     </CX.4>
                     <CX.5>PI</CX.5>
                  </PID.3>
                  <PID.3>
                     <CX.1>0000677299</CX.1>
                     <CX.4>
                        <HD.1>237</HD.1>
                     </CX.4>
                     <CX.5>PI</CX.5>
                  </PID.3>
                  <PID.3>
                     <CX.1>5555599226</CX.1>
                     <CX.4>
                        <HD.1>NHS</HD.1>
                     </CX.4>
                     <CX.5>NH</CX.5>
                  </PID.3>
                  <PID.5>
                     <XPN.1>
                        <FN.1>Holmes</FN.1>
                     </XPN.1>
                     <XPN.2>Sherlock</XPN.2>
                     <XPN.5>Mr</XPN.5>
                     <XPN.7>U</XPN.7>
                  </PID.5>
                  <PID.7>
                     <TS.1>19381108000000</TS.1>
                  </PID.7>
                  <PID.8>M</PID.8>
                  <PID.9>
                     <XPN.7>A</XPN.7>
                  </PID.9>
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
                  <PID.13>
                     <XTN.1>07000 111111</XTN.1>
                     <XTN.2>PRN</XTN.2>
                     <XTN.4>sherlock.holmes@example.com</XTN.4>
                  </PID.13>
                  <PID.13>
                     <XTN.2>PRS</XTN.2>
                  </PID.13>
                  <PID.14>
                     <XTN.2>WPN</XTN.2>
                  </PID.14>
                  <PID.22>
                     <CE.1>A</CE.1>
                  </PID.22>
               </PID>
               <PD1>
                  <PD1.3>
                     <XON.3>W31111</XON.3>
                  </PD1.3>
                  <PD1.4>
                     <XCN.1>G3353251</XCN.1>
                  </PD1.4>
               </PD1>
            </RSP_K21.QUERY_RESPONSE>
         </RSP_K21>
      </InvokePatientDemographicsQueryResponse>
   </soap:Body>
</soap:Envelope>
```

### More Search Requests:

We have included a number of similar searches in our publicly available Postman project. Please see Notes on using Postman below. In a If you are in a hurry 2 things are important:

- you will need to use Postman desktop and 
- set your developer portal postman <!--{% raw %}-->{{OcpApimSubscriptionKey}}<!--{% endraw %}--> value before a request will be successfull.

[![MPI PDQ Postman project](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f54d6238f91e83aa9aaf)

In addition we have included 2 edge cases in the Postman search examples. The details of what cases they cover specifically are 
noted in the [MPI user guide overview](/api-guides/mpi-pdq/overview)

### Notes on using [Postman](https://www.postman.com/)

As noted please see our MPI PDQ Postman project for several additional search examples. This project already contains the required HTTP Header entries apart from the value for your specific developer portal subscription key. When you open the Postman project in Postman You will need to add your specific Ocp-Apim-Subscription-Key. It will appear in Postman under the Headers tab as <!--{% raw %}-->{{OcpApimSubscriptionKey}}<!--{% endraw %}-->. If you hover over this in Postman a "Set as variable" window will appear. From there you can click on "Set as new variable" and enter your header value.

Another way to set an do this is to click the Environment quick look (eye button) in the top right of Postman and click Edit next to Globals. A large window will appear showing any saved variables and if you click on "Edit" in the top right of this window you can update or add a new variable and then save this change. Postman documentation for this is available [here](https://learning.postman.com/docs/sending-requests/variables/)

Note Please use [Postman desktop](https://www.postman.com/downloads/) when viewing these requests. Postman web which opens in a browser will issue a CORS (cross-origin resource sharing) error when attempting to send requests from a web browser.






