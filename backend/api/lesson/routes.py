from flask import jsonify, make_response, Blueprint, request
from .fetch import get_data, get_data_by_id
from .post import post_data
from .update import update_data
from .delete import delete_data
from flask_cors import cross_origin
from .logger import logger

lesson_routes = Blueprint('lesson', __name__, url_prefix='/lesson')

@lesson_routes.route('/data')
def get_data_endpoint():
    data = get_data()
    response = make_response(jsonify(data))
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET'
    response.headers['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type',
    response.headers["Access-Control-Allow-Credentials"] = "true"
    
    return response

@lesson_routes.route('/dataById', methods=['POST', 'OPTIONS'])
def get_some_data_endpoint():
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
        data = get_data_by_id(request.json)
        response = make_response(jsonify(data))
        
        return response

@lesson_routes.route('/submit-form', methods=['POST', 'OPTIONS'])
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
        lesson = request.json['lesson']
        # status = request.json['status']

        logger.debug(f'A message to log. {request.json} {lesson}')

        post_data(request.json)

        return 'Data stored successfully!'
    

@lesson_routes.route('/submit-edit-form', methods=['POST', 'OPTIONS'])
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
        lesson = request.json['lesson']
        # status = request.json['status']
        id = request.json['id']

        logger.debug(f'A message to log. {request.json} {lesson} {id}')

        update_data(lesson, id)

        return 'Data edited successfully!'
    

@lesson_routes.route('/submit-delete-form', methods=['POST', 'OPTIONS'])
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
        lesson = request.json['lesson']
        # status = request.json['status']
        id = request.json['id']

        logger.debug(f'A message to log. {request.json} {lesson} {id}')

        delete_data(id)

        return 'Data deleted successfully!'