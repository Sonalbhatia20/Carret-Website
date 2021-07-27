# from twilio.rest import Client

# print(otp)
# account_sid = 'ACb1340b08fcc5d969e1c6c5406efddf52'
# auth_token = '3f0a50de91d3daddc1e5396c4493cbb4'
# client = Client(account_sid, auth_token)

# message = client.messages \
#                 .create(
#                      body="Your otp is: "+str(otp),
#                      from_='+447862128981',
#                      to='+919931059693'
#                  )


from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import random

otp = random.randint(1000,9999)
message = Mail(
    from_email='singhsaurav8418@gmail.com',
    to_emails='singhsaurav2961999@gmail.com',
    subject='Verification required',
    html_content='<strong>Your otp is: </strong>'+str(otp))
try:
    sg = SendGridAPIClient('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')
    response = sg.send(message)
    print(response.status_code)
    print(response.body)
    print(response.headers)
except Exception as e:
    print(e.message)