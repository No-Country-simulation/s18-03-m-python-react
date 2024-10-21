from rest_framework.views import exception_handler
from rest_framework.response import Response

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        custom_response_data = {
            'status_code': response.status_code,
            'message': response.data,
            'error': True
        }
        return Response(custom_response_data, status=response.status_code)

    return response
