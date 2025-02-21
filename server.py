from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message

app = Flask(__name__)
CORS(app)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Use your email provider's SMTP server
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'gitusimon7969@gmail.com'  # Replace with your email
app.config['MAIL_PASSWORD'] = 'symo7699'  # Replace with your email password
app.config['MAIL_DEFAULT_SENDER'] = 'gitusimon7969@gmail.com'  # Replace with your email

mail = Mail(app)

# Route to handle feedback submission
@app.route('/submit-feedback', methods=['POST'])
def submit_feedback():
    data = request.json

    if not data or not data.get('name') or not data.get('email') or not data.get('message'):
        return jsonify({'error': 'All fields are required.'}), 400

    try:
        # Send feedback email
        msg = Message(
            subject=f"Feedback from {data['name']}",
            recipients=['gitusimon7699@gmail.com'],  # Replace with the recipient email
            body=f"""
            Feedback Received:
            
            Name: {data['name']}
            Email: {data['email']}
            Message: {data['message']}
            """
        )
        mail.send(msg)
        return jsonify({'message': 'Feedback submitted successfully!'}), 200
    except Exception as e:
        print(f"Failed to send email: {e}")
        return jsonify({'error': 'Failed to send feedback.'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
