import requests
import random
from django.conf import settings

def send_otp_to_phone(mobile_number):
	try:
		otp = str(random.randint(1111, 9999))
		url = f'https://2factor.in/API/V1/{settings.API_KEY}/SMS/{mobile_number}/{otp}'
		response = requests.get(url)
		return otp

	except Exception as e:
		return None

