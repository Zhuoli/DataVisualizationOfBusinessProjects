//<script src="http://d3js.org/d3.v3.min.js"></script>

	var imported = document.createElement('script');
	imported.src = "http://d3js.org/d3.v3.min.js";
	document.head.appendChild(imported);
	
	var imported = document.createElement('script');
	imported.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js";
	document.head.appendChild(imported);
	
	var count=0
	var data=null
	var project="project1"
	function allowDrop(ev) {
		ev.preventDefault();
	}

	function drag(ev) {
		ev.dataTransfer.setData("Text", ev.target.id);
	}

	function drop(ev) {
		if(count<1){
			count +=1;
			ev.preventDefault();
			data = ev.dataTransfer.getData("Text");
			project=data;
			var lines=data.split("\n");
			ev.target.appendChild(document.getElementById(lines));
			drawGraph(data);
			writeReport(data);
			loadMembers(data);
		}else{
			
		}
	}
	function loadMembers(data){
		jQuery.get('http://localhost:8080/' + project + '/Names.txt', function(data) {
			var members=data.split(',');
			var container = document.getElementById("avators");
			for(var i=0;i<members.length;i++){
				var path="avatars/"+members[i]+".jpg";
				var image = new Image();
				image.src=path;
				image.width=100;
				image.width=100;
				container.appendChild(image);
			}
		});
	}



	function writeReport(label){
		try{
			jQuery.get('http://localhost:8080/' + project + '/report.txt', function(data) {
			lines=data.split('\n');
			
			var list=document.createElement('li');
			list.appendChild(document.createTextNode("Project Name: " + project));
			document.getElementById("report").appendChild(list)
			for(var i=0;i<lines.length;i++){
				var list=document.createElement('li');
				list.appendChild(document.createTextNode(lines[i]));
				document.getElementById("report").appendChild(list)
			}
		});
		}
		catch(err){
			alert(err.message);
		}
		
	} 
	function drawGraph(data){
		alert("Gonna Show: "+data);
		run();
	}
	function run(){
		document.getElementById("frameDiv").src="/" + project + "/graph.html"
		document.getElementById("frameNet").src="/" + project + "/email_networks.html"
	}