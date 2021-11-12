from database_connection import DatabaseConnection
from datetime import date
from order_by import ORDER
from modification_type import TYPE


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

        query = "SELECT idUsuario, nome, email_institucional, senha FROM Usuario WHERE email_institucional='" + \
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
    def insert_search(titulo, descricao, idCategoria, ano_inicio, estimativa_fim=None, git=None, tag_1=None, tag_2=None, tag_3=None):
        '''
        *** Performs a write (INSERT) operation on the Search Table.
        *** Expects: an title, description, idCategory, start year, git, tag_1, tag_2, tag_3
        *** The optionals are:  git, tag_1, tag_2, tag_3
        *** Return: the search id
        '''
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()

            query = "INSERT INTO `Pesquisas` (`titulo` , `descricao`, `idCategoria`, `ano_inicio`, `ultima_atualizacao` "
            if(not estimativa_fim is None):
                query += ", `estimativa_fim`"
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
                "', '" + date.today().strftime('%Y-%m-%d')
            if(not estimativa_fim is None):
                query += "', '" + estimativa_fim
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
            query += "Pesquisas.ano_inicio, Pesquisas.estimativa_fim, Pesquisas.idTag_1, Pesquisas.idTag_2, "
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
            query += " GROUP BY idPesquisa\n"
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

    @staticmethod
    def insert_token(userId, token):
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()

            query = "INSERT INTO `Tokens` (`tokenString`, `idUsuario`) VALUES ('" + \
                token + "', '" + str(userId) + "');"

            cursor.execute(query)
            db_connection.connection.commit()

        except Exception as e:
            db_connection.connection.rollback()
            raise(e)
        finally:
            db_connection.close_all()

    @staticmethod
    def delete_token(token):
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()

            query = "DELETE FROM `Tokens` WHERE `tokenString`='" + token + "';"

            cursor.execute(query)
            db_connection.connection.commit()

        except Exception as e:
            db_connection.connection.rollback()
            raise(e)
        finally:
            db_connection.close_all()

    @staticmethod
    def read_token(token):
        db_connection = DatabaseConnection()
        cursor = db_connection.connection.cursor()

        query = "SELECT * FROM Tokens WHERE tokenString='" + token + "';"
        cursor.execute(query)
        ret = cursor.fetchall()

        db_connection.close_all()

        return ret

    @staticmethod
    def read_email(email):
        db_connection = DatabaseConnection()
        cursor = db_connection.connection.cursor()

        query = "SELECT * FROM Usuario WHERE email_institucional='" + email + "';"
        cursor.execute(query)
        ret = cursor.fetchall()

        db_connection.close_all()

        return ret

    @staticmethod
    def delete_research(titulo, descricao):
        '''
        *** Performs a remove (DELETE) from the Pesquisas Table.
        *** Expects: titulo and descricao
        *** Return: none
        '''
        '''
        Query final:
        DELETE from `Autores` WHERE (`idPesquisa` = (SELECT `idPesquisa` from `Pesquisas` WHERE `titulo`='titulo' AND `descricao`='descricao'));
        DELETE from `Favoritados` WHERE (`idPesquisa` = (SELECT `idPesquisa` from `Pesquisas` WHERE `titulo`='titulo' AND `descricao`='descricao'));
        DELETE from `Pesquisas` WHERE (`titulo`='titulo' AND `descricao`='descricao');
        '''
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()

            cond_where = "`titulo`='"+titulo+"' AND `descricao`='"+descricao+"'"
            select = "SELECT `idPesquisa` from `Pesquisas` WHERE "+cond_where+")"

            delete_autor = "DELETE from `Autores` WHERE (`idPesquisa` = (" + \
                select+");"
            delete_favoritos = "DELETE from `Favoritados` WHERE (`idPesquisa` = (" + \
                select+");"
            delete_pesquisa = "DELETE from `Pesquisas` WHERE ("+cond_where+");"

            query = delete_autor + delete_favoritos + delete_pesquisa

            cursor.execute(query)
            db_connection.connection.commit()
        except Exception as e:
            db_connection.connection.rollback()
            raise(e)
        finally:
            db_connection.close_all()

    @staticmethod
    def insert_request_research_update(tipo, idPesquisa, idUsuario, titulo=None, descricao=None):
        '''
        *** Insert a request for un update for the search table 
        *** Expects: idPesquisa, the type of modification and the idUsuario of the User who solicitates change
        *** The optionals are: new title or new description 
        *** Return: ID List of users that should be notificated 
        '''
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()
            idModificacaoPesquisas = 'NULL'
            if (tipo != TYPE.exclusao.value):

                query = "INSERT INTO `Modificacao_Pesquisas` ( `idPesquisa`"

                if(titulo is None) and (descricao is None):
                    raise(Exception("Missing arguments"))
                if(not titulo is None):
                    query += ", `titulo`"
                if(not descricao is None):
                    query += ", `descricao`"
                query += ") VALUES ('" + idPesquisa
                if(not titulo is None):
                    query += "', '" + titulo
                if(not descricao is None):
                    query += "', '" + descricao
                query += "');"
                cursor.execute(query)
                db_connection.connection.commit()
                query = "SELECT MAX(idModificacao_Pesquisas) FROM Modificacao_Pesquisas;"
                cursor.execute(query)
                idModificacaoPesquisas = cursor.fetchall()[0][0]
            query = "SELECT idUsuario FROM Autores WHERE (idPesquisa = '" + idPesquisa + \
                "') AND (idUsuario is NOT NULL) AND (idUsuario <> '" + \
                idUsuario + "');"
            cursor.execute(query)
            idAutores = cursor.fetchall()
            for _aut in idAutores:
                query = "INSERT INTO `Atualizacoes` ( `idPesquisa`, `idUsuario`, `status`, `tipo`, `idModificacaoPesquisas`) VALUES ("
                query += " '" + idPesquisa + "', '" + str(_aut[0]) + "', 'pendente'" + \
                    ", '" + TYPE(tipo).name
                if (idModificacaoPesquisas == 'NULL'):
                    query += "', " + idModificacaoPesquisas + ");"
                else:
                    query += "', '" + str(idModificacaoPesquisas) + "');"
                cursor.execute(query)
            db_connection.connection.commit()
            return idAutores
        except Exception as e:
            db_connection.connection.rollback()
            raise(e)
        finally:
            db_connection.close_all()

    @staticmethod
    def insert_request_autor_update(tipo, nome, idPesquisa, idUsuarioSolicitante, idUsuario=None):
        '''
        *** Insert a request for un update for the autor table 
        *** Expects: name, idPesquisa, the type of modification and the idUsuario of the User who solicitates change
        *** The optionals are: an idUsuario for the new autor 
        *** Return: ID List of users that should be notificated 
        '''
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()
            idModificacao_Autores = 'NULL'
            if (tipo != TYPE.exclusao.value):

                query = "INSERT INTO `Modificacao_Autores` ( `nome`"

                if(not idUsuario is None):
                    query += ", `idUsuario`"
                query += ") VALUES ('" + nome
                if(not idUsuario is None):
                    query += "', '" + idUsuario
                query += "');"
                cursor.execute(query)
                db_connection.connection.commit()
                query = "SELECT MAX(idModificacao_Autores) FROM Modificacao_Autores;"
                cursor.execute(query)
                idModificacao_Autores = cursor.fetchall()[0][0]
            query = "SELECT idUsuario FROM Autores WHERE (idPesquisa = '" + idPesquisa + \
                "') AND (idUsuario is NOT NULL) AND (idUsuario <> '" + \
                idUsuarioSolicitante + "');"
            cursor.execute(query)
            idAutores = cursor.fetchall()
            for _aut in idAutores:
                query = "INSERT INTO `Atualizacoes` ( `idPesquisa`, `idUsuario`, `status`, `tipo`, `idModificacaoAutores`) VALUES ("
                query += " '" + idPesquisa + "', '" + str(_aut[0]) + "', 'pendente'" + \
                    ", '" + TYPE(tipo).name
                if (idModificacao_Autores == 'NULL'):
                    query += "', " + idModificacao_Autores + ");"
                else:
                    query += "', '" + str(idModificacao_Autores) + "');"
                cursor.execute(query)
            db_connection.connection.commit()
            return idAutores
        except Exception as e:
            db_connection.connection.rollback()
            raise(e)
        finally:
            db_connection.close_all()

    @staticmethod
    def update_research(idPesquisa, titulo=None, descricao=None, idCategoria=None, ano_inicio=None, idTag_1=None, idTag_2=None, idTag_3=None, git=None, autores=None):
        '''
        *** Performs a update the Pesquisas Table.
        *** Expects: idPesquisa, an title, description, idCategory, start year, git, idTag_1, idTag_2, idTag_3, authors
        *** The optionals are: an title, description, idCategory, start year, git, idTag_1, idTag_2, idTag_3, authors
        *** Return: none
        *** Obs: The variable autores should be a list [], EX: autores = ['Zanoni Dias', 'Flavio Keidi', 'Orlando Lee']
        '''

        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()

            titulo = "`titulo`='"+titulo+"', " if titulo is not None else ""
            descricao = "`descricao`='"+descricao+"', " if descricao is not None else ""
            ano_inicio = "`ano_inicio`='"+ano_inicio + \
                "', " if ano_inicio is not None else ""
            git = "`git`='"+git+"', " if git is not None else ""
            idCategoria = "`idCategoria`='"+idCategoria + \
                "', " if idCategoria is not None else ""
            idTag_1 = "`idTag_1`='"+idTag_1+"', " if idTag_1 is not None else ""
            idTag_2 = "`idTag_2`='"+idTag_2+"', " if idTag_2 is not None else ""
            idTag_3 = "`idTag_3`='"+idTag_3+"', " if idTag_3 is not None else ""

            cond_where = "`idPesquisa`='"+idPesquisa+"'"

            update_pesquisa = "UPDATE `Pesquisas` SET " + titulo+descricao+ano_inicio+git+idCategoria+idTag_1 + \
                idTag_2+idTag_3+", `ultima_atualizacao`='"+date.today().strftime('%Y-%m-%d') + \
                "' WHERE  "+cond_where+";"
            update_pesquisa = update_pesquisa.split(', , ')
            update_pesquisa = update_pesquisa[0]+", "+update_pesquisa[1] if len(
                update_pesquisa) > 1 else update_pesquisa[0]
            update_autores = ""
            delete_autores = ""

            if autores is not None:
                delete_autores = "DELETE from `Autores` WHERE (" + \
                    cond_where+");"
                for i in range(len(autores)):
                    update_autores += "INSERT INTO `Autores` (`idUsuario`, `idPesquisa`, `nome`) VALUES ((SELECT `idUsuario` from `Usuario` WHERE `nome`='" + \
                        autores[i]+"'), '"+idPesquisa+"', '"+autores[i]+"');"

            query = update_pesquisa + delete_autores + update_autores

            cursor.execute(query)
            db_connection.connection.commit()
        except Exception as e:
            db_connection.connection.rollback()
            raise(e)
        finally:
            db_connection.close_all()

    @staticmethod
    def update_publication(idPublicacao, titulo=None, descricao=None, idCategoria=None, ano_inicio=None, ano_termino=None, idTag_1=None, idTag_2=None, idTag_3=None, git=None, autores=None):
        '''
        *** Performs a update the Publicacoes Table.
        *** Expects: idPublicacao, an title, description, idCategory, start year, end year, git, idTag_1, idTag_2, idTag_3, authors
        *** The optionals are: an title, description, idCategory, start year, end year, git, idTag_1, idTag_2, idTag_3, authors
        *** Return: none
        *** Obs: The variable autores should be a list [], EX: autores = ['Zanoni Dias', 'Flavio Keidi', 'Orlando Lee']
        '''

        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()

            update_publicacao = ""
            if((titulo or descricao or idCategoria or ano_inicio or ano_termino or idTag_1 or idTag_3 or git) is not None):

                titulo = "`titulo`='"+titulo+"', " if titulo is not None else ""
                descricao = "`descricao`='"+descricao+"', " if descricao is not None else ""
                ano_inicio = "`ano_inicio`='"+ano_inicio + \
                    "', " if ano_inicio is not None else ""
                ano_termino = "`ano_inicio`='"+ano_termino + \
                    "', " if ano_termino is not None else ""
                git = "`git`='"+git+"', " if git is not None else ""
                idCategoria = "`idCategoria`='"+idCategoria + \
                    "', " if idCategoria is not None else ""
                idTag_1 = "`idTag_1`='"+idTag_1+"', " if idTag_1 is not None else ""
                idTag_2 = "`idTag_2`='"+idTag_2+"', " if idTag_2 is not None else ""
                idTag_3 = "`idTag_3`='"+idTag_3+"', " if idTag_3 is not None else ""

                cond_where = "`idPublicacao`='"+idPublicacao+"'"

                update_publicacao = "UPDATE `Publicacoes` SET " + titulo+descricao+ano_inicio + \
                    ano_termino+git+idCategoria+idTag_1+idTag_2+idTag_3+"WHERE "+cond_where+";"
                update_publicacao = update_publicacao.split(', WHERE')
                update_publicacao = update_publicacao[0]+" WHERE"+update_publicacao[1] if len(
                    update_publicacao) > 1 else update_publicacao[0]
            update_autores = ""
            delete_autores = ""

            if autores is not None:
                delete_autores = "DELETE from `Autores` WHERE (" + \
                    cond_where+");"
                for i in range(len(autores)):
                    update_autores += "INSERT INTO `Autores` (`idUsuario`, `idPublicacao`, `nome`) VALUES ((SELECT `idUsuario` from `Usuario` WHERE `nome`='" + \
                        autores[i]+"'), '"+idPublicacao+"', '"+autores[i]+"');"

            query = update_publicacao + delete_autores + update_autores

            cursor.execute(query)
            db_connection.connection.commit()
        except Exception as e:
            db_connection.connection.rollback()
            raise(e)
        finally:
            db_connection.close_all()

    @staticmethod
    def insert_publication(titulo, descricao, idCategoria, ano_inicio, ano_termino, git=None, tag_1=None, tag_2=None, tag_3=None):
        '''
        *** Performs a write (INSERT) operation on the Search Table.
        *** Expects: an title, description, idCategory, start year, end_year git, tag_1, tag_2, tag_3
        *** The optionals are:  git, tag_1, tag_2, tag_3
        *** Return: the search id
        '''
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()

            query = "INSERT INTO `Publicacoes` (`titulo` , `descricao`, `idCategoria`, `ano_inicio`, `ano_termino`"
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
                "', '" + ano_termino
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
            query = "SELECT MAX(idPublicacao) FROM Publicacoes;"
            cursor.execute(query)
            return cursor.fetchall()
        except Exception as e:
            db_connection.connection.rollback()
            raise(e)
        finally:
            db_connection.close_all()

    @staticmethod
    def read_publication(ord=None, titulo=None, idCategoria=None, idAutor=None, idTag=None):
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

            query = "SELECT Publicacoes.idPublicacao, Publicacoes.titulo, Publicacoes.descricao, Publicacoes.idCategoria, "
            query += "Publicacoes.ano_inicio, Publicacoes.ano_termino, Publicacoes.idTag_1, Publicacoes.idTag_2, "
            query += "Publicacoes.idTag_3, Publicacoes.git FROM Publicacoes\n"
            if(titulo is None) and (idTag is None) and (idCategoria is None) and (idAutor is None):
                query += "INNER JOIN Autores ON Publicacoes.idPublicacao = Autores.idPublicacao"
            else:
                query += "INNER JOIN Autores ON Publicacoes.idPublicacao = Autores.idPublicacao WHERE ("
                if(not titulo is None):
                    first = 1
                    query += "\n\t(Publicacoes.titulo LIKE '%" + \
                        titulo[0] + "%'"
                    for _t in titulo[1:]:
                        query += "\n\t OR Publicacoes.titulo LIKE '%" + _t + "%'"
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
                    query += "\n\t(Publicacoes.idCategoria is NULL "
                    for _c in idCategoria:
                        query += "\n\t OR Publicacoes.idCategoria = '" + _c + "'"
                    query += ")\n"
                if(not idTag is None):
                    if(first == 1):
                        query += "\tAND "
                    query += "\n\t(Publicacoes.idTag_1 is NULL "
                    query += "\n\t OR Publicacoes.idTag_2 is NULL "
                    query += "\n\t OR Publicacoes.idTag_3 is NULL "
                    for _t in idTag:
                        query += "\n\t OR Publicacoes.idTag_1 = '" + _t + "'"
                        query += "\n\t OR Publicacoes.idTag_2 = '" + _t + "'"
                        query += "\n\t OR Publicacoes.idTag_3 = '" + _t + "'"
                    query += ")\n"
                query += ")"
            query += " GROUP BY idPublicacao\n"
            if (ord is None) or (ORDER(ord).value == ORDER.autor.value):
                query += " ORDER BY Autores.nome ASC,\n"
            else:
                query += " ORDER BY Publicacoes." + ORDER(ord).name + " ASC,\n"
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

    @staticmethod
    def insert_favoritados(idUsuario, idPublicacao=None, idPesquisa=None):
        '''
        *** Performs an insert at the Favoritados Table.
        *** Expects: idUsuario, and one of the two: idPublicacao, idPesquisa
        *** Return: none
        '''
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()
            # If it's a Publicacao
            if idPublicacao is not None:
                query = "INSERT INTO `Favoritados` (`idUsuario`, `idPublicacao`) VALUES ('" + \
                    str(idUsuario) + "', '" + str(idPublicacao) + "');"
            # if it's a Pesquisa
            elif idPesquisa is not None:
                query = "INSERT INTO `Favoritados` (`idUsuario`, `idPesquisa`) VALUES ('" + \
                    str(idUsuario) + "', '" + str(idPesquisa) + "');"

            cursor.execute(query)
            db_connection.connection.commit()

        except Exception as e:
            db_connection.connection.rollback()
            raise(e)

        finally:
            db_connection.close_all()

    @staticmethod
    def delete_favoritados(idUsuario, idPublicacao=None, idPesquisa=None):
        '''
        *** Performs a deletion at the Favoritados Table.
        *** Expects: idUsuario, and one of the two: idPublicacao, idPesquisa
        *** Return: none
        '''
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()
            # If it's a Publicacao
            if idPublicacao is not None:
                query = "DELETE FROM `Favoritados` WHERE `idUsuario`='" + \
                    str(idUsuario) + "' AND `idPublicacao`='" + \
                    str(idPublicacao) + "';"
            # if it's a Pesquisa
            elif idPesquisa is not None:
                query = "DELETE FROM `Favoritados` WHERE `idUsuario`='" + \
                    str(idUsuario) + "' AND `idPesquisa`='" + \
                    str(idPesquisa) + "';"

            cursor.execute(query)
            db_connection.connection.commit()

        except Exception as e:
            db_connection.connection.rollback()
            raise(e)

        finally:
            db_connection.close_all()

    @staticmethod
    def read_favoritados(idUsuario=None, idPublicacao=None, idPesquisa=None):
        '''
        *** Performs a read from the Favoritados Table.
        *** Expects: idUsuario or idPublicacao or idPesquisa
        *** Return: all likes related to the given id
        '''
        db_connection = DatabaseConnection()
        cursor = db_connection.connection.cursor()
        # If it's a User id
        if idUsuario is not None:
            query = "SELECT * FROM `Favoritados` WHERE `idUsuario`='" + \
                str(idUsuario) + "';"
        # If it's a Publicacao
        elif idPublicacao is not None:
            query = "SELECT * FROM `Favoritados` WHERE `idPublicacao`='" + \
                str(idPublicacao) + "';"
        # if it's a Pesquisa
        elif idPesquisa is not None:
            query = "SELECT * FROM `Favoritados` WHERE `idPesquisa`='" + \
                str(idPesquisa) + "';"

        cursor.execute(query)
        ret = cursor.fetchall()

        db_connection.close_all()

        return ret

    @staticmethod
    def update_user(idUsuario, nome=None, senha=None, email_pessoal=None, telefone=None, curso=None, lattes=None, research_gate=None, img_path=None):
        '''
        *** Performs an update on the Usuarios Table.
        *** Expects: idUsuario and all fields he wishes to edit
        *** Return: none
        '''
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()

            first = False
            updates = ""

            if nome is not None:
                updates += "`nome`='" + nome + "'"
                first = True
            if senha is not None:
                if not first:
                    updates += "`senha`='" + senha + "'"
                else:
                    updates += ", `senha`='" + senha + "'"
                    first = True
            if email_pessoal is not None:
                if not first:
                    updates += "`email_pessoal`='" + email_pessoal + "'"
                else:
                    updates += ", `email_pessoal`='" + email_pessoal + "'"
                    first = True
            if telefone is not None:
                if not first:
                    updates += "`telefone`='" + str(telefone) + "'"
                else:
                    updates += ", `telefone`='" + str(telefone) + "'"
                    first = True
            if curso is not None:
                if not first:
                    updates += "`curso`='" + curso + "'"
                else:
                    updates += ", `curso`='" + curso + "'"
                    first = True
            if lattes is not None:
                if not first:
                    updates += "`lattes`='" + lattes + "'"
                else:
                    updates += ", `lattes`='" + lattes + "'"
                    first = True
            if research_gate is not None:
                if not first:
                    updates += "`research_gate`='" + research_gate + "'"
                else:
                    updates += ", `research_gate`='" + research_gate + "'"
                    first = True
            if img_path is not None:
                if not first:
                    updates += "`img_path`='" + img_path + "'"
                else:
                    updates += ", `img_path`='" + img_path + "'"
                    first = True

            query = "UPDATE `Usuario` SET " + updates + \
                " WHERE `idUsuario`='" + str(idUsuario) + "';"

            cursor.execute(query)
            db_connection.connection.commit()

        except Exception as e:
            db_connection.connection.rollback()
            raise(e)

        finally:
            db_connection.close_all()

    @staticmethod
    def update_request(idAtualizacao, resultado):
        '''
        *** Performs an update on the Atualizacoes Table.
        *** Expects: idAtualizacao and the new status
        *** Return: none
        '''
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()

            query = "UPDATE `Atualizacoes` SET `status`='" + resultado + \
                "' WHERE `idAtualizacao`='" + str(idAtualizacao) + "';"

            cursor.execute(query)
            db_connection.connection.commit()

        except Exception as e:
            db_connection.connection.rollback()
            raise(e)

        finally:
            db_connection.close_all()

    @staticmethod
    def delete_request(idAtualizacao):
        '''
        *** Performs a deletion on the Atualizacoes/Modificacoes Table.
        *** Expects: idAtualizacao
        *** Return: none
        '''
        try:
            db_connection = DatabaseConnection()
            cursor = db_connection.connection.cursor()

            query = "SELECT * FROM `Atualizacoes` WHERE `idAtualizacao`='" + \
                str(idAtualizacao) + "';"

            cursor.execute(query)

            data = cursor.fetchall()[0]

            if data[6] == 'exclusao':
                pass
            elif data[6] == 'alteracao':
                query = "DELETE FROM `Modificacao_Pesquisas` WHERE `idModificacao_Pesquisas`='" + \
                    str(data[5]) + "';"
                cursor.execute(query)
                db_connection.connection.commit()
            elif data[6] == 'adicao_autor':
                query = "DELETE FROM `Modificacao_Autores` WHERE `idModificacao_Autores`='" + \
                    str(data[4]) + "';"
                cursor.execute(query)
                db_connection.connection.commit()
            else:
                raise(Exception("Invalid fields for Atualizacao"))

            query = "DELETE FROM `Atualizacoes` WHERE `idAtualizacao`='" + \
                str(idAtualizacao) + "';"
            cursor.execute(query)
            db_connection.connection.commit()

        except Exception as e:
            db_connection.connection.rollback()
            raise(e)

        finally:
            db_connection.close_all()
