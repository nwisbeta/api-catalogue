# Using GetTableSchema and GetNamespaceSchema to generate DTOs

This guide explains how you can use the `GetTableSchema` and `GetNamespaceSchema` operations to generate classes for Data Transfer Objects (DTOs). If you haven't already, take a look at the [quickstart](/wrds-reference-data-and-schema-lookup/api-guide/quickstart) to get set up for sending requests.  

DTOs are a pattern used in object oriented programming to transfer data using simple objects.  You can save time writing code by using tools to generate the class definitions for DTOs from an XML Schema.

In this example, we'll use [xsd.exe][1] to generate C# classes from a schema. Similar tools are available for other languages (e.g. XMLBeans for Java)

We want to generate definitions DTOs to hold data returned from `/GetTable/GP2GP/WelshGPPracticeMainSites`

The namespace of the table we want to query is `GP2GP`, so we'll first fetch the Namespace schema

1. Make an API call: `GET .../GetNamespaceSchema/GP2GP`
   Save the response as **GP2GP.xsd**
2. Make an API call `GET .../GetTableSchema/GP2GP/WelshGPPracticeMainSites`
   Save the response as **WelshGPPracticeMainSites.xsd**
3. Run XSD.exe to generate the C# `xsd.exe /c GP2GP.xsd WelshGPPracticeMainSites.xsd`

The resulting output should contain a class definition something like below.  

You can use the class definition to de-serialize XML returned from `GetTable` requests into C# objects for use elsewhere in your application.

```csharp
/// lines omitted for brevity
public partial class Row {
    
    private string activeFromField;       
    /// other fields omitted for brevity

    [System.Xml.Serialization.XmlElementAttribute(Namespace="http://www.wales.nhs.uk/namespaces/NSD/GP2GP")]
    public string ActiveFrom {
        get {
            return this.activeFromField;
        }
        set {
            this.activeFromField = value;
        }
    }
    /// other properties omitted for brevity
    
```



[1]:https://docs.microsoft.com/en-us/dotnet/standard/serialization/xml-schema-definition-tool-xsd-exe
