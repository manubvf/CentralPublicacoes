from database_connection import DatabaseConnection
from datetime import date
from order_by import ORDER


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
            cursor.execute(query)
            db_connection.connection.commit()
        except Exception as e:
            db_connection.connection.rollback()
            raise(e)
        finally:
            db_connection.close_all()

    @staticmethod
    def insert_search(titulo, descricao, idCategoria, ano_inicio, git=None, tag_1=None, tag_2=None, tag_3=None):
        '''
        *** Performs a write (INSERT) operation on the Search Table.
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

    @staticmethod
    def insert_autors(nome, idUsuario=None, idPesquisa=None, idPublicacao=None):
        '''
        *** Performs a write (INSERT) operation on the Author Table.
        *** Expects: an nome, and a Serch or Publication
        *** The optionals are:  user id
        '''
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()

            query = "INSERT INTO `Autores` (`nome`"
            if(idPesquisa is None) and (idPublicacao is None):
                raise(Exception("Missing arguments"))
            if(not idPesquisa is None):
                query += ", `idPesquisa`"
            if(not idPublicacao is None):
                query += ", `idPublicacao`"
            if(not idUsuario is None):
                query += ", `idUsuario`"
            query += ") VALUES ('" + nome
            if(not idPesquisa is None):
                query += "', '" + idPesquisa
            if(not idPublicacao is None):
                query += "', '" + idPublicacao
            if(not idUsuario is None):
                query += "', '" + idUsuario
            query += "');"
            print(query)
            cursor.execute(query)
            db_connection.connection.commit()
        except Exception as e:
            db_connection.connection.rollback()
            raise(e)
        finally:
            db_connection.close_all()

    @staticmethod
    def insert_attachments(caminho, idPesquisa=None, idPublicacao=None):
        '''
        *** Performs a write (INSERT) operation on the Attachments Table.
        *** Expects: an path, and a Serch or Publication
        '''
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()

            query = "INSERT INTO `Anexos` (`caminho`"
            if(idPesquisa is None) and (idPublicacao is None):
                raise(Exception("Missing arguments"))
            if(not idPesquisa is None):
                query += ", `idPesquisa`"
            if(not idPublicacao is None):
                query += ", `idPublicacao`"
            query += ") VALUES ('" + caminho
            if(not idPesquisa is None):
                query += "', '" + idPesquisa
            if(not idPublicacao is None):
                query += "', '" + idPublicacao
            query += "');"
            print(query)
            cursor.execute(query)
            db_connection.connection.commit()
        except Exception as e:
            db_connection.connection.rollback()
            raise(e)
        finally:
            db_connection.close_all()

    @staticmethod
    def read_searches(ord=None, titulo=None, idCategoria=None, idAutor=None, idTag=None):
        '''
        *** Performs a search (SELECT) operation on the Search Table.
        *** Expects: ord: one of the enums values
                     all other fields are optionals, none null filds should be lists
        *** Return: all fields
        '''
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()
            first = 0

            query = "SELECT Pesquisas.idPesquisa, Pesquisas.titulo, Pesquisas.descricao, Pesquisas.idCategoria, "
            query += "Pesquisas.ano_inicio, Pesquisas.estimativa_fim, Pesquisas.numero_likes, Pesquisas.idTag_1, Pesquisas.idTag_2, "
            query += "Pesquisas.idTag_3, Pesquisas.ultima_atualizacao, Pesquisas.git FROM Pesquisas\n"
            if(titulo is None) and (idTag is None) and (idCategoria is None) and (idAutor is None):
                query += "INNER JOIN Autores ON Pesquisas.idPesquisa = Autores.idPesquisa"
            else:
                query += "INNER JOIN Autores ON Pesquisas.idPesquisa = Autores.idPesquisa WHERE ("
                if(not titulo is None):
                    first = 1
                    query += "\n\t(Pesquisas.titulo LIKE '%" + titulo[0] + "%'"
                    for _t in titulo[1:]:
                        query += "\n\t OR Pesquisas.titulo LIKE '%" + _t + "%'"
                    query += ")\n "
                if(not idAutor is None):
                    if(first == 1):
                        query += "\tAND "
                    first = 1
                    query += "\n\t(Autores.idAutores = '" + idAutor[0] + "'"
                    for _a in idAutor[1:]:
                        query += "\n\t OR Autores.idAutores = '" + _a + "'"
                    query += ")\n"
                if(not idCategoria is None):
                    if(first == 1):
                        query += "\tAND "
                    first = 1
                    query += "\n\t(Pesquisas.idCategoria is NULL "
                    for _c in idCategoria:
                        query += "\n\t OR Pesquisas.idCategoria = '" + _c + "'"
                    query += ")\n"
                if(not idTag is None):
                    if(first == 1):
                        query += "\tAND "
                    query += "\n\t(Pesquisas.idTag_1 is NULL "
                    query += "\n\t OR Pesquisas.idTag_2 is NULL "
                    query += "\n\t OR Pesquisas.idTag_3 is NULL "
                    for _t in idTag:
                        query += "\n\t OR Pesquisas.idTag_1 = '" + _t + "'"
                        query += "\n\t OR Pesquisas.idTag_2 = '" + _t + "'"
                        query += "\n\t OR Pesquisas.idTag_3 = '" + _t + "'"
                    query += ")\n"
                query += ")"
            if (ord is None) or (ORDER(ord).value == ORDER.autor.value):
                query += " ORDER BY Autores.nome ASC,\n"
            else:
                query += " ORDER BY Pesquisas." + ORDER(ord).name + " ASC,\n"
            query += "\t case when idCategoria is null then 1 else 0 end, idCategoria,\n"
            query += "\t case when idTag_1 is null then 1 else 0 end, idTag_1,\n"
            query += "\t case when idTag_2 is null then 1 else 0 end, idTag_2,\n"
            query += "\t case when idTag_3 is null then 1 else 0 end, idTag_3;\n"
            cursor.execute(query)
            return cursor.fetchall()
        except Exception as e:
            raise(e)
        finally:
            db_connection.close_all()
