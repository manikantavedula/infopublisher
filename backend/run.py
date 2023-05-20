from flask import Flask
from flask_cors import CORS
import os
import sys
from api.series.routes import series_routes
from api.school.routes import school_routes
from api.standard.routes import standard_routes
from api.subject.routes import subject_routes
from api.lesson.routes import lesson_routes
from api.typeOfVideos.routes import typeOfVideos_routes
import logging

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

app.register_blueprint(series_routes)
app.register_blueprint(school_routes)
app.register_blueprint(standard_routes)
app.register_blueprint(subject_routes)
app.register_blueprint(lesson_routes)
app.register_blueprint(typeOfVideos_routes)

if __name__ == '__main__':
    app.run()
