## degit 
create in empty folder. see more at [degit](https://github.com/Rich-Harris/degit) 
```
npx degit NaVis0mple/vite-react-vitest-prettier-eslint_standard
```
```
npm install
```
create a github repo and 
```git
git remote add origin git@github.com:YOUR_GITHUB_USER_NAME/YOUR_GITHUB_REPO_NAME.git
git branch -M main
git push -u origin main
```


### vscode settings.json
```json
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.format.enable": true,
  "eslint.trace.server": "messages",
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ],
  "[javascriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
```
