from app import create_app, db
from models import Articles, article_schema, articles_schema
from flask import current_app, jsonify, request
import central
# Create an application instance
app = create_app()


def signUp():
    fullname = request.json['fullname']
    email = request.json['email']
    password = request.json['password']
    passwordConfirmation = request.json['passwordConfirmation']

    # newUser = {'fullname': fullname, 'email': email, 'password': password, 'passwordConfirmation': passwordConfirmation}
    # return {'token': 'LKJHGFDSA'}

    return central.Central.signup(fullname, password, email)


def login():
    email = request.json['email']
    password = request.json['password']

    return central.Central.login(email, password)

    # user = {'email': email, 'password': password}
    # correct = {'email': 'rebecapstroh@gmail.com', 'password': '12345'}

    # if user == correct:
    # return {'token': 'LKJHGFDSA'}

    # return {'error': 'user not found'}

# Define a route to fetch the available articles

def updatePublication():
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

    return central.Central.updatePublication(idPublicacao, titulo, descricao, idCategoria, ano_inicio, ano_termino, idTag_1, idTag_2, idTag_3, git, autores)


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


if __name__ == "__main__":
    app.run(debug=True)
