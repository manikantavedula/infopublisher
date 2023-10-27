from connection import connect_to_db
from .logger import logger

def post_data(payload):
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
        created_by = payload['created_by']
        # school = payload['id']
        
        check_query = "SELECT COUNT(*) FROM school WHERE contact = %s"
        mycursor.execute(check_query, (contact,))
        result = mycursor.fetchone()
        
        check_query = "SELECT COUNT(*) FROM users WHERE phone = %s"
        mycursor.execute(check_query, (contact,))
        result1 = mycursor.fetchone()

        if result[0] == 0 and result1[0] == 0:
            s = name.lower() if name is not None else ''
            proper_name_id = s.replace(" ", "_")

            insert_query = "INSERT INTO student (name, proper_name_id, email, contact, address, school, series, standard, role, created_by, last_edited_by) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            values = (name, proper_name_id, email, contact, address, created_by, series, standard, 'student', created_by, created_by)
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