from datetime import date
import ntpath
from flask.json import tag
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
            # token = Central.get_new_token()
            name = data[0][1]
            id = data[0][0]
            try:
                token = Database.read_token_from_id(id)[0][0]
            except Exception("Couldn't find user's token") as e:
                raise(e)

            # Database.insert_token(data[0][0], token)
            ret = {'fullname': name, 'token': token, 'id': id}
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
            ret = {'fullname': name, 'token': token, 'id': userId}
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
            return data[0][1]
        else:
            return 0
          
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
            

    @staticmethod
    def search_project(params):
        # order by year
        ord = 2
        titulos = []
        idCategorias = []
        idAutores = []
        idTags = []

        for _param in params:
            if _param['category'] == 'titulo':
                titulos.append(_param['value'])
            elif _param['category'] == 'autor':
                idAutores = idAutores + Database.get_author_id(_param['value'])
            elif _param['category'] == 'categoria':
                cat = Database.get_category_id(_param['value'])
                if cat is not None:
                    idCategorias.append(cat)
            elif _param['category'] == 'tag':
                t = Database.get_tag_id(_param['value'])
                if t is not None:
                    idTags.append(t)

        if len(titulos) == 0:
            titulos = None
        if len(idCategorias) == 0:
            idCategorias = None
        if len(idAutores) == 0:
            idAutores = None
        if len(idTags) == 0:
            idTags = None

        data = Database.read_searches(
            ord, titulo=titulos, idCategoria=idCategorias, idAutor=idAutores, idTag=idTags)

        research_list = []

        for _r in data:
            # Research id
            rid = _r[0]
            # Research title
            rtitle = _r[1]
            # Category
            if _r[3] is not None:
                rcat = Database.get_category_name(_r[3])
            else:
                rcat = '-'
            # Get authors
            authors = Database.read_authors(rid)
            rauthors = []
            for _aut in authors:
                _raut = {'fullname': _aut[1],
                         'email': _aut[4], 'lattes': _aut[7]}
                rauthors.append(_raut)
            # Get tags
            rtags = []
            if _r[6] is not None:
                rtags.append(Database.read_tag(_r[6])[0][0])
            if _r[7] is not None:
                rtags.append(Database.read_tag(_r[7])[0][0])
            if _r[8] is not None:
                rtags.append(Database.read_tag(_r[8])[0][0])
            # Get number of interested people
            rfav = len(Database.read_favoritados(_r[0]))

            # Build JSON
            research = {'id': rid, 'title': rtitle, 'category': rcat, 'authors': rauthors,
                        'tags': rtags, 'interested': rfav, 'isInterested': 'false'}

            research_list.append(research)

        return {'searchResult': research_list}

    @staticmethod
    def view_project(idPesquisa, token):

        # Check if token is valid
        data = Database.read_token(token)
        if len(data) < 1:
            return {'error': 'invalid token'}

        _r = Database.read_search_from_id(idPesquisa)

        # Research id
        rid = _r[0]
        # Research title
        rtitle = _r[1]
        # Category
        if _r[3] is not None:
            rcat = Database.get_category_name(_r[3])
        else:
            rcat = '-'
        # Get authors
        authors = Database.read_authors(rid)
        rauthors = []
        for _aut in authors:
            _raut = {'fullname': _aut[1],
                     'email': _aut[4], 'lattes': _aut[7]}
            rauthors.append(_raut)
        # Get tags
        rtags = []
        if _r[6] is not None:
            rtags.append(Database.read_tag(_r[6])[0][0])
        if _r[7] is not None:
            rtags.append(Database.read_tag(_r[7])[0][0])
        if _r[8] is not None:
            rtags.append(Database.read_tag(_r[8])[0][0])
        # Get start date
        rstart = _r[5]
        # Get end date
        if _r[6] is not None:
            rend = _r[6]
        else:
            rend = '-'
        # Get number of interested people
        rfav = len(Database.read_favoritados(_r[0]))
        # Get description
        rdesc = _r[2]
        # Get attachments
        ranex = []
        anex = Database.read_anexos(_r[0])
        for _anex in anex:
            _ranex = {'type': 'file',
                      'name': 'Documento', 'file': _anex[0]}
            ranex.append(_ranex)
        # Get last update
        if _r[9] is not None:
            rlast = str(_r[9].isoformat())
        else:
            rlast = '-'
        # Get finished status
        rfinished = 'false'
        # Get outdated info
        routdated = 'false'

        # Build JSON
        research = {'id': rid, 'title': rtitle, 'category': rcat, 'authors': rauthors, 'tags': rtags, 'startDate': rstart, 'endDate': rend, 'interested': rfav,
                    'description': rdesc, 'attachments': ranex, 'lastUpdate': rlast, 'finished': rfinished, 'isInterested': 'false', 'outdated': routdated}

        # print({'searchResult': research_list})

        return research

    @staticmethod
    def register_project(title, category, description, authors, tags, startDate, endDate, attachments):
        # Get tags ids
        idTags = []
        if len(tags) > 0:
            for _tag in tags:
                data = Database.read_tag(palavra_chave=_tag)
                if len(data) > 0:
                    idTags.append(data[0][0])
                else:
                    data = Database.insert_tag(_tag)
                    idTags.append(data[0])

        if len(idTags) == 3:
            tag_1 = idTags[0]
            tag_2 = idTags[1]
            tag_3 = idTags[2]
        elif len(idTags) == 2:
            tag_1 = idTags[0]
            tag_2 = idTags[1]
            tag_3 = None
        elif len(idTags) == 1:
            tag_1 = idTags[0]
            tag_2 = None
            tag_3 = None
        elif len(idTags) == 0:
            tag_1 = None
            tag_2 = None
            tag_3 = None
        else:
            raise(Exception("invalid number of tags"))

        # Get category id
        idCat = Database.read_category(category)[0][0]

        # Insert project into table
        idPesquisa = Database.insert_search(
            title, description, idCat, startDate, endDate, None, tag_1, tag_2, tag_3)[0][0]

        # Insert authors in Autores table
        for _author in authors:
            autid = Database.read_user_by_name(_author)
            if autid is not None:
                Database.insert_autors(_author, autid, idPesquisa)
            else:
                Database.insert_autors(_author, idPesquisa=idPesquisa)

    @staticmethod
    def show_interest(token, idPesquisa):
        idUsuario = Central.validate_token(token)
        if not idUsuario:
            return {'error': 'invalid token'}

        Database.insert_favoritados(idUsuario, idPesquisa=idPesquisa)

        return {'ok': 'ok'}

    def delete_research(titulo, descricao, token):
        idUsuario = Central.validate_token(token)
        if not idUsuario:
            return {'error': 'invalid token'}

        data = Database.read_searches(1, [titulo], None, None, None)
        if (len(data) > 0):
            idPesquisa = data[0][0]
            data = Database.read_authors(idPesquisa)
            if (len(data) == 1):
                Database.delete_research(titulo, descricao)
                data = Database.read_searches(1, [titulo], None, None, None)
                if (len(data) <= 0):
                    return {'success': 'research deleted'}
                else:
                    return {'error': 'failed to delete research information on database'}
            else:
                #mais de um autor
                Database.insert_request_research_update(2, str(idPesquisa), str(idUsuario), titulo, descricao)
                return {'success': 'request to delete research sended'}
        else:
            return {'error': 'research doesn´t exist'}
       


# data = date(2021, 8, 9)
# print(str(data.isoformat()))

# Central.register_project("Pesquisao Brabo", "Análise de algoritmos", "pesquisa braba demais", [
#                          "Manulenis", "Duzao da Massa"], ["C", "Tagzao"], "2008", None, None)

# print(date.today().strftime("%Y-%m-%d"))
#Central.show_interest('gUolBeTGFpcFEbCpEra9', 176)
