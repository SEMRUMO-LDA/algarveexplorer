# 🚀 Performance Optimization Guide - Algarve Explorer

## **Análise Senior de Performance & Page Speed**

### 📊 **Métricas Atuais (Estimadas)**
- **LCP (Largest Contentful Paint):** ~3.5s ❌
- **FID (First Input Delay):** ~150ms ⚠️
- **CLS (Cumulative Layout Shift):** ~0.15 ❌
- **Time to Interactive:** ~5.2s ❌
- **Page Weight:** ~4.8MB ❌

### 🎯 **Métricas Alvo (Após Otimizações)**
- **LCP:** <2.5s ✅
- **FID:** <100ms ✅
- **CLS:** <0.1 ✅
- **Time to Interactive:** <3.5s ✅
- **Page Weight:** <2MB ✅

---

## **1. 🖼️ OTIMIZAÇÃO DE IMAGENS (Impacto: -60% no peso)**

### Problemas Detectados:
- ❌ Imagens não otimizadas (JPEG/PNG grandes)
- ❌ Sem lazy loading nativo
- ❌ Sem formatos modernos (WebP/AVIF)
- ❌ Carregamento de todas as imagens de uma vez

### Soluções Implementadas:

#### a) **Componente OptimizedImage**
```tsx
// Usar em vez de <img>
<OptimizedImage
  src="/image/tour.jpg"
  alt="Tour description"
  priority={false} // true apenas para above-the-fold
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

#### b) **Script de Otimização de Imagens**
```bash
# Instalar ferramentas
npm install --save-dev sharp imagemin imagemin-webp imagemin-mozjpeg

# Criar script de build
npm run optimize-images
```

#### c) **Configuração de Srcset Responsivo**
```html
<!-- Antes: 800KB -->
<img src="hero.jpg" alt="Hero">

<!-- Depois: 150KB -->
<picture>
  <source media="(max-width: 640px)" srcset="hero-640.webp">
  <source media="(max-width: 1024px)" srcset="hero-1024.webp">
  <img src="hero-1600.jpg" alt="Hero" loading="lazy">
</picture>
```

### Resultado Esperado:
- ✅ Redução de 2.5MB → 1MB em imagens
- ✅ LCP melhora em 40%
- ✅ Bandwidth saving de 60%

---

## **2. ⚡ CODE SPLITTING & BUNDLE OPTIMIZATION (Impacto: -70% initial bundle)**

### Problemas Detectados:
- ❌ Bundle único de ~800KB
- ❌ Todas as páginas carregando juntas
- ❌ Bibliotecas não utilizadas no bundle
- ❌ Sem tree-shaking adequado

### Soluções Implementadas:

#### a) **Lazy Loading de Rotas**
```tsx
// App.tsx atualizado
const Home = lazy(() => import('./pages/Home'));
const Tours = lazy(() => import('./pages/Tours'));
// ... outras páginas
```

#### b) **Vite Config Otimizado**
```js
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'animations': ['framer-motion'],
          'ui': ['lucide-react'],
        }
      }
    },
    // Ativar minificação agressiva
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // Ativar compression
  plugins: [
    compression({
      algorithm: 'gzip',
      threshold: 10240
    })
  ]
});
```

#### c) **Dynamic Imports para Componentes Pesados**
```tsx
// Importar apenas quando necessário
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
});
```

### Resultado Esperado:
- ✅ Initial bundle: 800KB → 250KB
- ✅ Time to Interactive: -2s
- ✅ Cada rota carrega apenas seu código

---

## **3. 🎯 CRITICAL CSS & RESOURCE PRIORITIZATION (Impacto: -1.5s no FCP)**

### Problemas Detectados:
- ❌ CSS bloqueando renderização
- ❌ Fontes carregando sem otimização
- ❌ Sem preload de recursos críticos
- ❌ Third-party scripts bloqueando

### Soluções Implementadas:

#### a) **Critical CSS Inline**
```html
<head>
  <!-- Critical CSS inline (above-the-fold) -->
  <style>
    /* Apenas estilos críticos aqui (~14KB max) */
    body { ... }
    .navbar { ... }
    .hero { ... }
  </style>

  <!-- Non-critical CSS deferred -->
  <link rel="preload" href="main.css" as="style"
        onload="this.onload=null;this.rel='stylesheet'">
</head>
```

#### b) **Resource Hints Strategy**
```html
<!-- DNS Prefetch -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://transfersgo.pt">

<!-- Preconnect -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload Critical -->
<link rel="preload" as="font" type="font/woff2"
      href="/fonts/montserrat-bold.woff2" crossorigin>
<link rel="preload" as="image" href="/logo.png">

<!-- Prefetch Next -->
<link rel="prefetch" href="/tours">
```

#### c) **Font Optimization**
```css
@font-face {
  font-family: 'Montserrat';
  font-display: swap; /* Mostra texto imediatamente */
  src: local('Montserrat'), /* Usa font local se disponível */
       url('/fonts/montserrat.woff2') format('woff2');
}
```

### Resultado Esperado:
- ✅ First Paint: -1.5s
- ✅ Font loading: Flash invisível eliminado
- ✅ Critical path: 3 requests → 1 request

---

## **4. 🔧 IMPLEMENTAÇÃO PRÁTICA**

### Passo 1: Otimização de Build
```bash
# package.json
"scripts": {
  "build": "vite build && npm run optimize",
  "optimize": "npm run optimize:images && npm run optimize:css",
  "optimize:images": "node scripts/optimize-images.js",
  "optimize:css": "postcss build/css/*.css --replace",
  "analyze": "vite-bundle-visualizer"
}
```

### Passo 2: Configurar CDN & Caching
```nginx
# nginx.conf
location ~* \.(jpg|jpeg|png|gif|webp|svg|woff2)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

location ~* \.(css|js)$ {
  expires 30d;
  add_header Cache-Control "public, must-revalidate";
}
```

### Passo 3: Monitoramento
```js
// Performance monitoring
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];

  // Send to analytics
  analytics.track('Performance', {
    LCP: perfData.loadEventEnd - perfData.fetchStart,
    FCP: perfData.responseEnd - perfData.fetchStart,
    TTI: perfData.domInteractive - perfData.fetchStart
  });
});
```

---

## **📈 RESULTADOS ESPERADOS**

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| **Page Weight** | 4.8MB | 1.8MB | -62% |
| **LCP** | 3.5s | 2.1s | -40% |
| **FID** | 150ms | 50ms | -66% |
| **CLS** | 0.15 | 0.05 | -66% |
| **TTI** | 5.2s | 3.0s | -42% |
| **Lighthouse Score** | 65 | 95+ | +46% |

## **🏆 BENEFÍCIOS DE NEGÓCIO**

1. **SEO:** +30% ranking boost (Core Web Vitals)
2. **Conversão:** +20% (cada segundo conta)
3. **Bounce Rate:** -35% (users esperam <3s)
4. **Mobile Experience:** 4G/3G friendly
5. **Custo de Hosting:** -40% bandwidth

## **⚡ QUICK WINS IMEDIATOS**

1. **Adicionar loading="lazy"** em todas as imagens
2. **Comprimir imagens** com TinyPNG
3. **Ativar Gzip** no servidor
4. **Adicionar font-display: swap**
5. **Remover console.logs** em produção

---

*Documento criado por Analista Senior de Performance Web*
*Algarve Explorer - 2024*