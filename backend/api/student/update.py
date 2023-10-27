from connection import connect_to_db
from .logger import logger

def update_data(payload):
    mycursor = None

    mydb = connect_to_db()
    
    if mydb.is_connected():
        print("Connection successful")
    else:
        print("Connection failed")

    mycursor = mydb.cursor()

    results = []
    
    if mydb.is_connected():
        series = payload['series']['id']
        contact = payload['contact']
        address = payload['address']
        email = payload['email']
        name = payload['name']
        standard = payload['standard']['id']
        id = payload['id']
        
        check_query = "SELECT COUNT(*) FROM school WHERE contact = %s"
        mycursor.execute(check_query, (contact,))
        result = mycursor.fetchone()
        
        check_query = "SELECT COUNT(*) FROM users WHERE phone = %s"
        mycursor.execute(check_query, (contact,))
        result1 = mycursor.fetchone()

        if result[0] == 0 and result1[0] == 0:
            s = name.lower() if name is not None else ''
            proper_name_id = s.replace(" ", "_")

            insert_query = "UPDATE student SET name=%s, proper_name_id=%s, email=%s, contact=%s, address=%s, series=%s, standard=%s, role=%s WHERE id=%s"
            #logger.debug(f'{insert_query}')
            values = (name, proper_name_id, email, contact, address, series, standard, 'student', id)
            mycursor.execute(insert_query, values)
            mydb.commit()

            mycursor.close()
            mydb.close()

            results = 'Data stored successfully!'
        else:
            mycursor.close()
            mydb.close()

            results = "Contact already exists"
        
    else:
        mycursor = None

    return results