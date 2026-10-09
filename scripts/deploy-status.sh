#!/usr/bin/env bash
# Show the latest GitHub Pages deploy run. Uses the GitHub login saved in the
# macOS keychain by git (no gh CLI needed). Optional: --wait to poll until done.
set -euo pipefail
REPO="Brianvimalan01/brv"
TOKEN=$(printf 'protocol=https\nhost=github.com\nusername=Brianvimalan01\n\n' \
  | git credential-osxkeychain get | sed -n 's/^password=//p')
[ -n "$TOKEN" ] || { echo "No GitHub login in keychain — run a git push once to sign in."; exit 1; }

latest() {
  curl -fsS -H "Authorization: token $TOKEN" \
    "https://api.github.com/repos/$REPO/actions/runs?per_page=1&event=push" \
  | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const r=JSON.parse(s).workflow_runs[0];
      if(!r){console.log("none");return}
      console.log([r.status,r.conclusion??"-",r.head_sha.slice(0,7),r.display_title,r.html_url].join("\t"))})'
}

line=$(latest)
if [ "${1:-}" = "--wait" ]; then
  while [ "$(cut -f1 <<<"$line")" != "completed" ]; do sleep 10; line=$(latest); done
fi
IFS=$'\t' read -r status conclusion sha title url <<<"$line"
echo "Deploy: $status / $conclusion  ($sha) $title"
echo "Run:    $url"
echo "Site:   https://brianvimalan01.github.io/brv/"
[ "$status" != "completed" ] || [ "$conclusion" = "success" ]
