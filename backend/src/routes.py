from re import search

import requests
from app import create_app, db
from models import Articles, article_schema, articles_schema
from flask import current_app, jsonify, request
from central import Central
# Create an application instance
app = create_app()


def signUp():
    fullname = request.json['fullname']
    email = request.json['email']
    password = request.json['password']
    passwordConfirmation = request.json['passwordConfirmation']

    # newUser = {'fullname': fullname, 'email': email, 'password': password, 'passwordConfirmation': passwordConfirmation}
    # return {'token': 'LKJHGFDSA'}

    return Central.signup(fullname, password, email)


def login():
    email = request.json['email']
    password = request.json['password']

    return Central.login(email, password)

def deleteUser():
    email = request.json['email']
    password = request.json['password']
    token = request.json['token']
    central.Central.logout(token)
    return central.Central.deleteUser(email, password)



# Define a route to fetch the available articles


def search_project():
    params = request.json['parameters']

    return Central.search_project(params)


def view_project():
    proj_id = request.json['id']
    token = request.json['token']
    if token is None:
        return {'error': 'authentication token not found'}
    return Central.view_project(proj_id, token)


def register_project():
    title = request.json['title']
    category = request.json['category']
    description = request.json['description']
    authors = request.json['authors']
    tags = request.json['tags']
    startDate = request.json['startDate']
    endDate = request.json['endDate']
    attachments = request.json['attachments']

    return Central.register_project(title, category, description, authors, tags, startDate, endDate, attachments)


def show_interest():
    token = request.json['token']
    idPesquisa = request.json['idPesquisa']

    return Central.show_interest(token, idPesquisa)


def update_research():
    token = request.json['token']
    idPesquisa = request.json['idPesquisa']
    titulo = request.json['titulo']
    descricao = request.json['descricao']
    idCategoria = request.json['idCategoria']
    ano_inicio = request.json['ano_inicio']
    idTag_1 = request.json['idTag_1']
    idTag_2 = request.json['idTag_2']
    idTag_3 = request.json['idTag_3']
    git = request.json['git']
    autores = request.json['autores']
    
    return Central.update_research(token, idPesquisa, titulo, descricao, idCategoria, ano_inicio, idTag_1, idTag_2, idTag_3, git, autores)

def delete_research():
    titulo = request.json['titulo']
    descricao = request.json['descricao']
    token = request.json['token']

    return Central.delete_research(titulo, descricao, token)


@app.route("/", methods=["GET"], strict_slashes=False)
def articles():

    # articles = Articles.query.all()
    # results = articles_schema.dump(articles)

    # return jsonify(results)
    return {'fullname': 'Rebeca Stroh', 'email': 'rebecapstroh@gmail.com', 'password': '12345'}


@app.route("/backend/login", methods=["POST"], strict_slashes=False)
def add_articles():
    return login()


@app.route("/backend/signup", methods=["POST"], strict_slashes=False)
def backend_signUp():
    return signUp()

@app.route("/backend/deleteuser", methods=["POST"], strict_slashes=False)
def backend_deleteUser():
    return deleteUser()


@app.route("/backend/search", methods=["POST"], strict_slashes=False)
def backend_search():
    return search_project()


@app.route("/backend/view", methods=["POST"], strict_slashes=False)
def backend_view():
    return view_project()


@app.route("/backend/register", methods=["POST"], strict_slashes=False)
def backend_register():
    return register_project()


@app.route("/backend/interest", methods=["POST"], strict_slashes=False)
def backend_interest():
    return show_interest()

@app.route("/backend/updateresearch", methods=["POST"], strict_slashes=False)
def backend_update_research():
    return update_research()

@app.route("/backend/deleteresearch", methods=["POST"], strict_slashes=False)
def backend_delete_research():
    return delete_research()


if __name__ == "__main__":
    app.run(debug=True)
