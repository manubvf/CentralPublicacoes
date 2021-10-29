from app import create_app, db
from models import Articles, article_schema, articles_schema
from flask import current_app, jsonify, request
# Create an application instance
app = create_app()

# Define a route to fetch the available articles 

@app.route("/", methods=["GET"], strict_slashes=False)
def articles():

    #articles = Articles.query.all() 
    #results = articles_schema.dump(articles)

    #return jsonify(results)
    return {"batata":'oi'}

@app.route("/login", methods=["POST"], strict_slashes=False)
def add_articles():
    email = request.json['email']
    password = request.json['password']

    article = { 'email': email, 'password': password }
    correct = { 'email': 'rebecapstroh@gmail.com', 'password': '12345' }

    if article == correct:
        return {'token': 'LKJHGFDSA'}

    return {'error': 'user not found'}

if __name__ == "__main__":
    app.run(debug=True)
