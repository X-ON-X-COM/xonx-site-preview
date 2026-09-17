#!/usr/bin/env bash
# Send one plain-text message to Telegram. Takes the file holding the text.
#
# Deliberately quiet about the token and loud about everything else: if the two
# secrets are missing the workflow must still finish (the issue is the fallback),
# but the log has to say why nothing arrived. A 403 here almost always means the
# recipient never pressed Start in that bot's chat, not a bad token.
set -uo pipefail

file="${1:?usage: send-telegram.sh <file>}"

if [ -z "${TG_BOT_TOKEN:-}" ] || [ -z "${TG_CHAT_ID:-}" ]; then
  echo "TG_BOT_TOKEN / TG_CHAT_ID are not set, nothing sent. Text was:"
  cat "$file"
  exit 0
fi

response=$(curl -sS -X POST "https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage" \
             -d chat_id="${TG_CHAT_ID}" \
             -d disable_web_page_preview=true \
             --data-urlencode "text@${file}")

if echo "$response" | grep -q '"ok":true'; then
  echo "sent to Telegram"
else
  # never echo the token; the API does not put it in the body, but be explicit
  echo "Telegram refused the message: $response"
  exit 1
fi
