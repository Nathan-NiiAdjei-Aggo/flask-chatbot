from flask import Flask, render_template, request, jsonify
import chat
import smtplib


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
    return jsonify({'response': response})


@app.route('/register_complaint', methods=['POST'])
def register_complaint():
    data = request.get_json()
    name = data['name']
    email = data['email']
    send_email_to_admissions(name, email)
    return jsonify(message="Thank you, an admissions officer will contact you soon.")


def send_email_to_admissions(name, email):
    sender = "your-email@example.com"
    receiver = "admissions@example.com"
    password = "yourpassword"  # Consider using environment variables for security
    subject = "Urgent: Contact Request from Dissatisfied User"
    body = f"Please contact the following individual who was not satisfied with the chatbot assistance:\nName: {name}\nEmail: {email}"

    message = f"""From: {sender}
To: {receiver}
Subject: {subject}

{body}
"""

    try:
        server = smtplib.SMTP_SSL('smtp.example.com', 465) # Adjust as per your SMTP server
        server.login(sender, password)
        server.sendmail(sender, receiver, message)
        server.quit()
        print("Successfully sent email")
    except Exception as e:
        print(f"Error: unable to send email due to {e}")


if __name__ == '__main__':
    app.run(debug=True)
