from connection import connect_to_db

def post_data(distributor):
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
        distributor = distributor.strip() if distributor is not None else ''
        s = distributor.lower() if distributor is not None else ''
        proper_name_id = s.replace(" ", "_")
        insert_query = "INSERT INTO distributor (name, proper_name_id, created_by, last_edited_by) VALUES (%s, %s, %s, %s)"
        values = (distributor, proper_name_id, 'admin', 'admin')
        mycursor.execute(insert_query, values)
        mydb.commit()

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results