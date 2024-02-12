@REM :: this bat file is used to set git repository
@REM :: to run use .\set_git.bat
@REM @echo off
@REM :: add :: before the next row to initialize the repository
@REM ::exit /b

@REM git init
@REM git add .
@REM git commit -m "first commit"
@REM git branch -M main
@REM git remote add origin https://github.com/Mohameed7993/A14.git
@REM git push -u origin main

@echo off
:: This batch file updates the Git repository remote URL and pushes the changes
:: To run, use .\set_git.bat

:: Ensure git is initialized; if not, uncomment the next two lines
:: git init
:: git add .

:: Commit any changes - modify the commit message as needed
git commit -m "Update repository"

:: Rename the default branch to main if it's not already set
git branch -M main

:: Remove the old remote URL (if exists)
git remote remove origin

:: Add the new remote repository URL
git remote add origin https://marysoul99.github.io/A14/

:: Push the changes to the new repository
git push -u origin main
