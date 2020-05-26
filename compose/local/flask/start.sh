#!/bin/sh

#gunicorn main:app --bind 0.0.0.0:5000

export FLASK_ENV=development
flask run --host 0.0.0.0 --port 5000