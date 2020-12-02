#!/bin/bash

# For Debugging 
# -------------------------------------------------------------------------------------
# GITHUB_WORKSPACE=
GITHUB_WORKSPACE=/mnt/c/development/git/bmcd77/api-catalogue/catalogue
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
  
  if [[ $(ls -a | wc -l) -ne 2 ]] 
  then       
    cp -r $ug/* $OUTDIR/${system}-${api}/
  else 
    echo "WARNING: Directory " $ug " is empty. No files will be included"
  fi

done

