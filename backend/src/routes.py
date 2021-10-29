from app import create_app, db
from models import Articles, article_schema, articles_schema
from flask import current_app, jsonify, request
# Create an application instance
app = create_app()

def signUp():
    fullname = request.json['fullname']
    email = request.json['email']
    password = request.json['password']
    passwordConfirmation = request.json['passwordConfirmation']

    newUser = { 'fullname': fullname, 'email': email, 'password': password, 'passwordConfirmation': passwordConfirmation }

    return {'token': 'LKJHGFDSA'}

def login():
    email = request.json['email']
    password = request.json['password']

    user = { 'email': email, 'password': password }
    correct = { 'email': 'rebecapstroh@gmail.com', 'password': '12345' }

    if user == correct:
        return {'token': 'LKJHGFDSA'}

    return {'error': 'user not found'}

# Define a route to fetch the available articles 

@app.route("/", methods=["GET"], strict_slashes=False)
def articles():

    #articles = Articles.query.all() 
    #results = articles_schema.dump(articles)

    #return jsonify(results)
    return { 'fullname': 'Rebeca Stroh', 'email': 'rebecapstroh@gmail.com', 'password': '12345' }

@app.route("/backend", methods=["POST"], strict_slashes=False)
def add_articles():
    function = request.json['function']

    if (function == 'signup'):
        return signUp()
    elif (function == 'login'):
        return login()

    return {'error': 'no function found'}

if __name__ == "__main__":
    app.run(debug=True)
