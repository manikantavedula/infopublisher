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
        school = payload['school']
        contact = payload['contact']
        address = payload['address']
        email = payload['email']
        checkedItems = payload['checkedItems']

        #logger.debug(f'{checkedItems}')
        
        check_query = "SELECT COUNT(*) FROM school WHERE contact = %s"
        mycursor.execute(check_query, (contact,))
        result = mycursor.fetchone()
        
        check_query = "SELECT COUNT(*) FROM users WHERE phone = %s"
        mycursor.execute(check_query, (contact,))
        result1 = mycursor.fetchone()

        if result[0] == 0 and result1[0] == 0:
            # insert_query = "INSERT INTO users (email, role) VALUES (%s, %s)"
            # values = (email, "school")
            # mycursor.execute(insert_query, values)
            # mydb.commit()
        
            school = school.strip() if school is not None else ''
            s = school.lower() if school is not None else ''
            proper_name_id = s.replace(" ", "_")
            arr = []
            for obj in checkedItems:
                arr.append(str(obj['series_id']) + '|-|' + str(obj['standard_id']))
            my_string = ', '.join(list(set(arr)))

            #logger.debug(f'{my_string}')

            insert_query = "INSERT INTO school (name, proper_name_id, email, contact, address, school_series, school_classes, created_by, last_edited_by) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
            values = (school, proper_name_id, email, contact, address, my_string, '', 'admin', 'admin')
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