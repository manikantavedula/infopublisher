from flask import jsonify, make_response, Blueprint, request
from .fetch import get_data
from .post import post_data
from .update import update_data
from .delete import delete_data
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

series_routes = Blueprint('series', __name__, url_prefix='/series')

@series_routes.route('/data')
def get_data_endpoint():
    data = get_data()
    response = make_response(jsonify(data))
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET'
    response.headers['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type',
    response.headers["Access-Control-Allow-Credentials"] = "true"
    
    return response

@series_routes.route('/submit-form', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def submit_form():
    logger.debug(f'request: {request} {request.json}')
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': 'https://app.infopublisher.in',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type',
            "Access-Control-Allow-Credentials": "true",
        }
        return ('', 204, headers)
    
    elif request.method == 'POST':
        series = request.json['series']
        # status = request.json['status']

        logger.debug(f'A message to log. {request.json} {series}')

        post_data(series)

        return 'Data stored successfully!'
    

@series_routes.route('/submit-edit-form', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def submit_edit_form():
    logger.debug(f'request: {request} {request.json}')
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': 'https://app.infopublisher.in',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type',
            "Access-Control-Allow-Credentials": "true",
        }
        return ('', 204, headers)
    
    elif request.method == 'POST':
        series = request.json['series']
        # status = request.json['status']
        id = request.json['id']

        logger.debug(f'A message to log. {request.json} {series} {id}')

        update_data(series, id)

        return 'Data edited successfully!'
    

@series_routes.route('/submit-delete-form', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def submit_delete_form():
    logger.debug(f'request: {request} {request.json}')
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': 'https://app.infopublisher.in',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type',
            "Access-Control-Allow-Credentials": "true",
        }
        return ('', 204, headers)
    
    elif request.method == 'POST':
        series = request.json['series']
        # status = request.json['status']
        id = request.json['id']

        logger.debug(f'A message to log. {request.json} {series} {id}')

        delete_data(id)

        return 'Data deleted successfully!'