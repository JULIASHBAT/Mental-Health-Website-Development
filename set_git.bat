:: this bat file is used to set git repository
:: to run use .\set_git.bat
@echo off
:: add :: before the next row to initialize the repository
::exit /b

git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://marysoul99.github.io/A14/
git push -u origin main

