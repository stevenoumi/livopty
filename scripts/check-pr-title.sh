#!/usr/bin/env sh
# Expected format: [Type][Scope] : description, e.g. "[Fix][CI] : corriger la publication"
title="$1"

pattern='^\[(Feat|Fix|Docs|Style|Refactor|Perf|Test|Build|CI|Chore|Revert)\](\[[^]]+\])? : .+$'

if ! printf '%s' "$title" | grep -Eq "$pattern"; then
  echo "Titre de pull request invalide : $title"
  echo "Attendu : [Type][Portée] : description"
  echo "Types : Feat Fix Docs Style Refactor Perf Test Build CI Chore Revert"
  exit 1
fi
