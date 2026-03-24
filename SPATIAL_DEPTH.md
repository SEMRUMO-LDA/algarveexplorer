# Profundidade Espacial (Spatial Depth & Magnetic Interactions)

## Visão Geral

Sistema completo de micro-interações magnéticas e parallax 3D que cria a ilusão de profundidade espacial, transformando o website numa janela tridimensional para o Algarve.

## Características Principais

### 1. **Cursor Magnético Adaptativo (Desktop Only)**
Substitui o cursor padrão por um círculo subtil que:
- Segue o rato com física spring suave
- Muda de cor/tamanho ao passar por elementos interativos
- Usa `mix-blend-difference` para contraste automático
- **Apenas visível em dispositivos com pointer device (desktop)**

**Estados do Cursor:**
| Estado | Cor | Escala | Uso |
|--------|-----|--------|-----|
| Default | `rgba(218, 105, 39, 0.4)` | 1.0 | Estado normal |
| Dark Magnetic | `rgba(13, 67, 87, 0.6)` | 1.5 | Botões escuros |
| Light Magnetic | `rgba(218, 105, 39, 0.6)` | 1.5 | Botões claros |
| Orange Magnetic | `rgba(218, 105, 39, 0.8)` | 1.8 | CTAs laranja principais |
| Hover Link | `rgba(218, 105, 39, 0.5)` | 1.3 | Links/botões genéricos |

### 2. **Botões Magnéticos (Gravitational Pull)**
Elementos são "puxados" na direção do cursor quando este se aproxima:
- **Strength:** 0.25-0.4 (força da atração)
- **Spring physics:** stiffness 150, damping 15
- Movimento suave e natural sem ser exagerado

### 3. **Parallax Interno (Glassmorphism 2.0)**
Imagens movem-se dentro das suas molduras:
- **Scroll parallax:** 10-20% diferente da página
- **Mouse parallax:** Movimento subtil 2-4% ao hover
- **Rotação 3D:** ±2° nos eixos X/Y
- Cria ilusão de janela 3D para o Algarve

## Componentes Criados

### `MagneticCursor.tsx`

Cursor personalizado com detecção automática de elementos magnéticos.

**Detecção Automática:**
```tsx
// O cursor adapta-se automaticamente baseado no atributo data-magnetic
<button data-magnetic="dark">Botão Escuro</button>
<button data-magnetic="light">Botão Claro</button>
<button data-magnetic="orange">CTA Principal</button>
```

**Física do Cursor:**
- **Spring Config:** damping 25, stiffness 300, mass 0.5
- **Transição de Cor:** 0.4s
- **Transição de Escala:** 0.3s com easing cinematográfico

**Características:**
- ✅ Apenas desktop (detecta `pointer: fine`)
- ✅ Mix-blend-difference para contraste
- ✅ Inner dot fixo para precisão
- ✅ Remove cursor padrão via CSS

### `MagneticButton.tsx`

Wrapper que adiciona atração magnética a qualquer elemento.

**Uso Básico:**
```tsx
import MagneticButton from '../components/MagneticButton';

<MagneticButton
  as="button"              // 'button' | 'a' | 'div'
  magneticType="orange"    // 'dark' | 'light' | 'orange'
  strength={0.35}          // 0.1 - 0.5 (força da atração)
  className="..."
  onClick={handleClick}
>
  Texto do Botão
</MagneticButton>

// Para links
<MagneticButton
  as="a"
  href="#/tours"
  magneticType="dark"
  strength={0.3}
  className="..."
>
  Ver Tours
</MagneticButton>
```

**Props:**
```typescript
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  magneticType?: 'dark' | 'light' | 'orange';
  strength?: number;           // 0.1-0.5 recomendado
  as?: 'button' | 'a' | 'div';
  href?: string;              // Para as="a"
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: any;         // Props adicionais
}
```

**Física Magnética:**
```javascript
// Cálculo da atração
const deltaX = mouseX - centerX;
const deltaY = mouseY - centerY;

// Aplica força magnética
x: deltaX * strength
y: deltaY * strength

// Spring animation
stiffness: 150
damping: 15
mass: 0.1
```

