from re import search

import requests
from app import create_app, db
from models import Articles, article_schema, articles_schema
from flask import current_app, jsonify, request
from central import Central
# Create an application instance
app = create_app()


def signUp():
    '''Sign Up
    Expects: JSON {fullname, email, password}
    Returns: JSON {fullname, token, id (user id)} or {error}
    '''
    fullname = request.json['fullname']
    email = request.json['email']
    password = request.json['password']

    return Central.signup(fullname, password, email)


def login():
    '''Login
    Expects: JSON {email, password}
    Returns: JSON {fullname, token, id, email} or {error}
    '''
    email = request.json['email']
    password = request.json['password']

    return Central.login(email, password)


def deleteUser():
    '''Delete User
    Expects: JSON {email, password, token}
    Returns: JSON {success} or {error}
    '''
    email = request.json['email']
    password = request.json['password']
    token = request.json['token']
    Central.logout(token)
    return Central.deleteUser(email, password)


def getUser():
    '''Returns all info about an user
    Expects: JSON {token}
    Returns: JSON {fullname, email_pessoal, email_institucional,
                    telefone, curso, lattes, research_gate, git} or
                  {error}
    '''
    token = request.json['token']
    return Central.readuser(token)


def edituser():
    '''Edits an existing user
    Expects: JSON {token, fullname, email_pessoal, telefone, curso, lattes,
                    research_gate, img_path}
    Returns: JSON {success} or {error}
    '''
    token = request.json['token']
    name = request.json['fullname']
    email = request.json['email_pessoal']
    tel = request.json['telefone']
    curso = request.json['curso']
    lattes = request.json['lattes']
    research_gate = request.json['research_gate']
    img_path = request.json['img_path']

    return Central.edituser(token, name, email, tel, curso, lattes, research_gate, img_path)


# Define a route to fetch the available articles

def updatePublication():
    '''Update a publication
    Expects: JSON {idPublicacao, titulo, descricao, idCategoria, ano_inicio, idTag_1, idTag_2, idTag_3, git, 
                    autores []}
        * autores: list of strings (authors' names)
    Returns: JSON {success}
    '''

    idPublicacao = request.json['idPublicacao']
    titulo = request.json['titulo']
    descricao = request.json['descricao']
    idCategoria = request.json['idCategoria']
    ano_inicio = request.json['ano_inicio']
    ano_termino = request.json['ano_termino']
    idTag_1 = request.json['idTag_1']
    idTag_2 = request.json['idTag_2']
    idTag_3 = request.json['idTag_3']
    git = request.json['git']
    autores = request.json['autores']

    return Central.updatePublication(idPublicacao, titulo, descricao, idCategoria, ano_inicio, ano_termino, idTag_1, idTag_2, idTag_3, git, autores)


def search_project():
    '''Search for projects in the system
    Expects: JSON {parameters [{category, value}, ...]}
        * category: 'autor', 'titulo', 'categoria' ou 'tag'
        * value: string to be searched
    Returns: JSON {searchResult [id (search id), title, category,
                    authors [fullname, email, lattes], tags [], interested, isInterested]}
        * tags: list of up to 3 strings that represent the tags
        * interested: number of people interested on that project
        * isInterested: True if user is interested on project, False otherwise
    '''
    params = request.json['parameters']

    return Central.search_project(params)


def view_project():
    '''View a specific project after a search
    Expects: JSON {id (search id), token}
    Returns: JSON {id, title, category, authors [fullname, email, lattes], tags [],
                    startDate, endDate, interested, description,
                    attachments [{type, name, file}, ...], lastUpdate, finished, isInterested, isAuthor}
    '''
    proj_id = request.json['id']
    token = request.json['token']
    #if token is None:
        #return {'error': 'authentication token not found'}
    return Central.view_project(proj_id, token)


def register_project():
    '''Register a new project
    Expects: JSON {title, category, description, authors [], tags [], startDate,
                    endDate, attachments}
        * authors: list of strings (authors' names)
    Returns: JSON {success}
    '''
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
    ''' Show interest in  project
    Expects: JSON {token, idPesquisa}
    Returns: JSON {success} or {error}
    '''
    token = request.json['token']
    idPesquisa = request.json['idPesquisa']

    return Central.show_interest(token, idPesquisa)


def update_research():
    '''Update a researh
    Expects: JSON {token, idPesquisa, titulo, descricao, idCategoria, ano_inicio, idTag_1, idTag_2, idTag_3, git, 
                    autores []}
        * autores: list of strings (authors' names)
    Returns: JSON {success}
    '''
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
    '''Delete a research
    Expects: JSON {titulo, descricao, token}
    Returns: JSON {success}
    '''
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


@app.route("/backend/updatePublication", methods=["POST"], strict_slashes=False)
def backend_updatePublication():
    return updatePublication()


@app.route("/backend/deleteuser", methods=["POST"], strict_slashes=False)
def backend_deleteUser():
    return deleteUser()


@app.route("/backend/getuser", methods=["POST"], strict_slashes=False)
def backend_getUser():
    return getUser()


@app.route("/backend/edituser", methods=["POST"], strict_slashes=False)
def backend_edituser():
    return edituser()


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
