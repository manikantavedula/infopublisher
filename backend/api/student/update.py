from connection import connect_to_db

def update_data(school, contact, address, school_series, id):
    mycursor = None

    mydb = connect_to_db()
    
    if mydb.is_connected():
        print("Connection successful")
    else:
        print("Connection failed")

    mycursor = mydb.cursor()

    results = []
    
    if mydb.is_connected():
        # insert data into table
        school = school.strip() if school is not None else ''
        s = school.lower() if school is not None else ''
        proper_name_id = s.replace(" ", "_")
        arr = []
        for obj in school_series:
            arr.append(str(obj['id']))
        my_string = ', '.join(arr)

        update_query = "UPDATE school SET name=%s, proper_name_id=%s, contact=%s, address=%s, school_series=%s, school_classes=%s, created_by=%s, last_edited_by=%s WHERE id=%s"
        values = (school, proper_name_id, contact, address, my_string, '', 'admin', 'admin', id)
        mycursor.execute(update_query, values)
        mydb.commit()

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results