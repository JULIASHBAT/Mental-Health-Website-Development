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
git remote add origin https://github.com/marysoul99/A14.git

:: Push the changes to the new repository
git push -u origin main
