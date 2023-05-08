# Graus de Separação

Um webapp que eu fiz para a matéria de Teoria dos Grafos.

O projeto é inspirado nos desafios de graus de separação entre famosos
que são realizados através de *threads* no Twitter.

Este projeto é separado em duas partes:
- O Vault do [Obsidian](https://obsidian.md/) e o
- Webapp propriamente dito feito em Svelte

Para não precisar ter uma fase de indexação foi usado um [plugin que descarrega o indice do Obsidian em formato JSON](https://github.com/lucasew/obsidian-metadump).

## Como contribuir?
### Webapp
Para preparar o ambiente você vai precisar do NodeJS e, obviamente, do Git.

De preferência não use versões muito antigas. No Nix você pode carregar o NodeJS para um shell temporariamente usando o comando `nix-shell -p nodejs`.

Para iniciar a aplicação primeiro é necessário baixar as dependências pelo npm:

```sh
npm install
```

E para iniciar a aplicação execute o seguinte comando:

```sh
npm run dev
```

### "Banco de dados"
Para editar o banco de dados você vai precisar instalar o Obsidian.

O Vault do Obsidian está na pasta `static/obsidian`.

Ao criar elementos você deve seguir o padrão que já tá lá ou coisas podem não funcionar.

- Para criar um **vértice**, ou seja, uma personalidade, crie uma nota e mova ela na pasta Vértice. O nome da nota é o nome da pessoa. Todos os vértices devem ser marcados com a tag `#vertice`. O Obsidian vai tentar autocompletar.
- Para criar uma **aresta**, ou seja, uma conexão entre duas personalidades, crie uma nota e mova para a pasta Arestas. O nome da nota é o nome da conexão. Na aresta use a linkagem de notas para linkar os vértices envolvidos, o Obsidian vai tentar autocompletar a relação. 
- Cada vértice ou aresta deve ter uma imagem associada que vai ser usada como ícone na aplicação. A imagem não precisa de nenhum tratamento específico, pode ser apenas colada na nota. O Obsidian vai gerar o arquivo da imagem na raíz do Vault. Mova para a pasta `assets` ou o webapp não vai conseguir achar.
- Ao final das suas edições, chame a paleta de comandos (Ctrl+p) e procure por `Metadumper: Dump metadata file`.
- Não é necessário otimizar as imagens. Tem um bot que faz isso.