from flask import Flask, render_template, url_for, request, redirect
from dotenv import load_dotenv
load_dotenv()

import os

import csv
app = Flask(__name__)

sender_email = os.getenv("sender_email")
recipient_email = os.getenv("receiver_email")
app_password = os.getenv("sender_password")

# decorator
@app.route('/')
def my_home():
    return render_template('index.html')


@app.route('/<string:page_name>')
def html_page(page_name):
    return render_template(page_name)


@app.route('/submit_form', methods=['POST', 'GET'])  
def submit_form():
  if request.method == 'POST':
    try:
      data = request.form.to_dict()
      
      # Send email
      import smtplib
      from email.message import EmailMessage
      msg = EmailMessage()
      msg['Subject'] = 'Form Data Submission'  
      msg['From'] = sender_email
      msg['To'] = recipient_email
      msg.set_content('Form data: ' + str(data))
      
      smtp = smtplib.SMTP('smtp.gmail.com', 587)
      smtp.ehlo()
      smtp.starttls()
      smtp.login(sender_email, app_password)
      smtp.send_message(msg)
      
      return redirect('/thankyou.html')
      
    except:
      return 'Error sending email'
      
  else:
    return 'Something went wrong, try again.'



if __name__ == "__main__":
    app.run(debug=True)
