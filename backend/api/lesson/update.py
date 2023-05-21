from connection import connect_to_db

def update_data(d, id):
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
        lesson = d['lesson'].strip() if d['lesson'] is not None else ''

        if d['type'] == "main":
            update_query = "UPDATE lesson SET name=%s, series=%s, standard=%s, subject=%s, type=%s WHERE id=%s"
            values = (d['lesson'], d['series'], d['standard'], d['subject'], "main", id)
            mycursor.execute(update_query, values)
        else:
            update_query = "UPDATE lesson SET name=%s, series=%s, standard=%s, subject=%s, type=%s, part_no=%s, lesson_id=%s, live_video_id=%s, animation_video_id=%s WHERE id=%s"
            values = (d['lesson'], d['series'], d['standard'], d['subject'], "part", d['partNo'], d['lessonId'], d['liveVideoId'], d['animationVideoId'], id)
            mycursor.execute(update_query, values)

        mydb.commit()
        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results