from connection import connect_to_db

def delete_data(id):
    mycursor = None

    mydb = connect_to_db()
    
    if mydb.is_connected():
        print("Connection successful")
    else:
        print("Connection failed")

    mycursor = mydb.cursor()

    results = []
    
    if mydb.is_connected():
        delete_query = "DELETE FROM standard WHERE id=%s"
        values = (id,)
        mycursor.execute(delete_query, values)
        mydb.commit()

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results