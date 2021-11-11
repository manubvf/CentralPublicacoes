import requests
# from usuario import Usuario, UsuarioCadastrado
# import pandas as pd
# from pymysql import connections
from database import Database
from database_connection import DatabaseConnection
import string
import random


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
            token = Central.get_new_token()
            name = data[0][1]
            Database.insert_token(data[0][0], token)
            ret = {'fullname': name, 'token': token}
        else:
            ret = {'error': 'user not found'}

        return ret

    @staticmethod
    def signup(nome, senha, email_institucional):
        data = Database.read_email(email_institucional)
        if len(data) > 0:
            return {'error': 'email already registered'}

        user = email_institucional.split('@')[0][1:]
        json = {'username': user, 'password': senha}
        response = requests.post(
            "https://sigpos-api-prod.d2d.ic.unicamp.br/login", json=json)

        if (response.status_code == 200):
            signup_info = [nome, senha, email_institucional]
            Database.insert_user(signup_info)
            data = Database.read_email(email_institucional)
            if len(data) > 0:
                userId = data[0][0]
                name = data[0][1]
            else:
                return {'error': 'failed to insert user information on database'}

            # Generate token
            token = Central.get_new_token()
            Database.insert_token(userId, token)
            ret = {'fullname': name, 'token': token}
        else:
            ret = {'error': 'email and password not belonging to any DAC student'}

        return ret

    @staticmethod
    def logout(token):
        if not Central.validate_token(token):
            return {'error': 'invalid token'}
        else:
            Database.delete_token(token)
            return

    @staticmethod
    def get_new_token():
        token = ''.join(random.choices(
            string.ascii_letters + string.digits, k=20))
        while Central.tokenExists(token):
            token = ''.join(random.choices(
                string.ascii_letters + string.digits, k=20))

        return token

    @staticmethod
    def tokenExists(token):
        db_connection = DatabaseConnection()
        cursor = db_connection.connection.cursor()

        query = "SELECT tokenString FROM Tokens WHERE tokenString='" + token + "';"
        cursor.execute(query)
        aux = cursor.fetchall()

        db_connection.close_all()

        if len(aux) > 0:
            return True
        else:
            return False

    @staticmethod
    def validate_token(token):
        data = Database.read_token(token)
        if (len(data) > 0):
            return True
        else:
            return False

    @staticmethod
    def deleteUser(email_institucional, senha):
        data = Database.read_user([email_institucional, senha])
        if len(data) <= 0:
            return {'error': 'user doesn´t exist'}
        else:
            # dar Logout senao a tabela de token reclama
            delete_info = [email_institucional]
            Database.delete_user(delete_info)
            data = Database.read_user([email_institucional, senha])
            if len(data) > 0:
                return {'error': 'failed to delete user information on database'}
            else:
                return {'success': 'deleted user information on database'}
