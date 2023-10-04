echo Comando 1: Navegar para a pasta "backend"
cd .\backend

echo Comando 2: Criar o ambiente virtual
py -m venv venv

echo Comando 3: Ativar o ambiente virtual
. .\venv\Scripts\Activate.ps1

echo Comando 4: Atualizar o pip
pip install --upgrade pip

echo Comando 4: Atualizar o pip
pip install --upgrade pip

echo Comando 5: Instalar as dependências a partir do requirements.txt
pip install -r .\requirements.txt


echo Comando 6: Sair do ambiente virtual
deactivate

echo Comando 7: Navegar para a pasta "frontend"
cd ..\frontend

echo Comando 8: Executar npm install
npm install --force
