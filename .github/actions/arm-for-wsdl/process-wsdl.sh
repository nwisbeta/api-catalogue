#!/bin/bash

# For Debugging 
# -------------------------------------------------------------------------------------
# GITHUB_WORKSPACE=
# GITHUB_REPOSITORY=
# GITHUB_SHA=
#
# APIM_INSTANCE=
# APIM_SAS_TOKEN=
# -------------------------------------------------------------------------------------

REST_URL=https://${APIM_INSTANCE}.management.azure-api.net/subscriptions/x/resourceGroups/x/providers/Microsoft.ApiManagement/service/x

LOG_LOCATION=arm-for-wsdl

cd $GITHUB_WORKSPACE


[ -d $LOG_LOCATION ] || mkdir $LOG_LOCATION

# Loop through Open API Specs and add them to create config
for wsdl in $(find . -name service.wsdl | sed 's/\.\///g')
do
system=$(echo $wsdl | cut -d'/' -f 2)
api=$(echo $wsdl | cut -d'/' -f 3)

echo "Processing $wsdl..."

cat << EOF > ${LOG_LOCATION}/${system}-${api}.PUT
{
  "properties": {
    "format": "wsdl-link",
    "value": "https://raw.githubusercontent.com/$GITHUB_REPOSITORY/$GITHUB_SHA/$wsdl",
    "path": "apim-devops/${system}/${api}",
    "apiType": "soap"
  }
}
EOF

echo $(date): Sending ${system}-${api} WSDL to APIM ARM REST API... >> $LOG_LOCATION/request.log

curl --request PUT ${REST_URL}/apis/apim-devops-${system}-${api}?api-version=2019-12-01 \
     --header "Content-Type: application/json" \
     --header "Authorization: $APIM_SAS_TOKEN" \
     --data @${LOG_LOCATION}/${system}-${api}.PUT \
     --write-out "HTTP Response: %{http_code}\n" >> $LOG_LOCATION/request.log
done


