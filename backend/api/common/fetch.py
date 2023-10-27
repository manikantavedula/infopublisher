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


def get_login_role(phone):
    mycursor = None

    mydb = connect_to_db()
    
    if mydb.is_connected():
        print("Connection successful")
    else:
        print("Connection failed")

    mycursor = mydb.cursor()
    results = ""

    #logger.debug(f'{phone}')
    
    if mydb.is_connected():
        mycursor.execute("SELECT COUNT(*) FROM users WHERE phone=%s", (phone,))
        rows = mycursor.fetchone()
        mydb.commit()
        
        mycursor.execute("SELECT COUNT(*) FROM school WHERE contact=%s", (phone,))
        rows1 = mycursor.fetchone()
        mydb.commit()
        
        mycursor.execute("SELECT COUNT(*) FROM student WHERE contact=%s", (phone,))
        rows2 = mycursor.fetchone()
        mydb.commit()
        
        if rows[0] == 1:
            mycursor.execute("SELECT * FROM users WHERE phone=%s", (phone,))
            rows = mycursor.fetchall()

            # get the column names
            col_names = [description[0] for description in mycursor.description]

            # create a list of dictionaries where each dictionary represents a row with column names as keys and row values as values
            results = [dict(zip(col_names, row)) for row in rows]

            results = jsonify({'message': 'success', 'role': 'admin', 'data': results})
        elif rows1[0] == 1:
            mycursor.execute("SELECT * FROM school WHERE contact=%s", (phone,))
            rows1 = mycursor.fetchall()

            # get the column names
            col_names = [description[0] for description in mycursor.description]

            # create a list of dictionaries where each dictionary represents a row with column names as keys and row values as values
            results = [dict(zip(col_names, row)) for row in rows1]

            results = jsonify({'message': 'success', 'role': 'school', 'data': results})
        elif rows2[0] >= 1:
            mycursor.execute("SELECT s.*, CONCAT(s.series, '|-|', s.standard) AS formatted_data FROM student s WHERE contact=%s", (phone,))
            rows1 = mycursor.fetchall()

            # get the column names
            col_names = [description[0] for description in mycursor.description]

            # create a list of dictionaries where each dictionary represents a row with column names as keys and row values as values
            results = [dict(zip(col_names, row)) for row in rows1]

            results = jsonify({'message': 'success', 'role': 'student', 'data': results})
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
        #logger.debug(f'store tokens {email}, {access}, {refresh}')

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

def otp_login_check(request):
    mycursor = None

    mydb = connect_to_db()
    
    if mydb.is_connected():
        print("Connection successful")
    else:
        print("Connection failed")

    mycursor = mydb.cursor()
    results = ""

    phone_number = request["mobileNumber"]
    session_id = request["Details"]
    status = request["Status"]
    otp = request["OTP"]
    
    if mydb.is_connected():
        mycursor.execute("SELECT COUNT(*) FROM people WHERE phone_number=%s", (phone_number,))
        rows = mycursor.fetchone()
        mydb.commit()
        
        if rows[0] == 1:
            update_query = "UPDATE people SET session_id=%s, otp=%s WHERE phone_number=%s"
            values = (session_id, otp, phone_number)
            mycursor.execute(update_query, values)
            mydb.commit()

            results = jsonify({'message': 'success', 'role': 'student', 'login': 'update'})
        else:
            update_query = "INSERT INTO people (phone_number, session_id, otp) Values (%s, %s, %s)"
            values = (phone_number, session_id, otp)
            mycursor.execute(update_query, values)
            mydb.commit()

            results = jsonify({'message': 'success', 'role': 'student', 'login': 'insert'})

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results
