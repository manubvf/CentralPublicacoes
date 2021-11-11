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

def deleteUser():
    email = request.json['email']
    password = request.json['password']

    return central.Central.deleteUser(email, password)



# Define a route to fetch the available articles


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


if __name__ == "__main__":
    app.run(debug=True)
