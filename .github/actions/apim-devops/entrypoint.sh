#!/bin/sh

cd $GITHUB_WORKSPACE
mkdir arm-templates
mkdir creator-configs

CONFIG_FILE=creator-configs/creator.config.yml

echo "Creating config..."

cat << EOF > $CONFIG_FILE
version: 1.0
apimServiceName: "$1"
apis:
EOF

# Loop through Open API Specs and add them to create config
for f in $(find . -name open-api.yml | sed 's/\.\///g')
do
system=$(echo $f | cut -d'/' -f 2)
api=$(echo $f | cut -d'/' -f 3)

echo "Processing $f..."

cat << EOF >> $CONFIG_FILE
  - name: "$system-$api"
    openApiSpec: "$f"
    policy: "default.policy.xml"
    suffix: "$system/$api"
EOF

done

# Finish up the Creator config file
cat << EOF >> $CONFIG_FILE
outputLocation: "$GITHUB_WORKSPACE/arm-templates"
EOF

echo "Creating ARM Template..."
apim-templates create --configFile $GITHUB_WORKSPACE/$CONFIG_FILE