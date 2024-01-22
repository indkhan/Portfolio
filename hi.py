from dotenv import load_dotenv
load_dotenv()

import os
data = """ro;otjhrkyj orymlmyhh
dh
h
hth
td
hrtd
yr
dy
rdy
rty
rt""" 

sender_email = os.getenv("sender_email")
recipient_email = os.getenv("receiver_email")
app_password = os.getenv("sender_password")

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
