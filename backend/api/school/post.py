from connection import connect_to_db

def post_data(school, contact, address, school_series):
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

        insert_query = "INSERT INTO school (name, proper_name_id, contact, address, school_series, school_classes, created_by, last_edited_by) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        values = (school, proper_name_id, contact, address, my_string, '', 'admin', 'admin')
        mycursor.execute(insert_query, values)
        mydb.commit()

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results