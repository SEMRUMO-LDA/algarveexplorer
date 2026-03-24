# Navegação Cinematográfica (Cinematic Navigation)

## Visão Geral

Este sistema implementa transições de estado premium em vez de carregamentos tradicionais de página, proporcionando uma experiência fluida e cinematográfica inspirada em aplicações nativas de alto desempenho.

## Características Principais

### 1. **Image Morphing (Transformação de Imagem)**
Quando o utilizador clica numa imagem de tour na página Tours, essa imagem:
- Expande-se fluidamente do seu tamanho original
- Transforma-se para ocupar o ecrã inteiro
- Torna-se a secção Hero da página de detalhes
- **Duração:** 1.2s com easing cinematográfico `[0.76, 0, 0.24, 1]`

### 2. **Staggered Text Animations (Animações de Texto Escalonadas)**
O texto entra com um efeito de cascata:
- Cada elemento entra com ~80ms de diferença
- Movimento suave de baixo para cima (30px)
- Fade-in progressivo
- **Duração:** 0.7-0.8s por elemento

### 3. **Card Grid Animations (Animações de Grelha)**
Os cards de tours aparecem progressivamente:
- Stagger de 100ms entre cards
- Animação de entrada de baixo para cima (40px)
- **Duração:** 0.7s por card

## Componentes Criados

### `SharedImageTransition.tsx`
Gerencia a transição global de imagens entre páginas.

```tsx
import { useSharedImage } from '../components/SharedImageTransition';

// Na página de origem (Tours)
const { startTransition } = useSharedImage();

const handleClick = (e, tour) => {
  const imageElement = e.currentTarget.querySelector('img');
  startTransition(tour.image, imageElement);
  navigate(`/tours/${tour.slug}`);
};

// Na página de destino (TourDetail)
const { completeTransition, transitionState } = useSharedImage();

useEffect(() => {
  if (transitionState.isTransitioning) {
    setTimeout(() => completeTransition(), 1200);
  }
}, [transitionState.isTransitioning]);
```

**Propriedades do Context:**
- `startTransition(imageUrl, element)` - Inicia a transição
- `transitionState` - Estado atual da transição
- `completeTransition()` - Completa a transição

### `PageTransition.tsx`
Wrapper simples para fade-in/fade-out de páginas.

```tsx
import PageTransition from '../components/PageTransition';

const MyPage = () => (
  <PageTransition>
    <div>Conteúdo da página</div>
  </PageTransition>
);
```

### `CinematicText.tsx`
Componente para animações de texto com stagger.

```tsx
import CinematicText from '../components/CinematicText';

// Por palavra (padrão)
<CinematicText
  className="text-4xl"
  delay={0.2}
  stagger={0.05}
  splitBy="word"
>
  O seu texto aqui
</CinematicText>

// Sem split (elemento único)
<CinematicText
  className="text-xl"
  delay={0.3}
  splitBy="none"
>
  Texto animado como um bloco único
</CinematicText>
```

**Props:**
- `splitBy`: `'word'` | `'line'` | `'none'` - Como dividir o texto
- `delay`: `number` - Atraso inicial (segundos)
- `stagger`: `number` - Tempo entre cada item (segundos)
- `className`: `string` - Classes CSS

## Implementação nas Páginas

### Tours Page (`pages/Tours.tsx`)

**Características implementadas:**
1. Grid de cards com stagger animation
2. Click handler para iniciar transição de imagem
3. Navegação programática com delay

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
  }
};
```

### TourDetail Page (`pages/TourDetail.tsx`)

**Características implementadas:**
1. Hero section com staggered animations
2. Breadcrumb, badges e título animados
3. Sincronização com transição de imagem

```tsx
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3
    }
  }
};
```

### App.tsx

**Mudanças principais:**
1. Envolvido com `SharedImageProvider`
2. `AnimatePresence` com `mode="wait"` para transições limpas
3. Rota corrigida para `/tours/:slug`

```tsx
<SharedImageProvider>
  <Router>
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/tours/:slug" element={<TourDetail />} />
      </Routes>
    </AnimatePresence>
  </Router>
</SharedImageProvider>
```

## Configuração de Easing (Bezier Curves)

### Easing Cinematográfico
```javascript
// Transições principais (morph, expansão)
ease: [0.76, 0, 0.24, 1]  // Suave e premium

// Fade-ins e movimentos
ease: [0.25, 0.1, 0.25, 1]  // Natural e fluido
```

## Durações Recomendadas

| Elemento | Duração | Uso |
|----------|---------|-----|
| Image Morph | 1.2s | Transição de imagem completa |
| Text Fade-in | 0.7-0.8s | Entrada de texto individual |
| Card Entrance | 0.7s | Cards de grid |
| Stagger Delay | 0.08-0.1s | Entre elementos numa sequência |

## Otimização e Performance

### Prevenção de Re-renders
- Use `useCallback` nos handlers de transição
- Memoize variantes de animação quando possível

### GPU Acceleration
As seguintes propriedades são automaticamente aceleradas:
- `opacity`
- `transform` (scale, translate)
- `filter` (usado no morph)

### Scroll Behavior
```tsx
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
```

## Próximos Passos (Expansão)

### Adicionar a outras páginas
Para adicionar cinematic navigation a outras páginas:

1. **Página de Origem (com click):**
```tsx
import { useSharedImage } from '../components/SharedImageTransition';
import { useNavigate } from 'react-router-dom';

const { startTransition } = useSharedImage();
const navigate = useNavigate();

const handleClick = (e, item) => {
  e.preventDefault();
  const img = e.currentTarget.querySelector('img');
  startTransition(item.imageUrl, img);
  setTimeout(() => navigate(`/destination/${item.id}`), 50);
};
```

2. **Página de Destino:**
```tsx
import { motion } from 'framer-motion';
import { useSharedImage } from '../components/SharedImageTransition';

const { completeTransition, transitionState } = useSharedImage();

useEffect(() => {
  if (transitionState.isTransitioning) {
    setTimeout(() => completeTransition(), 1200);
  }
}, [transitionState.isTransitioning]);

// Adicionar animações staggered ao conteúdo
```

### Variações de Animação

**Para Hero Sections:**
```tsx
const heroVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
  }
};
```

**Para Sidebars/Panels:**
```tsx
const slideInVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};
```

## Troubleshooting

### A imagem não transiciona
- Verifique se `SharedImageProvider` está no topo da árvore
- Confirme que o elemento de imagem existe antes de chamar `startTransition`
- Verifique se a rota de destino está correta

### Animações não aparecem
- Certifique-se que `AnimatePresence` tem `mode="wait"`
- Verifique se `initial`, `animate` e `exit` estão definidos
- Confirme que Framer Motion está instalado: `npm list framer-motion`

### Performance issues
- Reduza o número de elementos com stagger
- Use `will-change: transform` em CSS para elementos animados
- Considere `layoutId` do Framer Motion para transições mais complexas

## Dependências

```json
{
  "framer-motion": "^12.38.0",
  "react": "^19.2.4",
  "react-router-dom": "^7.13.0"
}
```

## Referências

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Cubic Bezier Generator](https://cubic-bezier.com/)
- [React Router v6+](https://reactrouter.com/)

---

**Implementado em:** 2026-03-24
**Versão:** 1.0.0
**Biblioteca:** Framer Motion v12
