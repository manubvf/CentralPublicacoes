import requests


user = {'username': '196240', 'password': 'Gce15p42'}
header = {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJleHRlcm5hbCIsInJvbGVzIjpbIlJPTEVfRVhURVJOQUwiXSwiZXhwIjoyNDQ3NjYwMTU2fQ.QHR1OTiBglfWeVqHPht51KfwBcJu41M6lPhULx9Ci31ngRbPE9fwcZdf7bwZrdBqJkopLdi1ja79sOfeF-jiGQ'}
response = requests.post(
    "https://sigpos-api-prod.d2d.ic.unicamp.br/login", json=user)

print(response.status_code)
print(response.text)


'''
page começa no 0!!!
comando curl:
curl 'https://sigpos-api-prod.d2d.ic.unicamp.br/api/secure/external/students?page=0&size=50' -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJleHRlcm5hbCIsInJvbGVzIjpbIlJPTEVfRVhURVJOQUwiXSwiZXhwIjoyNDQ3NjYwMTU2fQ.QHR1OTiBglfWeVqHPht51KfwBcJu41M6lPhULx9Ci31ngRbPE9fwcZdf7bwZrdBqJkopLdi1ja79sOfeF-jiGQ" # noqa E501
'''


data = {'page': 1, 'size': 1}
response = requests.get(
    "https://sigpos-api-prod.d2d.ic.unicamp.br/api/secure/external/students/actives", headers=header, data=data)  # noqa 501

print(response.status_code)
print(response.text)
