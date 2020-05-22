FROM mcr.microsoft.com/dotnet/core/sdk:2.1 AS build

RUN mkdir /home/apim-resource-kit

COPY apim-resource-kit/src/APIM_ARMTemplate /home/apim-resource-kit/

WORKDIR /home/apim-resource-kit/apimtemplate

RUN dotnet pack -c Release ./apimtemplate.sln

RUN dotnet tool install -g --add-source bin/Release apimtemplate

ENV PATH="$PATH:/root/.dotnet/tools"

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]