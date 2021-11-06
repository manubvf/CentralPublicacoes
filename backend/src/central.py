import requests
# from usuario import Usuario, UsuarioCadastrado
# import pandas as pd
# from pymysql import connections
from database import Database


class Central:
    def __init__(self):
        pass

    @staticmethod
    def login(user, password):
        '''
        Método que realiza o login de um usuário no sistema. Retorna null em
        caso de falha e um objeto do tipo usuário em caso de sucesso.
        '''
        '''
        user : string com a identificação do usuário (ra)
        password : string com a senha da DAC do usuário
        '''
        login_info = [user, password]
        data = Database.read_user(login_info)
        # Checks if there is an entry on the table
        if len(data) > 0:
            ret = {'token': 'LKJHGFDSA'}
        else:
            ret = {'error': 'user not found'}

        return ret

    @staticmethod
    def cadastro(nome, senha, email_institucional):
        user = email_institucional.split('@')[0][1:]
        json = {'username': user, 'password': senha}
        response = requests.post(
            "https://sigpos-api-prod.d2d.ic.unicamp.br/login", json=json)

        if (response.status_code == 200):
            signup_info = [nome, senha, email_institucional]
            Database.insert_user(signup_info)
            ret = {'token': 'LKJHGFDSA'}
        else:
            ret = {'error': 'error during sign up'}

        return ret
