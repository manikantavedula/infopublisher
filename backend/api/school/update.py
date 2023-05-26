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
        school = payload['school']
        contact = payload['contact']
        address = payload['address']
        school_series = payload['school_series']
        email = payload['email']
        id = payload['id']
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

        update_query = "UPDATE school SET name=%s, proper_name_id=%s, email=%s, contact=%s, address=%s, school_series=%s, school_classes=%s, created_by=%s, last_edited_by=%s WHERE id=%s"
        values = (school, proper_name_id, email, contact, address, my_string, '', 'admin', 'admin', id)
        mycursor.execute(update_query, values)
        mydb.commit()

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results