from app import create_app
from models import Articles, articles_schema
from flask import jsonify
# Create an application instance
app = create_app()

# Define a route to fetch the available articles 

@app.route("/articles", methods=["GET"], strict_slashes=False)
def articles():

    #articles = Articles.query.all() 
    #results = articles_schema.dump(articles)

    #return jsonify(results)
    return {"batata":"batata"}


if __name__ == "__main__":
    app.run(debug=True)
