# Quickstart

## FHIR Terminology -- CodeSystem API Structure

### **Definition**

This API will use the **CodeSystem** FHIR Resource, along with the **\$lookup** operation to query SNOMED CT, for concept ID: SNOMED CT Concept \| 138875005

### **Structure**
 Attribute   |  Value
:------------|----------
FHIR Terminology base URL:  | https://www.nameoftermbase/fhir/        
Resource Type:              | CodeSystem/          
 Operation:                 | $lookup          
 System:                    | ?system=http://snomed.info/sct     
 Query:                     | &code=138875005       

### **Url**
{{url}}CodeSystem/\$lookup?system=http://snomed.info/sct&code=138875005 

## FHIR Terminology -- ValueSet API Structure

### **Definition**

> This API will use the **ValueSet** FHIR Resource, along with the
> **\$expand** operation to query all of SNOMED CT for "*Coeliac*".

### **Structure**
 Attribute   |  Value
:------------|----------
FHIR Terminology base URL:  | https://www.nameoftermbase/fhir/        
Resource Type:              | ValueSet/        
 Operation:                 | $expand          
 System:                    | ?url=http://snomed.info/sct?fhir_vs=isa/     
 Query:                     | 138875005        
 Filter:                    | &filter=coeliac    


### **Url**
{url}ValueSet/\$expand?url=http://snomed.info/sct?fhir_vs=isa/138875005&filter=coeliac 

## FHIR Terminology -- ConceptMap API Structure

### **Definition**
This API uses the ConceptMap FHIR Resource, along with the **\$translate** operation to take a source code and will transform this in to the target system, where the appropriate Concept Map exists.


### **Structure**
 Attribute   |  Value
:------------|----------
FHIR Terminology base URL:  | https://www.nameoftermbase/fhir/        
Resource Type:              | ConceptMap/        
Version:              | 1697538221/          
 Operation:                 | $translate             
 Query:                     | ?code=CABDO                    
 Source System:                    | &system= http://nameoftermbase/fhir/CodeSystem/NICIP-20190601 
 Target System:                    | &target=http://snomed.info/sctsct                                                                                                                               
### **Url**      
{url}ConceptMap/1697538221/\$translate?code=CABDO&system=http://nameoftermbase/fhir/CodeSystem/NICIP-20190601&target=http:/snomed.info/sct 

## FHIR Terminology -- CodeSystem API

### **FHIR Code System -- Standard Properties**

The following properties are defined for all FHIR Code Systems:

  **Name**      |    **Usage**
  :-------------|-------------
  **System**     |   The name of the Code System
  **Version**     |  The version of the Code System, which is used for the \$lookup operation
  **Display**    |   The recommended display for the code, if one is known
  **Definition**  |  The definition for the code
  **Designation** |  Other designations for the code
  **Lang.X**    |    Designations in language X (where X is an IETF Language code)
  **Parent**   |     Parent codes for this code (code systems with a defined hierarchy)
  **Child**    |     Children codes of this code (code systems with a defined hierarchy)

### **Example Code System API's**

#### **Example One - Code System \$lookup for SNOMED CT ID \[GET\]**

**Definition**: This example searches SNOMED CT for Concept ID "77132009" - Rocket Fuel (substance).

### **Url**      
{url}CodeSystem/\$lookup?system=http://snomed.info/sct&code=77132009

**Returns**
``` json
{
	"resourceType": "Parameters",
	"parameter": [
		{
			"name": "name",
			"valueString": "SNOMED CT United Kingdom Edition reference set module"
		},
		{
			"name": "version",
			"valueString": "http://snomed.info/sct/999000031000000106/version/20190320"
		},
		{
			"name": "display",
			"valueString": "Rocket fuel"
		},
		{
			"name": "designation",
			"part": [
				{
					"name": "language",
					"valueCode": "en"
				},
				{
					"name": "use",
					"valueCoding": {
						"system": "http://snomed.info/sct",
						"code": "900000000000013009",
						"display": "Synonym"
					}
				},
				{
					"name": "value",
					"valueString": "Rocket fuel"
				}
			]
		},
		{
			"name": "designation",
			"part": [
				{
					"name": "language",
					"valueCode": "en"
				},
				{
					"name": "use",
					"valueCoding": {
						"system": "http://snomed.info/sct",
						"code": "900000000000003001",
						"display": "Fully specified name"
					}
				},
				{
					"name": "value",
					"valueString": "Rocket fuel (substance)"
				}
			]
		},
		{
			"name": "property",
			"part": [
				{
					"name": "code",
					"valueCode": "parent"
				},
				{
					"name": "value",
					"valueCode": "223373004"
				}
			]
		},
		{
			"name": "property",
			"part": [
				{
					"name": "code",
					"valueCode": "parent"
				},
				{
					"name": "value",
					"valueCode": "767721007"
				}
			]
		},
		{
			"name": "property",
			"part": [
				{
					"name": "code",
					"valueCode": "child"
				},
				{
					"name": "value",
					"valueCode": "20028001"
				}
			]
		},
		{
			"name": "property",
			"part": [
				{
					"name": "code",
					"valueCode": "child"
				},
				{
					"name": "value",
					"valueCode": "82981009"
				}
			]
		},
		{
			"name": "property",
			"part": [
				{
					"name": "code",
					"valueCode": "sufficientlyDefined"
				},
				{
					"name": "valueBoolean",
					"valueBoolean": false
				}
			]
		},
		{
			"name": "property",
			"part": [
				{
					"name": "code",
					"valueCode": "effectiveTime"
				},
				{
					"name": "valueString",
					"valueString": "20020131"
				}
			]
		},
		{
			"name": "property",
			"part": [
				{
					"name": "code",
					"valueCode": "moduleId"
				},
				{
					"name": "value",
					"valueCode": "900000000000207008"
				}
			]
		}
	]
}
```



