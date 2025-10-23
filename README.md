## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 18.x ou superior)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Git** (para clonar o repositório)

## 🚀 Instalação

Siga os passos abaixo para configurar o projeto localmente:

### 1. Clone o repositório

```bash
git clone https://github.com/pablodelgado26/estrutura-React.git
```

### 2. Navegue até o diretório do projeto

```bash
cd estrutura-React
```

### 3. Instale as dependências

Usando npm:
```bash
npm install
```

Ou usando yarn:
```bash
yarn install
```

### 4. Execute o projeto em modo de desenvolvimento

Usando npm:
```bash
npm run dev
```

Ou usando yarn:
```bash
yarn dev
```

### 5. Acesse a aplicação

Abra seu navegador e acesse:
```
http://localhost:3000
```

## ⚠️ LEMBRETE IMPORTANTE

**Antes de começar a desenvolver, lembre-se de atualizar:**

- 📝 **`package.json`** - Altere o nome do projeto, versão, descrição e outras informações específicas do seu projeto
- 🎨 **`src/app/layout.jsx`** - Atualize os metadados (title, description, etc.) conforme seu projeto

## 📁 Estrutura do Projeto

```
template-react/
├── public/                  
│   ├── fonts/              
│   ├── icons/              
│   ├── images/             
│   ├── media/              
│   └── sounds/             
├── src/                    
│   ├── app/                
│   │   ├── globals.css     
│   │   ├── layout.jsx      
│   │   └── page.jsx        
│   └── components/         
├── eslint.config.mjs       
├── jsconfig.json           
├── next.config.mjs         
├── package.json            
└── README.md               
```

## 🛠️ Tecnologias Utilizadas

- **[Next.js 16.0.0](https://nextjs.org/)** - Framework React para produção
- **[React 19.2.0](https://react.dev/)** - Biblioteca JavaScript para interfaces
- **[Ant Design 5.27.6](https://ant.design/)** - Biblioteca de componentes UI
- **[Axios 1.12.2](https://axios-http.com/)** - Cliente HTTP para requisições
- **[React Toastify 11.0.5](https://fkhadra.github.io/react-toastify/)** - Notificações toast
- **[ESLint](https://eslint.org/)** - Linter para qualidade de código

## 📜 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção otimizada
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter para verificar o código

## 🔧 Configuração

### Next.js Config

O projeto utiliza o React Compiler ativado no arquivo `next.config.mjs`:

```javascript
const nextConfig = {
  reactCompiler: true,
};
```

### Compatibilidade

O projeto utiliza o patch `@ant-design/v5-patch-for-react-19` para garantir compatibilidade total entre Ant Design v5 e React 19.

## 📝 Próximos Passos

Após a instalação, você pode:

1. Começar a desenvolver novos componentes em `src/components/`
2. Criar novas páginas em `src/app/`
3. Adicionar estilos globais em `src/app/globals.css`
4. Configurar rotas e layouts conforme necessário

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 👨‍💻 Autor

**Pablo Delgado** - [@pablodelgado26](https://github.com/pablodelgado26)

---

Desenvolvido com Pablo Delgado usando Next.js e React
