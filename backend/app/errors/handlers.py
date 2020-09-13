from flask import Blueprint, jsonify
from app.auth.auth import AuthError

errors = Blueprint('errors', __name__)

@errors.app_errorhandler(400)
def error_400(error):
    return jsonify({
        "success": False,
        "error": 400,
        "message": "bad request"
    }), 400

@errors.app_errorhandler(401)
def error_401(error):
    return jsonify({
        "success": False,
        "error": 401,
        "message": "permissions error"
    }), 401


@errors.app_errorhandler(404)
def error_404(error):
    return jsonify({
        "success": False,
        "error": 404,
        "message": "resource not found"
    }), 404

@errors.app_errorhandler(422)
def error_422(error):
    return jsonify({
        "success": False,
        "error": 422,
        "message": "unprocessable data"
    }), 422


@errors.app_errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response

