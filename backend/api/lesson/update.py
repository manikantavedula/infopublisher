from connection import connect_to_db

def update_data(lesson, id):
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
        lesson = lesson.strip() if lesson is not None else ''
        s = lesson.lower() if lesson is not None else ''
        proper_name_id = s.replace(" ", "_")
        # status = status.lower() if status is not None else ''
        update_query = "UPDATE lesson SET name=%s, proper_name_id=%s WHERE id=%s"
        values = (lesson, proper_name_id, id)
        mycursor.execute(update_query, values)
        mydb.commit()

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results