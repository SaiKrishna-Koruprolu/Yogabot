from flask import Flask, render_template, request, jsonify
from main import generate_response

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    message = request.json['message']
    # Assuming you have a function to generate a response in main.py
    response = generate_response(message)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
