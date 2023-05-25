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
        mycursor.execute("SELECT * FROM users WHERE email=%s", (email,))
        rows = mycursor.fetchall()
        
        if len(rows) == 1:
            results = jsonify({'message': 'success'})
        else:
            results = jsonify({'message': 'no data'})

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results