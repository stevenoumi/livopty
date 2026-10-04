#!/usr/bin/env sh
# Shared by the pre-push hook and the CI, so both enforce the same rule.
branch="${1:-$(git rev-parse --abbrev-ref HEAD)}"

case "$branch" in
  master | main) exit 0 ;;
esac

pattern='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert|hotfix|release)/[a-z0-9]+(-[a-z0-9]+)*$'

if ! printf '%s' "$branch" | grep -Eq "$pattern"; then
  echo "Nom de branche invalide : $branch"
  echo "Attendu : <type>/<description-en-minuscules-avec-des-tirets>"
  echo "Types : feat fix docs style refactor perf test build ci chore revert hotfix release"
  exit 1
fi
