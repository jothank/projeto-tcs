<h1>Trabalho de Conclusão de Semestre (TCS)</h1>

<p>Este projeto é uma aplicação web desenvolvida usando Django no backend.</p>

<h2>Pré-requisitos</h2>

<p>Antes de começar, você precisa ter os seguintes softwares instalados no seu computador:</p>
<ul>
  <li><a href="https://git-scm.com">Git</a></li>
  <li><a href="https://www.python.org/downloads/">Python 3.11+</a></li>
</ul>

<h2>Tecnologias</h2>

<p>Este projeto foi desenvolvido com as seguintes tecnologias:</p>

<ul>
  <li><a href="https://www.python.org/">Python</a></li>
  <li><a href="https://www.djangoproject.com/">Django</a></li>
</ul>

<h2>Clonando o Projeto</h2>

<p>Para baixar o projeto, clone este repositório no seu terminal com o seguinte comando:</p>

<pre>
git clone https://github.com/jothank/projeto-tcs.git
</pre>

<h2>Certifique-se de estar na pasta do projeto</h2>

<h2>Rodando o Backend (Django)</h2>

<p>Crie um ambiente virtual e ative-o:</p>

<pre>
python -m venv venv
Win: venv\Scripts\activate
Linux/MacOs: source venv/bin/activate
</pre>

<p>Atualize o PIP:</p>

<pre>
pip install --upgrade pip
python.exe -m pip install --upgrade pip
</pre>

<p>Instale as dependências:</p>

<pre>
pip install -r requirements.txt
</pre>

<p>Faça as migrações do banco de dados:</p>

<pre>
python manage.py makemigrations
python manage.py migrate
</pre>

<p>Crie o super usuário :</p>

<pre>
python manage.py createsuperuser
</pre>

<p>Inicie o servidor:</p>

<pre>
python manage.py runserver
</pre>

<p>O servidor estará rodando em <code>http://localhost:8000</code>.</p>
