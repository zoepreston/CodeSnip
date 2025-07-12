#!/usr/bin/env bash
set -euo pipefail
git fetch --all --prune
git log --pretty=format:'%h %cI %s' --date=iso-local -n 30