### `ParallaxImage.tsx`

Imagem com movimento parallax interno (scroll + mouse).

**Uso Básico:**
```tsx
import ParallaxImage from '../components/ParallaxImage';

<ParallaxImage
  src="/image/tour.jpg"
  alt="Tour description"
  scrollStrength={0.15}      // 0.1-0.2 para scroll
  mouseStrength={0.03}       // 0.02-0.05 para mouse
  enableMouseParallax={true}
  objectPosition="right center"
  className="..."
  containerClassName="aspect-[4/5] rounded-2xl overflow-hidden"
/>
```

**Props:**
```typescript
interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  scrollStrength?: number;      // 0.1 = 10% diferença
  mouseStrength?: number;       // 0.03 = 3% movimento
  enableMouseParallax?: boolean;
  objectPosition?: string;      // CSS object-position
}
```

**Efeitos Parallax:**

1. **Scroll Parallax:**
   - Range: `[start end, end start]`
   - Transform Y: `±scrollStrength * 100%`
   - Scale: 1.1 → 1.0 → 1.1 (zoom in/out)

2. **Mouse Parallax:**
   - Movimento X/Y baseado na posição relativa
   - Rotação 3D: ±2° em X e Y
   - Spring config: stiffness 100, damping 30

3. **Initial State:**
   - Scale: 1.1 para evitar bordas brancas
   - Transition: 0.6s cinematográfico

## Implementação nas Páginas

### Tours Page

**Tour Cards com Parallax:**
```tsx
<ParallaxImage
  src={tour.image}
  alt={tour.title}
  scrollStrength={0.15}
  mouseStrength={0.03}
  objectPosition="right center"
/>
```

**Resultados:**
- ✅ Imagens movem-se ao scroll (15% offset)
- ✅ Hover cria movimento 3D subtil
- ✅ Sensação de profundidade nos cards

### TourDetail Page

**Hero com Parallax Intenso:**
```tsx
<ParallaxImage
  src={tour.heroImage}
  alt={tour.title}
  scrollStrength={0.2}      // Mais intenso no hero
  mouseStrength={0.04}      // Mais reativo ao mouse
  objectPosition="right center"
/>
```

**CTAs Magnéticos:**
```tsx
<MagneticButton
  as="a"
  href="#/contacts"
  magneticType="dark"
  strength={0.35}
  className="..."
>
  Book Now
</MagneticButton>
```

### FooterCTA Component

**Botões com Atração Magnética:**
```tsx
// Botão principal (laranja)
<MagneticButton
  magneticType="orange"
  strength={0.4}
  className="bg-[#da6927] ..."
>
  Browse Tours
</MagneticButton>

// Botão secundário (claro)
<MagneticButton
  magneticType="light"
  strength={0.3}
  className="border border-white/20 ..."
>
  Contact Us
</MagneticButton>
```

## Valores Recomendados

### Magnetic Strength (Força de Atração)

| Elemento | Strength | Razão |
|----------|----------|-------|
| CTA Principal | 0.35-0.4 | Máxima atenção |
| Botão Secundário | 0.25-0.3 | Subtil mas presente |
| Links de Navegação | 0.2-0.25 | Muito subtil |
| Cards/Cards | 0.15-0.2 | Apenas um toque |

### Parallax Strength

| Contexto | Scroll | Mouse | Razão |
|----------|--------|-------|-------|
| Hero Principal | 0.2 | 0.04 | Máximo impacto |
| Tour Cards | 0.15 | 0.03 | Equilíbrio |
| Thumbnails | 0.1 | 0.02 | Subtil |
| Background | 0.05 | 0.01 | Quase imperceptível |

## Performance & Otimização

### GPU Acceleration
Todas as transformações usam propriedades aceleradas:
```css
transform: translate3d() scale() rotateX() rotateY()
```

### Intersection Observer
O parallax só ativa quando elementos estão visíveis:
```tsx
const observer = new IntersectionObserver(
  ([entry]) => setIsInView(entry.isIntersecting),
  { threshold: 0.1 }
);
```

