# System Overview

The FHIR Terminology service consists of a RESTful API conforming to the FHIR specification that presents SNOMED CT data to clinical systems according to a set of configurable parameters.  

 

The FHIR $expand operation plus specific SNOMED Expression Constraint Language (ECL) will be used to search SNOMED CT hierarchies held in a FHIR based terminology server (e.g. Ontoserver) 

 
# FHIR Terminology API's

The sections below give specific examples of the API calls and their
returned content. These will work against the test Ontoserver instance
defined in the API call.

## Supported FHIR Resources and Operations

### **FHIR Resource: CodeSystem**


#### Operation: \$lookup

The lookup operation retrieves details about a concept, such as properties and additional labels (designations).

#### Operation: \$subsumes

The subsume operation determines what subsumption/inheritance relationship holds between the specified codes, if any.

#### Operation: \$validate-code

Validate-code indicates whether a code is part of a code system.

### **FHIR Resource: ValueSet**

#### Operation: \$expand

The expand operation on a value set resolves its members. Complex value sets that use filters or import other value sets need to be evaluated at runtime to produce the expansion.

#### Operation: \$validate-code

Validate-code indicates whether a code is part of a value set.

### **FHIR Resource: ConceptMap**

#### Operation: \$translate

Returns a mapping between a code from a source value set to a code in a target value set, if such a mapping exists. The mapping includes the type of equivalence between the codes

#### Operation: \$closure

Support for post-coordination, not yet implemented.

To get started making requests take a look at our [quickstart](/api-guides/wrds/fhir-terminology/quickstart)



## Example Responses

### Example JSON Return

```json
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

###  Example XML Return

 ```xml
<Parameters xmlns="http://hl7.org/fhir">
	<parameter>
		<name value="name"/>
		<valueString value="SNOMED CT United Kingdom Edition reference set module"/>
	</parameter>
	<parameter>
		<name value="version"/>
		<valueString value="http://snomed.info/sct/999000031000000106/version/20190320"/>
	</parameter>
	<parameter>
		<name value="display"/>
		<valueString value="Rocket fuel"/>
	</parameter>
	<parameter>
		<name value="designation"/>
		<part>
			<name value="language"/>
			<valueCode value="en"/>
		</part>
		<part>
			<name value="use"/>
			<valueCoding>
				<system value="http://snomed.info/sct"/>
				<code value="900000000000013009"/>
				<display value="Synonym"/>
			</valueCoding>
		</part>
		<part>
			<name value="value"/>
			<valueString value="Rocket fuel"/>
		</part>
	</parameter>
	<parameter>
		<name value="designation"/>
		<part>
			<name value="language"/>
			<valueCode value="en"/>
		</part>
		<part>
			<name value="use"/>
			<valueCoding>
				<system value="http://snomed.info/sct"/>
				<code value="900000000000003001"/>
				<display value="Fully specified name"/>
			</valueCoding>
		</part>
		<part>
			<name value="value"/>
			<valueString value="Rocket fuel (substance)"/>
		</part>
	</parameter>
	<parameter>
		<name value="property"/>
		<part>
			<name value="code"/>
			<valueCode value="parent"/>
		</part>
		<part>
			<name value="value"/>
			<valueCode value="223373004"/>
		</part>
	</parameter>
	<parameter>
		<name value="property"/>
		<part>
			<name value="code"/>
			<valueCode value="parent"/>
		</part>
		<part>
			<name value="value"/>
			<valueCode value="767721007"/>
		</part>
	</parameter>
	<parameter>
		<name value="property"/>
		<part>
			<name value="code"/>
			<valueCode value="child"/>
		</part>
		<part>
			<name value="value"/>
			<valueCode value="20028001"/>
		</part>
	</parameter>
	<parameter>
		<name value="property"/>
		<part>
			<name value="code"/>
			<valueCode value="child"/>
		</part>
		<part>
			<name value="value"/>
			<valueCode value="82981009"/>
		</part>
	</parameter>
	<parameter>
		<name value="property"/>
		<part>
			<name value="code"/>
			<valueCode value="sufficientlyDefined"/>
		</part>
		<part>
			<name value="valueBoolean"/>
			<valueBoolean value="false"/>
		</part>
	</parameter>
	<parameter>
		<name value="property"/>
		<part>
			<name value="code"/>
			<valueCode value="effectiveTime"/>
		</part>
		<part>
			<name value="valueString"/>
			<valueString value="20020131"/>
		</part>
	</parameter>
	<parameter>
		<name value="property"/>
		<part>
			<name value="code"/>
			<valueCode value="moduleId"/>
		</part>
		<part>
			<name value="value"/>
			<valueCode value="900000000000207008"/>
		</part>
	</parameter>
</Parameters>
```
