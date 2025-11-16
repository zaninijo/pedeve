# 📱 Pentdraive (Front-end)

![Banner](mockups/banner.png)

> Transformando o celular em um ponto de venda autônomo completo.

O Pentdraive é um <strong>aplicativo mobile que transforma qualquer smartphone* em um ponto de venda de autoatendimento, moderno e singular</strong>, oferecendo uma alternativa simples e acessível para pequenos empreendedores, estabelecimentos e projetos que desejam explorar soluções móveis de vendas sem depender de infraestrutura cara ou complexa.
<small>*Desde que tenha uma câmera frontal com nitidez razoável e NFC embutido.</small>

Esse aplicativo é um **Proof of Concept**. Na prática, ele não pode ser utilizado como ponto de venda real, pois não realiza a emissão de notas fiscais nem está integrado a sistemas fiscais oficiais. **Seu objetivo é apenas demonstrar a viabilidade do conceito.**

---

## 🚀 Visão Geral do Projeto

O aplicativo permitirá que o usuário:
- 🧾 Registre e adicione ao carrinho produtos lendo o **códigos de barras** da embalagem pela câmera;  
- 💳 Realize **pagamentos por aproximação (NFC) e PIX**;
- 📊 Acompanhe vendas e estoque diretamente pelo celular;  
- ⚙️ Utilize o sistema de forma **autônoma**, sem depender de equipamentos adicionais.

---

## 🧠 Tecnologias utilizadas

> Principais ferramentas e bibliotecas que compõem o front-end.

- **React Native**  
- **Expo**  
- **TypeScript**  
- **Figma** (prototipagem e design da interface)  
- **Docker** + **Node** + **Android SDK** (ambiente de desenvolvimento)

---

## 🧩 Estrutura do Front-end

O front-end será responsável por:
- Exibir a **interface principal do ponto de venda** (carrinho, checkout, etc.);  
- Gerenciar a **navegação entre telas** e o **estado global** da aplicação;  
- Integrar-se futuramente a uma **API externa**, responsável pela autenticação, persistência de dados e processamento de pagamentos;  
- Utilizar **APIs nativas** do dispositivo via Expo (NFC e câmera).

---

## 📲 Design

> Conceitos iniciais feitos no Figma.

![Tela inicial](mockups/Tela%20inicial.png)
![Adicionar produtos através da câmera](mockups/Camera%20Add.png)
![Carrinho de Produtos](mockups/Carrinho.png)
![Selecionar Método de Pagamento](mockups/Metodo%20Pagamento.png)
![Aguardando Pagamento por Aproximação](mockups/Aguardando%20Pagamento%20Aprox..png)

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
- [ ] Criar documentação para desenvolvimento/uso do aplicativo

---

## 🖥️ Instruções de Desenvolvimento

O ambiente de desenvolvimento roda em uma container Docker com o Android SDK, o que deixa o processo altamente portátil, pensado para o desenvolvimento em nuvem com o GitHub Codespaces.

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
npm run serve:build
```
