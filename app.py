from flask import Flask, render_template, request, jsonify
import chat


# This assumes your chatbot logic is in a file named chat.py with a function to handle the chat.

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')
    # Ensure your HTML file is named index.html and located in the templates' folder.


@app.route('/send_message', methods=['POST'])
def send_message():
    message = request.json['message']
    response = chat.respond_to(message)
    # This function should be defined in your chat.py to handle the message and return a response.
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
