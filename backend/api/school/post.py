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

        logger.debug(f'{checkedItems}')
        
        school = school.strip() if school is not None else ''
        s = school.lower() if school is not None else ''
        proper_name_id = s.replace(" ", "_")
        arr = []
        for obj in checkedItems:
            arr.append(str(obj['series_id']) + '|-|' + str(obj['standard_id']))
        my_string = ', '.join(list(set(arr)))

        logger.debug(f'{my_string}')

        insert_query = "INSERT INTO school (name, proper_name_id, email, contact, address, school_series, school_classes, created_by, last_edited_by) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        values = (school, proper_name_id, email, contact, address, my_string, '', 'admin', 'admin')
        mycursor.execute(insert_query, values)
        mydb.commit()

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results