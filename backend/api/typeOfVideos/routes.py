from flask import jsonify, make_response, Blueprint, request
from .fetch import get_data
import logging
from flask_cors import cross_origin

# Create a logger instance
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# Create a file handler and set the log level
handler = logging.FileHandler('logs/routes.log')
handler.setLevel(logging.DEBUG)

# Create a formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# Add the formatter to the handler
handler.setFormatter(formatter)

# Add the handler to the logger
logger.addHandler(handler)

typeOfVideos_routes = Blueprint('typeOfVideos', __name__, url_prefix='/typeOfVideos')

@typeOfVideos_routes.route('/data')
def get_data_endpoint():
    data = get_data()
    response = make_response(jsonify(data))
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET'
    response.headers['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type',
    response.headers["Access-Control-Allow-Credentials"] = "true"
    
    return response
