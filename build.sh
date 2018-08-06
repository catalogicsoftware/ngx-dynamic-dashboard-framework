#!/bin/bash

#ng config -g cli.warnings.versionMismatch false

npm install

ng build --prod --aot

