from connection import connect_to_db
from .logger import logger

def post_data(d):
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
            insert_query = "INSERT INTO lesson (name, series, standard, subject, type) VALUES (%s, %s, %s, %s, %s)"
            values = (lesson, d['series'], d['standard'], d['subject'], "main")
            logger.debug(f'Lesson Insert Query Main. {insert_query} {values}')
            mycursor.execute(insert_query, values)
        else:
            insert_query = "INSERT INTO lesson (name, series, standard, subject, type, part_no, part_name, lesson_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
            values = (lesson, d['series'], d['standard'], d['subject'], "part", d['partNo'], d['partName'], d['lessonId'])
            logger.debug(f'Lesson Insert Query Part. {insert_query} {values}')
            mycursor.execute(insert_query, values)

        mydb.commit()
        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results