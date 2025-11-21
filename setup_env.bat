@echo off
echo Setting up environment variables...
echo.
echo Please enter the full path to your Node.js installation directory (e.g., C:\Program Files\nodejs):
set /p NODE_PATH=

if exist "%NODE_PATH%\node.exe" (
    set "PATH=%PATH%;%NODE_PATH%"
    echo.
    echo Node.js path added temporarily.
    echo Current Node version:
    node -v
    echo Current NPM version:
    npm -v
    echo.
    echo You can now run 'npm install' and 'npm run dev' in this window.
    cmd /k
) else (
    echo.
    echo Error: node.exe not found in "%NODE_PATH%"
    pause
)
