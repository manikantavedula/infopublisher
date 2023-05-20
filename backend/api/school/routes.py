from flask import jsonify, make_response, Blueprint, request
from .fetch import get_data
from .post import post_data
from .update import update_data
from .delete import delete_data
from .logger import logger
from flask_cors import cross_origin

school_routes = Blueprint('school', __name__, url_prefix='/school')

@school_routes.route('/data')
def get_data_endpoint():
    data = get_data()
    response = make_response(jsonify(data))
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET'
    response.headers['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type',
    response.headers["Access-Control-Allow-Credentials"] = "true"
    
    return response

@school_routes.route('/submit-form', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def submit_form():
    logger.debug(f'request: {request} {request.json}')
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type',
            "Access-Control-Allow-Credentials": "true",
        }
        return ('', 204, headers)
    
    elif request.method == 'POST':
        school = request.json['school']
        contact = request.json['contact']
        address = request.json['address']
        school_series = request.json['school_series']

        logger.debug(f'A message to log. {request.json} {school} {contact} {address} {school_series}')

        post_data(school, contact, address, school_series)

        return 'Data stored successfully!'
    

@school_routes.route('/submit-edit-form', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def submit_edit_form():
    logger.debug(f'request: {request} {request.json}')
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type',
            "Access-Control-Allow-Credentials": "true",
        }
        return ('', 204, headers)
    
    elif request.method == 'POST':
        school = request.json['school']
        contact = request.json['contact']
        address = request.json['address']
        school_series = request.json['school_series']
        id = request.json['id']

        logger.debug(f'A message to log. {request.json} {school} {contact} {address} {school_series} {id}')

        update_data(school, contact, address, school_series, id)

        return 'Data edited successfully!'
    

@school_routes.route('/submit-delete-form', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def submit_delete_form():
    logger.debug(f'request: {request} {request.json}')
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type',
            "Access-Control-Allow-Credentials": "true",
        }
        return ('', 204, headers)
    
    elif request.method == 'POST':
        school = request.json['school']
        contact = request.json['contact']
        address = request.json['address']
        school_series = request.json['school_series']
        id = request.json['id']

        logger.debug(f'A message to log. {request.json} {school} {contact} {address} {school_series} {id}')

        delete_data(id)

        return 'Data deleted successfully!'