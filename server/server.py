from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_session import Session

app = Flask(__name__, static_folder='static') # Initialize flask app
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "https://example.com"}})
app.config['SECRET_KEY'] = 'secret!'
SQLALCHEMY_DATABASE_URL = "postgresql://auth_db_g8sr_user:n9Njd0NULMqbRSN32s1oR22G7rm0Ux3h@dpg-cs01ufpu0jms73e0a4c0-a.oregon-postgres.render.com/auth_db_g8sr"#"sqlite:///users.db"
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URL
app.config['SESSION_TYPE'] = 'filesystem' # Store sessions in server's filesystem
app.config['SESSION_PERMANENT'] = False

db = SQLAlchemy()

class users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

db.init_app(app)
Session(app)

with app.app_context():
    db.create_all()
    

@app.route('/newUser', methods=['POST', 'GET'])
def add_user():
    data = request.get_json()
    # If user already exists
    if (users.query.filter_by(name=data['userName']).first()):
        return jsonify({"message": "ERROR: Username Taken"}), 401
    else:
        new_user = users(name=data['userName'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User added successfully!'}), 201
    
    
@app.route('/loginUser', methods=['POST', 'GET'])
def login():
    data = request.get_json()
    user = users.query.filter_by(name=data['userName']).first()
    
    if user:
        session['userName'] = user.name
        return jsonify({"message": "Logged in successfully"}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/Logout', methods=['POST'])
def logout():
    session.pop('userName', None)
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200

if __name__ == '__main__':
    app.run(host="https://darrius-w-auth-app.netlify.app/")#host='localhost', port=5000, debug=True)