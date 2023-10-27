from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
from api.series.routes import series_routes
from api.school.routes import school_routes
from api.student.routes import student_routes
from api.standard.routes import standard_routes
from api.subject.routes import subject_routes
from api.lesson.routes import lesson_routes
from api.onlineClasses.routes import onlineClasses_routes
from api.animatedClasses.routes import animatedClasses_routes
from api.typeOfVideos.routes import typeOfVideos_routes
from api.common.routes import common_routes
import logging
from datetime import datetime, timedelta, timezone
# from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from google.auth.transport import requests
from google.oauth2 import id_token
from connection import connect_to_db
# import ssl

# Create a file handler for the root logger
handler = logging.FileHandler('logs/app.log')
handler.setLevel(logging.DEBUG)

# Create a formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# Add the formatter to the handler
handler.setFormatter(formatter)

# Add the handler to the root logger
logging.getLogger().addHandler(handler)

sys.path.append(os.path.join(os.path.dirname(__file__), 'api'))

app = Flask(__name__)
CORS(app, resources={r"/*": {'origins': '*'}}, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config["JWT_SECRET_KEY"] = "2edc71d35a7c977e2f9a4eaa7d88c5b1ae7adf8454d0f43ffd83a7c977e2f9a4370dce9affe7a261d0f23eb067a588b313e5a8ef162c40460f418fe8cd7bedb16b2dc61efc6"
app.config["GOOGLE_CLIENT_ID"] = "948640071935-o7fftdda4hnsnm8odnjjibsko94s9ou7.apps.googleusercontent.com"
# jwt = JWTManager(app)

app.register_blueprint(series_routes)
app.register_blueprint(school_routes)
app.register_blueprint(student_routes)
app.register_blueprint(standard_routes)
app.register_blueprint(subject_routes)
app.register_blueprint(lesson_routes)
app.register_blueprint(onlineClasses_routes)
app.register_blueprint(animatedClasses_routes)
app.register_blueprint(typeOfVideos_routes)
app.register_blueprint(common_routes)

# ssl_context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
# ssl_context.load_cert_chain('/home/infopublisher/public_html/backend/dc16729501066a49.crt', '/home/infopublisher/public_html/backend/private-key.pem')

if __name__ == '__main__':
    # app.run(host="127.0.0.1", port=5000, ssl_context=ssl_context, debug=True)
    app.run()
