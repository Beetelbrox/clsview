from app import app, pointgenerator
from flask import render_template, jsonify, request
import json

@app.route('/')
def index():
     return render_template('index.html')

@app.route('/points', methods=['POST'])
def points():
    data = request.get_json()
    n = int(data['n'])
    center = data['center']
    stdev = int(data['stdev'])
    return jsonify(pointgenerator.generate_points(n, center, stdev))
    
