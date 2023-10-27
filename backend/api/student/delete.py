from connection import connect_to_db
from .logger import logger

def delete_data(payload):
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

            insert_query = "DELETE FROM student WHERE id=%s"
            #logger.debug(f'{insert_query}')
            values = (id,)
            mycursor.execute(insert_query, values)
            mydb.commit()

            mycursor.close()
            mydb.close()

            results = 'Data deleted successfully!'
        else:
            mycursor.close()
            mydb.close()

            results = "Contact already exists"
        
    else:
        mycursor = None

    return results