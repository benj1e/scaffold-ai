import logging
from logging.config import dictConfig
from app.core.settings import settings

def setup_logger():
    log_config = {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
            },
        },
        "handlers": {
            "default": {
                "level": "INFO",
                "formatter": "default",
                "class": "logging.StreamHandler",
            },
        },
        "root": {
            "level": "INFO",
            "handlers": ["default"],
        },
    }

    dictConfig(log_config)
