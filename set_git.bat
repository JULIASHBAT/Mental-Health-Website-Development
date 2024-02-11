:: this bat file is used to set git repository
:: to run use .\set_git.bat
@echo off
:: add :: before the next row to initialize the repository
::exit /b

git init
git add .
git commit -m "first commit"
git branch -M main
git remote remove origin https://github.com/Mohameed7993/templet-web-week3.git/
::git push -u origin main