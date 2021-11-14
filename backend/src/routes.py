from re import search
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

    # user = {'email': email, 'password': password}
    # correct = {'email': 'rebecapstroh@gmail.com', 'password': '12345'}

    # if user == correct:
    # return {'token': 'LKJHGFDSA'}

    # return {'error': 'user not found'}

# Define a route to fetch the available articles


def search_project():
    params = request.json['parameters']

    return Central.search_project(params)


def view_project():
    proj_id = request.json['id']
    return Central.view_project(proj_id)


def register():
    pass


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


@app.route("/backend/search", methods=["POST"], strict_slashes=False)
def backend_search():
    return search_project()


@app.route("/backend/view", methods=["POST"], strict_slashes=False)
def backend_view():
    return view_project()


@app.route("/backend/register", methods=["POST"], strict_slashes=False)
def backend_register():
    return register()


if __name__ == "__main__":
    app.run(debug=True)
