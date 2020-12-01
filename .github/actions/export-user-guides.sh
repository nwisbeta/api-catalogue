#!/bin/bash

# For Debugging 
# -------------------------------------------------------------------------------------
# GITHUB_WORKSPACE=
# -------------------------------------------------------------------------------------

OUTDIR=user-guides

if [[ -z "$GITHUB_WORKSPACE" ]]
then
  echo "env var GITHUB_WORKSPACE is unset or does not exist"
fi

cd $GITHUB_WORKSPACE || exit

for ug in $(find . -name user-guide | sed 's/\.\///g')
do
  system=$(echo $ug | cut -d'/' -f 2)
  api=$(echo $ug | cut -d'/' -f 3)
  echo "${system}-${api}..."
  mkdir -p $OUTDIR/${system}-${api}
  cp -r $ug/* $OUTDIR/${system}-${api}/

done

