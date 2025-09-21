# Investimus Website - Versão Modular

Este é o site da Investimus refatorado para uma estrutura modular, profissional e facilmente editável.

## 🚀 Início Rápido

### 1. Instalar Dependências (Opcional)
```bash
npm install
```

### 2. Build do Site
```bash
npm run build
```

### 3. Servir Localmente
```bash
npm run serve
```

O site estará disponível em: http://localhost:8000

## 📁 Estrutura do Projeto

```
site/
├── src/                    # Código fonte modular
│   ├── components/         # Componentes HTML reutilizáveis
│   │   ├── header.html    # Navegação
│   │   ├── hero.html      # Seção principal
│   │   ├── services.html  # Cards de serviços
│   │   ├── about.html     # Seção sobre
│   │   └── ...
│   ├── styles/            # CSS modular
│   │   ├── main.css       # Estilos principais
│   │   ├── components.css # Estilos de componentes
│   │   └── animations.css # Animações
│   ├── scripts/           # JavaScript modular
│   │   ├── main.js        # Script principal
│   │   ├── forms.js       # Validação de formulários
│   │   ├── animations.js  # Intersection Observer
│   │   └── navigation.js  # Menu mobile
│   ├── data/              # Conteúdo editável (JSON)
│   │   ├── site-config.json    # Configurações gerais
│   │   ├── services.json       # Dados dos serviços
│   │   ├── testimonials.json   # Depoimentos
│   │   └── company-info.json   # Informações da empresa
│   └── templates/         # Templates base
│       └── page.html      # Template principal
├── dist/                  # Site compilado (output)
├── assets/               # Imagens e recursos
├── build.js              # Sistema de build
└── package.json          # Dependências
```

## ✏️ Como Editar o Conteúdo

### 1. Textos e Informações Básicas
Edite os arquivos JSON em `src/data/`:

**`site-config.json`** - Informações gerais:
```json
{
  "site": {
    "name": "Investimus",
    "tagline": "Corretora de Seguros Premium"
  },
  "contact": {
    "phone": "(11) 98765-4321",
    "email": "contato@investimus.com.br"
  }
}
```

**`services.json`** - Serviços oferecidos:
```json
{
  "services": [
    {
      "title": "Seguro Auto",
      "description": "Descrição do serviço...",
      "features": ["Feature 1", "Feature 2"]
    }
  ]
}
```

### 2. Layout e Componentes
Edite os arquivos HTML em `src/components/`:
- `header.html` - Navegação e menu
- `hero.html` - Seção principal
- `services.html` - Cards de serviços
- etc.

### 3. Estilos
Edite os arquivos CSS em `src/styles/`:
- `main.css` - Estilos base e variáveis
- `components.css` - Estilos específicos
- `animations.css` - Animações

## 🛠️ Comandos Disponíveis

```bash
# Build do site
npm run build

# Build com watch mode (reconstrói automaticamente)
npm run dev

# Servir o site localmente
npm run serve

# Build otimizado (CSS/JS inline)
npm run optimize

# Limpar pasta dist
npm run clean
```

## 📝 Sistema de Placeholders

O sistema de build suporta placeholders que são substituídos automaticamente:

### Dados (JSON)
```html
{{site-config.site.name}}           <!-- Nome do site -->
{{site-config.contact.phone}}       <!-- Telefone -->
{{services.services.0.title}}       <!-- Primeiro serviço -->
```

### Componentes
```html
{{component:header}}   <!-- Inclui header.html -->
{{component:hero}}     <!-- Inclui hero.html -->
```

## 🎨 Personalização

### Cores e Variáveis CSS
Edite as variáveis CSS em `src/styles/main.css`:

```css
:root {
    --primary-blue: #0f4c81;
    --secondary-blue: #1a73e8;
    --accent-green: #10b981;
}
```

### Fontes
As fontes são carregadas via Google Fonts no template. Para alterar:

1. Edite o link no `src/templates/page.html`
2. Atualize as propriedades `font-family` no CSS

## 🚀 Deploy

### Build para Produção
```bash
npm run optimize
```

### Hospedagem
O conteúdo da pasta `dist/` pode ser hospedado em qualquer servidor web estático:
- Netlify
- Vercel
- GitHub Pages
- Servidor Apache/Nginx

## 📧 Integração com Formulários

Os formulários atualmente são simulados. Para integração real:

1. **Edite `src/scripts/forms.js`**:
   - Descomente o método `sendToEmailService()`
   - Configure o endpoint da sua API

2. **Opções de serviços**:
   - Formspree
   - Netlify Forms
   - EmailJS
   - API própria

## 🔧 Desenvolvimento

### Adicionar Novo Componente
1. Crie `src/components/novo-componente.html`
2. Adicione `{{component:novo-componente}}` no template
3. Execute `npm run build`

### Adicionar Novos Dados
1. Crie arquivo JSON em `src/data/`
2. Use placeholders como `{{arquivo.propriedade}}`
3. Execute `npm run build`

## 🆘 Troubleshooting

### Erro no Build
- Verifique se todos os arquivos JSON são válidos
- Confirme que os componentes referenciados existem

### Placeholders Não Substituídos
- Verifique a sintaxe: `{{arquivo.propriedade}}`
- Confirme que o arquivo JSON existe em `src/data/`

### Watch Mode Não Funciona
- Instale as dependências: `npm install`
- O chokidar é necessário para watch mode

## 📞 Suporte

Para dúvidas ou sugestões sobre esta estrutura modular, consulte a documentação técnica ou entre em contato com o desenvolvedor.