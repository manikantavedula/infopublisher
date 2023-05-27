from flask import jsonify, make_response, Blueprint, request
from .fetch import get_email_check, get_role_check, store_tokens
from .logger import logger
from flask_cors import cross_origin
import jwt
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token

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

@common_routes.route('/api/storeTokens', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def storeTokens():
    logger.debug(f'request: {request} {request.json}')
    email = request.json.get('email')
    accessToken = request.json.get('storedAccessToken')
    refreshToken = request.json.get('storedRefreshToken')

    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type',
            "Access-Control-Allow-Credentials": "true",
        }
        return ('', 204, headers)
    
    elif request.method == 'POST':
        data = store_tokens(email, accessToken, refreshToken)
        
        return data
    
@common_routes.route('/api/role', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def role():
    token = request.headers.get('Authorization')
    logger.debug(token)
    if token is None:
        return 'Unauthorized', 401
    
    if token:
        # Remove 'Bearer ' from the token string
        token = token.split(' ')[1]

        try:
            logger.debug(f'request: {request} {request.json}')
            role = request.json.get('role')
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
                data = get_role_check(email, role, token)

                return data
        except ValueError:
            return 'Invalid token. Authentication failed.'
    else:
        return 'No token provided. Authentication failed.'