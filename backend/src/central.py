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
    def updatePublication(idPublicacao, titulo, descricao, idCategoria, ano_inicio, ano_termino, idTag_1, idTag_2, idTag_3, git, autores):
        #data = Database.read_publication(titulo)           function to be implemented
        data = idPublicacao
        if len(data) <= 0:
            return {'error': 'publication doesn´t exist'}
        else:
            #old_idPublicacao = data[0][0]
            #old_titulo = data[0][1]
            #old_descricao = data[0][2]
            #old_idCategoria = data[0][3]
            #old_ano_inicio = data[0][4]
            #old_ano_termino = data[0][5]
            #old_idTag_1 = data[0][6]
            #old_idTag_2 = data[0][7]
            #old_idTag_3 = data[0][8]
            #old_git = data[0][9]
            #old_autores = data[0][10]
            Database.update_publication(idPublicacao, titulo, descricao, idCategoria, ano_inicio, ano_termino, idTag_1, idTag_2, idTag_3, git, autores)
            #data = Database.read_publication(titulo)       function to be implemented
            if len(data) > 0:
                #see if changes happened
                #if (old_idPublicacao != data[0][0] or old_titulo != data[0][1] or old_descricao != data[0][2] or old_idCategoria != data[0][3] or old_ano_inicio != data[0][4] or old_ano_termino != data[0][5] or old_idTag_1 != data[0][6] or old_idTag_2 != data[0][7] or old_idTag_3 != data[0][8] or old_git != data[0][9] or old_autores != data[0][10]):
                return  {"sucess" : "oi"}
            else:
                return {'error': 'failed to update publication information on database'}

