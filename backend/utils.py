from typing import Any, Dict

def response_structure(status: str, message: str, data: Any = None) -> Dict[str, Any]:
    return {
        "status": status,
        "message": message,
        "data": data
    }
    