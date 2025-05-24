#!/usr/bin/env bash
# Not used programmatically here; kept for personal workflow notes.
now=$(date -u +%s)
skew=$(( (RANDOM % 86400) + 120 ))
date -u -r $((now - skew)) "+%Y-%m-%dT%H:%M:%S"

