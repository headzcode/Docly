document.addEventListener('DOMContentLoaded', function() {
            const markdownInput = document.getElementById('markdown-input');
            const previewArea = document.getElementById('preview-area');
            
            // Configurar marked para renderizar o markdown
            marked.setOptions({
                breaks: true,
                gfm: true
            });

            // Função para atualizar a visualização
            function updatePreview() {
                previewArea.innerHTML = marked.parse(markdownInput.value);
            }

            // Atualizar a visualização quando o usuário digita
            markdownInput.addEventListener('input', updatePreview);

            // Função para inserir texto na posição do cursor
            function insertText(text) {
                const startPos = markdownInput.selectionStart;
                const endPos = markdownInput.selectionEnd;
                const selectedText = markdownInput.value.substring(startPos, endPos);
                
                if (selectedText) {
                    // Se houver texto selecionado, envolva-o com a formatação
                    const newText = text.replace('texto', selectedText);
                    markdownInput.value = markdownInput.value.substring(0, startPos) + newText + markdownInput.value.substring(endPos);
                } else {
                    // Se não houver texto selecionado, apenas insira o texto
                    markdownInput.value = markdownInput.value.substring(0, startPos) + text + markdownInput.value.substring(endPos);
                }
                
                updatePreview();
                markdownInput.focus();
            }

            // Configurar botões da barra de ferramentas
            document.getElementById('btn-h1').addEventListener('click', () => insertText('# Título\n\n'));
            document.getElementById('btn-h2').addEventListener('click', () => insertText('## Subtítulo\n\n'));
            document.getElementById('btn-h3').addEventListener('click', () => insertText('### Título Terciário\n\n'));
            document.getElementById('btn-bold').addEventListener('click', () => insertText('**texto**'));
            document.getElementById('btn-italic').addEventListener('click', () => insertText('*texto*'));
            document.getElementById('btn-link').addEventListener('click', () => insertText('[texto](https://exemplo.com)'));
            document.getElementById('btn-image').addEventListener('click', () => insertText('![alt text](https://url-da-imagem.jpg)'));
            document.getElementById('btn-code').addEventListener('click', () => insertText('`código`'));
            document.getElementById('btn-codeblock').addEventListener('click', () => insertText('```javascript\n// Seu código aqui\nconsole.log("Hello World!");\n```\n'));
            document.getElementById('btn-quote').addEventListener('click', () => insertText('> Citação\n\n'));
            document.getElementById('btn-list').addEventListener('click', () => insertText('- Item 1\n- Item 2\n- Item 3\n\n'));
            document.getElementById('btn-numlist').addEventListener('click', () => insertText('1. Primeiro item\n2. Segundo item\n3. Terceiro item\n\n'));
            document.getElementById('btn-table').addEventListener('click', () => insertText('| Cabeçalho 1 | Cabeçalho 2 | Cabeçalho 3 |\n| --- | --- | --- |\n| Linha 1 Col 1 | Linha 1 Col 2 | Linha 1 Col 3 |\n| Linha 2 Col 1 | Linha 2 Col 2 | Linha 2 Col 3 |\n\n'));
            document.getElementById('btn-hr').addEventListener('click', () => insertText('\n---\n\n'));
            document.getElementById('btn-badge').addEventListener('click', () => insertText('![Badge](https://img.shields.io/badge/texto-cor-blue)'));

            // Botão para limpar o editor
            document.getElementById('btn-clear').addEventListener('click', function() {
                if (confirm('Tem certeza que deseja limpar todo o conteúdo?')) {
                    markdownInput.value = '';
                    updatePreview();
                }
            });

            // Botão para copiar o markdown
            document.getElementById('btn-copy').addEventListener('click', function() {
                markdownInput.select();
                document.execCommand('copy');
                alert('Markdown copiado para a área de transferência!');
            });

            // Botão para carregar template
            document.getElementById('btn-template').addEventListener('click', function() {
                if (markdownInput.value && !confirm('Isso irá substituir o conteúdo atual. Deseja continuar?')) {
                    return;
                }
                
                const template = `# Nome do Projeto

![Badge](https://img.shields.io/badge/status-em%20desenvolvimento-brightgreen)
![Badge](https://img.shields.io/badge/licença-MIT-blue)

## 📋 Descrição
Uma breve descrição sobre o que esse projeto faz e para quem ele é destinado.

## 🚀 Funcionalidades

- ✅ Funcionalidade 1
- ✅ Funcionalidade 2
- ✅ Funcionalidade 3

## 📦 Tecnologias utilizadas

- [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

## 🛠️ Instalação

\`\`\`bash
# Clone este repositório
$ git clone https://github.com/usuario/projeto

# Acesse a pasta do projeto
$ cd projeto

# Instale as dependências
$ npm install

# Execute a aplicação
$ npm start
\`\`\`

## 💻 Uso

\`\`\`javascript
// Exemplos de como usar seu projeto
const projeto = require('seu-projeto');
projeto.iniciar();
\`\`\`

## 📊 Demonstração

![Demonstração do Projeto](https://url-da-imagem.jpg)

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.

## 📫 Contato

- Nome - [GitHub](https://github.com/seuusuario)
- Email - seu@email.com`;
                
                markdownInput.value = template;
                updatePreview();
            });

            // Inicializar com um template básico
            const startTemplate = `# Meu Incrível Projeto

## Descrição
Este é um projeto incrível que resolve um problema específico.

## Como usar

1. Clone o repositório
2. Execute \`npm install\`
3. Inicie com \`npm start\`

## Recursos

- Funcionalidade 1
- Funcionalidade 2
- Funcionalidade 3

## Contribuição

Contribuições são bem-vindas! Leia o arquivo CONTRIBUTING.md para mais detalhes.`;
            
            markdownInput.value = startTemplate;
            updatePreview();
        });