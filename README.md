# 📱 Pentdrive (Front-end)

> Transformando o celular em um ponto de venda autônomo completo.

O **Pentdrive** é um aplicativo mobile que **transforma qualquer smartphone em um ponto de venda moderno e autônomo**, oferecendo uma alternativa acessível para quem quer utilizar tecnologia de vendas sem grandes investimentos.

---

## 🚀 Visão Geral do Projeto

O aplicativo permitirá que o usuário:
- 🧾 Registre e gerencie produtos com leitura de **códigos de barras** pela câmera;  
- 💳 Realize **pagamentos por aproximação (NFC)**;  
- 📊 Acompanhe vendas e estoque diretamente pelo celular;  
- ⚙️ Utilize o sistema de forma **autônoma**, sem depender de equipamentos adicionais.

---

## 🧠 Tecnologias utilizadas

> Ferramentas e bibliotecas que compõem o front-end.

- **React Native**  
- **Expo**  
- **TypeScript**  
- **Figma** (prototipagem e design da interface)  
- **Docker** + **Android SDK** (ambiente de desenvolvimento e emulação)

---

## 🧩 Estrutura do Front-end

O front-end será responsável por:
- Exibir a **interface principal do ponto de venda** (catálogo, carrinho, checkout e relatórios);  
- Gerenciar a **navegação entre telas** e o **estado global** da aplicação;  
- Integrar-se futuramente a uma **API externa**, responsável pela autenticação, persistência de dados e processamento de pagamentos;  
- Utilizar **APIs nativas** do dispositivo via Expo (NFC e câmera).

---

## ⚙️ Status do Projeto

🚧 **Em desenvolvimento** — atualmente na fase de estruturação dos componentes e layout base.  

Etapas previstas:
- [x] Configuração inicial do projeto com Expo  
- [x] Configuração do ambiente com Docker e Android SDK  
- [ ] Estruturação da navegação e telas principais  
- [ ] Implementação da UI responsiva  
- [ ] Integração com câmera (leitura de código de barras)  
- [ ] Integração com NFC para pagamentos  
- [ ] Conexão com API externa (em desenvolvimento por outro colaborador)

---

## 🖥️ Instruções de Desenvolvimento

> Antes de iniciar, leia e configure os arquivos de ambiente:
- `.devcontainer/devcontainer.json`  
- `app.config.json`  

Para **servir o aplicativo** com atualizações de JavaScript OTA (Over-The-Air):
```bash
npm run serve
```
Ou para desenvolver na web, padrão Expo:
```bash
npx expo start
```
Para **gerar uma build nova**:
```bash
npm run serve --build
```