#### **Example Two - Code System \$subsume SNOMED CT Code \[GET\]**

**Definition**: using parameters; is Viral Hepatitis \| 3738000 a
Disorder of Liver 235856003

### **Url**      
{url}CodeSystem/\$subsumes?system=http://snomed.info/sct&codeA=3738000&codeB=235856003



**Returns**
``` json
{
	"resourceType": "Parameters",
	"parameter": [
		{
			"name": "outcome",
			"valueCode": "subsumed-by"
		}
	]
}
```

#### **Example Three - Code System \$validate-code for SNOMED CT ID \[GET\]**
**Definition**: using NICIP code "CACRY" to verify a string against the display name of said concept.

### **Url**      
{url}}CodeSystem/666951fe-d0d9-47bf-acc0-b83bb485ada0/\$validate-code?code=CACRY&display=CT%20Cardiac%20angiogram%20coronary

**Returns**
``` json
{
	"resourceType": "Parameters",
	"parameter": [
		{
			"name": "result",
			"valueBoolean": true
		},
		{
			"name": "display",
			"valueString": "CT Cardiac angiogram coronary"
		}
	]
}
```

> For further information regarding the FHIR specification for Code
Systems, please refer to: 
[hl7.org codesystem](https://www.hl7.org/fhir/codesystem.html)

## FHIR Terminology -- ValueSet API 

### **Example SNOMED CT ValueSet API's**

#### **Example One \| Expand Implicit ValueSet (with filter) \[GET\]**

**Definition**: using the SNOMED CT Expression Constraint Language, a
below, the child concepts of Substance are to be queried for insulin.

### **Url**      
{url}}ValueSet/\$expand?url=http://snomed.info/sct?fhir_vs=ecl/\<105590001&filter=insulin

**Returns**
``` json
{
	"resourceType": "ValueSet",
	"language": "en",
	"url": "http://snomed.info/sct/999000031000000106/version/20190320?fhir_vs=ecl%2F%3C105590001",
	"name": "SNOMED CT ECL expression",
	"status": "active",
	"experimental": false,
	"expansion": {
		"extension": [
			{
				"url": "http://hl7.org/fhir/StructureDefinition/valueset-unclosed",
				"valueBoolean": true
			}
		],
		"identifier": "7f195812-5cdd-4d47-bba1-f9a0640a471a",
		"timestamp": "2019-08-22T12:47:31+00:00",
		"total": 73,
		"parameter": [
			{
				"name": "version",
				"valueUri": "http://snomed.info/sct?version=http%3A%2F%2Fsnomed.info%2Fsct%2F999000031000000106%2Fversion%2F20190320"
			},
			{
				"name": "filter",
				"valueString": "insulin"
			}
		],
		"contains": [
			{
				"system": "http://snomed.info/sct",
				"code": "67866001",
				"display": "Insulin"
			},
			{
				"system": "http://snomed.info/sct",
				"code": "391849003",
				"display": "Biphasic insulin"
			},
			{
				"system": "http://snomed.info/sct",
				"code": "706973004",
				"display": "Bound insulin"
			},
			{
				"system": "http://snomed.info/sct",
				"code": "414261009",
				"display": "Fish insulin"
			},
            
            ........


			{
				"system": "http://snomed.info/sct",
				"code": "418157000",
				"display": "Mecasermin"
			},
			{
				"system": "http://snomed.info/sct",
				"code": "422284004",
				"display": "Mecasermin rinfabate"
			}
		]
	}
}
```

> *For further information regarding SNOMED CT Expression Constraint
> Language, please refer to:*
> [link](https://confluence.ihtsdotools.org/display/DOCECL/Expression+Constraint+Language+-+Specification+and+Guide)
> *and*, *for further information regarding the FHIR specification,
> please refer to:* [link](https://www.hl7.org/fhir/valueset.html)

## FHIR Terminology -- ConceptMap API 

### **Example Value Set API's**

#### **Example One \| Simple Translate \[GET\]**
**Definition**: uses a source concept code, such as NICIP code CABDO,
and maps this to a target system, such as SNOMED CT

### **Url**      
{url}ConceptMap/1697538221/\$translate?code=CABDO&system=http://nameoftermbase/fhir/CodeSystem/NICIP-20190601&target=http:/snomed.info/sct

**Returns**
``` json
{
   "parameter": [
      {
         "name": {
            "@value": "result"
         },
         "valueBoolean": {
            "@value": "true"
         }
      },
      {
         "name": {
            "@value": "match"
         },
         "part": [
            {
               "name": {
                  "@value": "equivalence"
               }
            },
            {
               "name": {
                  "@value": "concept"
               },
               "valueCoding": {
                  "system": {
                     "@value": "http://snomed.info/sct"
                  },
                  "code": {
                     "@value": "169070004"
                  },
                  "display": {
                     "@value": "CT of abdomen"
                  }
               }
            },
            {
               "name": {
                  "@value": "source"
               },
               "valueString": {
                  "@value": "urn:28b23846-a8c0-40fb-bad3-6453cc681ae7/cm"
               }
            }
         ]
      }
   ]
}
```

> *For further information regarding the FHIR specification, please
> refer to:* [HL7 Conceptmap](https://www.hl7.org/fhir/conceptmap.html)
