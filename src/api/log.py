from flask import Flask,jsonify,request
from dbconnection import connection
import uuid
app = Flask(__name__)

@app.route('/api/logs/',methods=['GET','POST','PUT'])
def log():
	uid = str(uuid.uuid1())
	if request.method == 'GET':
		cur,conn=connection()
		cur.execute("SELECT  log_id,timestamp,log_type from log order by timestamp desc")
		conn.commit()
		result = cur.fetchall()
		rows = []
		for row in result:
			rows.append({"id": row[0],"timestamp": str(row[1]),"log_type": row[2]})
		cur.close()
		return jsonify(rows)
	
	if request.method == 'PUT':
		cur,conn=connection()
		cur.execute("INSERT INTO log (log_type,log_id) values ('stop','"+uid+"')")
		conn.commit()
		cur.close()
		data = {'message': 'created', 'success':True}
		return jsonify(data)

	if request.method == 'POST':
		cur,conn=connection()
		cur.execute("INSERT INTO log (log_id,log_type) values ('"+uid+"','start')")
		conn.commit()
		cur.close()
		data = {'message': 'deleted', 'success':True}
		return jsonify(data)
	
@app.route('/api/logs/<id>',methods=['DELETE'])
def sql(id):
	if request.method == 'DELETE':
		cur,conn=connection()
		cur.execute("DELETE FROM log where log_id ='"+id+"'")
		conn.commit()
		cur.close()
		data = {'message': 'deleted', 'success':True}
		return jsonify(data)
	