### Pointer Device Detection
Cursor magnético apenas em desktop:
```javascript
const hasPointer = window.matchMedia('(pointer: fine)').matches;
```

### Spring Physics Otimizado
```javascript
// MagneticButton (rápido, responsivo)
stiffness: 150
damping: 15
mass: 0.1

// MagneticCursor (suave, fluido)
stiffness: 300
damping: 25
mass: 0.5

// ParallaxImage (natural, orgânico)
stiffness: 100
damping: 30
```

## Integração no App

**App.tsx:**
```tsx
import MagneticCursor from './components/MagneticCursor';

const App = () => (
  <Router>
    <MagneticCursor />  {/* Ativa globalmente */}
    {/* resto da app */}
  </Router>
);
```

O cursor ativa-se automaticamente e detecta todos os elementos com:
- `data-magnetic` attribute
- Tags `<a>`, `<button>`
- Elementos com `role="button"`

## Accessibility

### Desktop Experience
- ✅ Cursor magnético com physics naturais
- ✅ Visual feedback em todos os interativos
- ✅ Parallax subtil (não causa motion sickness)

### Mobile Experience
- ✅ Cursor desativado automaticamente
- ✅ Magnetic buttons funcionam normalmente
- ✅ Parallax funciona com scroll touch

### Motion Sensitivity
Para utilizadores sensíveis a movimento, considere:
```tsx
// Desativar parallax se prefers-reduced-motion
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

<ParallaxImage
  scrollStrength={prefersReducedMotion ? 0 : 0.15}
  mouseStrength={prefersReducedMotion ? 0 : 0.03}
/>
```

## Troubleshooting

### Cursor não aparece
- ✅ Verifique se está em desktop (`pointer: fine`)
- ✅ Confirme que `MagneticCursor` está no `App.tsx`
- ✅ Teste em diferentes browsers (pode ter incompatibilidades)

### Botões não são atraídos
- ✅ Verifique se `data-magnetic` está definido
- ✅ Confirme que `MagneticButton` envolve o elemento
- ✅ Teste com `strength` maior (0.4-0.5)

### Parallax não funciona
- ✅ Container precisa de `overflow: hidden`
- ✅ Imagem precisa ser maior que container (scale 1.1)
- ✅ Verifique se está dentro do viewport

### Performance issues
- ✅ Reduza `scrollStrength` e `mouseStrength`
- ✅ Use Intersection Observer (já implementado)
- ✅ Limite número de elementos parallax simultâneos

## Próximos Passos (Expansão)

### Adicionar a outras páginas
1. **Home Hero:** Parallax intenso no vídeo/imagem principal
2. **About Page:** Cards com magnetic hover
3. **Contacts:** Form buttons com atração magnética
4. **Navbar:** Links com magnetic subtle

### Variações Avançadas

**Magnetic Hover com Scale:**
```tsx
const MagneticScaleButton = () => {
  const [scale, setScale] = useState(1);

  return (
    <MagneticButton
      strength={0.3}
      onMouseEnter={() => setScale(1.05)}
      onMouseLeave={() => setScale(1)}
      style={{ transform: `scale(${scale})` }}
    >
      Button
    </MagneticButton>
  );
};
```

**Parallax com Blur Progressivo:**
```tsx
<motion.div
  style={{
    filter: useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(10px)'])
  }}
>
  <ParallaxImage {...props} />
</motion.div>
```

## Dependências

```json
{
  "framer-motion": "^12.38.0"
}
```

## Referências

- [Awwwards - Magnetic Cursor Trend](https://www.awwwards.com/awwwards/collections/cursor/)
- [Framer Motion - useSpring](https://www.framer.com/motion/use-spring/)
- [Parallax Scrolling Best Practices](https://web.dev/parallax/)

---

**Implementado em:** 2026-03-24
**Versão:** 1.0.0
**Biblioteca:** Framer Motion v12
**Compatibilidade:** Chrome 90+, Firefox 88+, Safari 14+
