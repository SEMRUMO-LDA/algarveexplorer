#!/bin/bash
# Deploy script for Algarve Explorer — cPanel (sem SSH)
# Faz o build local e cria um zip pronto a enviar para o cPanel File Manager.

set -e

echo "🔨 A fazer build de produção..."
NODE_ENV=production npm run build

echo ""
echo "📦 A criar deploy.zip..."

# Remove zip anterior
rm -f deploy.zip

# Cria zip com tudo o que o servidor precisa (sem node_modules — instalar via cPanel)
zip -r deploy.zip \
  .next/ \
  public/ \
  app/ \
  components/ \
  lib/ \
  services/ \
  pages_src/ \
  i18n/ \
  messages/ \
  middleware.ts \
  server.js \
  package.json \
  package-lock.json \
  next.config.ts \
  next-env.d.ts \
  tsconfig.json \
  postcss.config.mjs \
  .env.example \
  -x "*.DS_Store" \
  -x ".next/cache/*"

FILESIZE=$(du -h deploy.zip | cut -f1)
echo ""
echo "✅ deploy.zip criado ($FILESIZE)"
echo ""
echo "Próximos passos:"
echo "  1. Abre o cPanel File Manager"
echo "  2. Navega até /home/algarveexplorer/algarveexplorertours/"
echo "  3. Faz upload do deploy.zip"
echo "  4. Extrai o zip (Extract no File Manager)"
echo "  5. No painel Node.js, clica 'Run NPM Install'"
echo "  6. Reinicia a aplicação"
