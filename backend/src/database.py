from database_connection import DatabaseConnection


class Database:

    @staticmethod
    def read_user(args):
        '''
        ***Perform a read (SELECT) operation on the user table and returns the result.
        *** Expects: an email and password 
        *** Return: the user fields
        '''
        db_connection = DatabaseConnection()
        cursor = db_connection.connection.cursor()

        query = "SELECT email_institucional, senha FROM Usuario WHERE email_institucional='" + \
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
            cursor.execute(query)
            db_connection.connection.commit()
        except Exception as e:
            db_connection.connection.rollback()
            raise(e)
        finally:
            db_connection.close_all()