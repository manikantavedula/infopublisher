from flask import jsonify, make_response, Blueprint, request
from .fetch import get_email_check
from .logger import logger
from flask_cors import cross_origin

common_routes = Blueprint('common', __name__, url_prefix='/common')

@common_routes.route('/api/login', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def login():
    logger.debug(f'request: {request} {request.json}')
    email = request.json.get('email')

    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type',
            "Access-Control-Allow-Credentials": "true",
        }
        return ('', 204, headers)
    
    elif request.method == 'POST':
      data = get_email_check(email)
      
      return data