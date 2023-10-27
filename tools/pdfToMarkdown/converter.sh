#!/bin/bash

FIX_FILEPATH=''

read -rp "pdf path: " FIX_FILEPATH

node tools/pdfToMarkdown/converter.js "$FIX_FILEPATH" || exit 1