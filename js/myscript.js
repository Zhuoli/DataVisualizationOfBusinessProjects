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
				img=document.createElement("IMG");
				img.src=path;
				img.id=members[i];			
				
				var li=document.createElement("li");
				li.appendChild(img);
				
				// <div>
				var div=document.createElement("div");
				div.style.opacity=1;
				div.style.display="none";
				div.setAttribute('class','portfolio-info-panel');
				
				var h=document.createElement("H2");
				var t = document.createTextNode(img.id);
				h.appendChild(t);
				div.appendChild(h);
				
				var rect=document.createElement("IMG");
				rect.src="avatars/"+members[i]+".png";
				rect.width=2000;
				rect.height=50;
				div.appendChild(rect);
				//</div>
				
				li.appendChild(div);
				container.appendChild(li);
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
		run();
	}
	function run(){
		document.getElementById("frameDiv").src="/" + project + "/graph.html"
		document.getElementById("frameNet").src="/" + project + "/email_networks.html"
	}

