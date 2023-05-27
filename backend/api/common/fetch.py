from flask import jsonify
from connection import connect_to_db
from .logger import logger

def get_email_check(email):
    mycursor = None

    mydb = connect_to_db()
    
    if mydb.is_connected():
        print("Connection successful")
    else:
        print("Connection failed")

    mycursor = mydb.cursor()
    results = ""
    
    if mydb.is_connected():
        mycursor.execute("SELECT COUNT(*) FROM users WHERE email=%s", (email,))
        rows = mycursor.fetchone()
        mydb.commit()
        
        mycursor.execute("SELECT COUNT(*) FROM school WHERE email=%s", (email,))
        rows1 = mycursor.fetchone()
        mydb.commit()
        
        # mycursor.execute("SELECT COUNT(*) FROM student WHERE email=%s", (email,))
        # rows2 = mycursor.fetchone()
        
        if rows[0] == 1:
            results = jsonify({'message': 'success', 'role': 'admin'})
        elif rows1[0] == 1:
            results = jsonify({'message': 'success', 'role': 'school'})
        else:
            results = jsonify({'message': 'no data'})

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results

def get_role_check(email, role, token):
    mycursor = None

    mydb = connect_to_db()
    
    if mydb.is_connected():
        print("Connection successful")
    else:
        print("Connection failed")

    mycursor = mydb.cursor()
    results = ""
    
    if mydb.is_connected():
        mycursor.execute("SELECT COUNT(*) FROM users WHERE email=%s AND role=%s AND access_token=%s", (email, role, token))
        rows = mycursor.fetchone()
        mydb.commit()

        mycursor.execute("SELECT COUNT(*) FROM school WHERE email=%s AND role=%s AND access_token=%s", (email, role, token))
        rows1 = mycursor.fetchone()
        mydb.commit()
        
        if rows[0] == 1:
            results = jsonify({'message': 'role verified', 'role': role})
        elif rows1[0] == 1:
            results = jsonify({'message': 'role verified', 'role': role})
        else:
            results = jsonify({'message': 'no data'})

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results

def store_tokens(email, access, refresh):
    mycursor = None

    mydb = connect_to_db()
    
    if mydb.is_connected():
        print("Connection successful")
    else:
        print("Connection failed")

    mycursor = mydb.cursor()
    results = ""
    
    if mydb.is_connected():
        logger.debug(f'{email}, {access}, {refresh}')

        mycursor.execute("SELECT COUNT(*) FROM users WHERE email=%s", (email,))
        rows = mycursor.fetchone()
        mydb.commit()

        mycursor.execute("SELECT COUNT(*) FROM school WHERE email=%s", (email,))
        rows1 = mycursor.fetchone()
        mydb.commit()
        
        if rows[0] == 1:  
            update_query = "UPDATE users SET access_token=%s, refresh_token=%s WHERE email=%s"
            values = (access, refresh, email)
            mycursor.execute(update_query, values)
            mydb.commit()

            mycursor.close()
            mydb.close()

            results = jsonify({'message': 'Tokens Stored'})
        elif rows1[0] == 1:  
            update_query = "UPDATE school SET access_token=%s, refresh_token=%s WHERE email=%s"
            values = (access, refresh, email)
            mycursor.execute(update_query, values)
            mydb.commit()

            mycursor.close()
            mydb.close()

            results = jsonify({'message': 'Tokens Stored'})
        else:
            results = jsonify({'message': 'no data'})
    else:
        mycursor = None
        results = "Error for Tokens Stored***"

    return results