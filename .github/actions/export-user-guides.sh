#!/bin/bash

# For Debugging 
# -------------------------------------------------------------------------------------
# GITHUB_WORKSPACE=
# -------------------------------------------------------------------------------------

OUTDIR=user-guides

cd $GITHUB_WORKSPACE

for ug in $(find . -name user-guide | sed 's/\.\///g')
do
  system=$(echo $ug | cut -d'/' -f 2)
  api=$(echo $ug | cut -d'/' -f 3)
  echo "${system}-${api}..."
  mkdir -p $OUTDIR/${system}-${api}
  cp -r $ug/* $OUTDIR/${system}-${api}/

done

