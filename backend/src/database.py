from database_connection import DatabaseConnection
from datetime import date


class Database:

    @staticmethod
    def read_category(nome=None):
        '''
        ***Perform a read (SELECT) operation on the category table and returns the result.
        *** Expects: none or the category name 
        *** Return:  id and name (optional)
        '''
        db_connection = DatabaseConnection()
        cursor = db_connection.connection.cursor()

        if(nome is None):
            query = "SELECT idCategoria, nome FROM Categoria ;"
        else:
            query = "SELECT idCategoria FROM Categoria WHERE nome =" + \
                nome + ";"

        cursor.execute(query)
        ret = cursor.fetchall()

        db_connection.close_all()

        return ret

    @staticmethod
    def read_tag(id_tag=None, palavra_chave=None):
        '''
        ***Perform a read (SELECT) operation on the tag table and returns the result.
        *** Expects: none or the id or the tag name 
        *** Return:  id and name (optional)
        '''
        db_connection = DatabaseConnection()
        cursor = db_connection.connection.cursor()

        if((palavra_chave is None) and (id_tag is None)):
            query = "SELECT idTag , palavra_chave FROM Tag ;"
        elif(not id_tag is None):
            query = "SELECT palavra_chave FROM Tag WHERE idTag ='" + \
                id_tag + "';"
        else:
            query = "SELECT idTag FROM Tag WHERE palavra_chave = '" + \
                palavra_chave + "';"

        cursor.execute(query)
        ret = cursor.fetchall()

        db_connection.close_all()

        return ret

    @staticmethod
    def read_user(args):
        '''
        ***Perform a read (SELECT) operation on the user table and returns the result.
        *** Expects: an email and password 
        *** Return: the user fields
        '''
        db_connection = DatabaseConnection()
        cursor = db_connection.connection.cursor()

        query = "SELECT idUsuario, email_institucional, senha FROM Usuario WHERE email_institucional='" + \
            args[0] + "' AND senha='" + args[1] + "';"
        cursor.execute(query)
        ret = cursor.fetchall()

        db_connection.close_all()

        return ret

    @staticmethod
    def insert_user(args):
        '''
        *** Performs a write (INSERT) operation on the User Table.
        *** Expects: an name, password and email
        *** Return: none
        '''
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()

            query = "INSERT INTO `Usuario` (`nome` , `senha`, `email_institucional`) VALUES ('" + \
                args[0] + "', '" + args[1] + "', '" + args[2] + "');"

            cursor.execute(query)
            db_connection.connection.commit()
        except Exception as e:
            db_connection.connection.rollback()
            raise(e)
        finally:
            db_connection.close_all()

    @staticmethod
    def delete_user(args):
        '''
        *** Performs a remove (DELETE) from the User Table.
        *** Expects: an email
        *** Return: none
        '''
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()

            query = "DELETE FROM `Usuario` WHERE (`email_institucional`='" + \
                args[0] + "');"
            print(query)
            cursor.execute(query)
            db_connection.connection.commit()
        except Exception as e:
            db_connection.connection.rollback()
            raise(e)
        finally:
            db_connection.close_all()

    @staticmethod
    def insert_pesquisa(titulo, descricao, idCategoria, ano_inicio, git=None, tag_1=None, tag_2=None, tag_3=None):
        '''
        *** Performs a write (INSERT) operation on the Search and Author Tables.
        *** Expects: an title, description, idCategory, start year, git, tag_1, tag_2, tag_3
        *** The optionals are:  git, tag_1, tag_2, tag_3
        *** Return: the search id
        '''
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()

            query = "INSERT INTO `Pesquisas` (`titulo` , `descricao`, `idCategoria`, `ano_inicio`, `numero_likes`, `ultima_atualizacao` "
            if(not git is None):
                query += ", `git`"
            if(not tag_1 is None):
                query += ", `idTag_1`"
            if(not tag_2 is None):
                query += ", `idTag_2`"
            if(not tag_3 is None):
                query += ", `idTag_3`"
            query += ") VALUES ('" + titulo + "', '" + descricao + \
                "', '" + idCategoria + "', '" + ano_inicio + \
                "', '0', '" + date.today().strftime('%Y-%m-%d')
            if(not git is None):
                query += "', '" + git
            if(not tag_1 is None):
                query += "', '" + tag_1
            if(not tag_2 is None):
                query += "', '" + tag_2
            if(not tag_3 is None):
                query += "', '" + tag_3
            query += "');"
            cursor.execute(query)
            db_connection.connection.commit()
            query = "SELECT MAX(idPesquisa) FROM Pesquisas;"
            cursor.execute(query)
            return cursor.fetchall()
        except Exception as e:
            db_connection.connection.rollback()
            raise(e)
        finally:
            db_connection.close_all()
