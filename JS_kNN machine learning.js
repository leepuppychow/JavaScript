/* k-nearest neighbor machine learning tutorial:

http://burakkanber.com/blog/machine-learning-in-js-k-nearest-neighbor-part-1/

The problem here is given several features (number of rooms & area) can we classify a place as a:
flat, house, or apartment. 

HTML: 
        <canvas id="canvas" width=400 height=400></canvas>

CSS:

		 #canvas {
		            width:400px;
		            height:400px;
		            border:1px solid black;
		            display:block;
		            margin:20px auto;
		        }

*/

function Node(object){		// class to create an object for each node (new data point)
	for (var key in object){
		this[key] = object[key];
	}
};

function NodeList(k){		// class to contain all the data points (nodes)
	this.nodes = [];
	this.k = k;
};

NodeList.prototype.add = function(node){
	this.nodes.push(node);
}

NodeList.prototype.determineUnknown = function(){
	this.calculateRanges(); // first call up this method to determine max and min for our data set

	for (var i in this.nodes){
		if(! this.nodes[i].type){	// if the node is an unknown type, clone the nodes list and measure distances.

			/* clone nodes */
			this.nodes[i].neighbors = [];
			for (var j in this.nodes){
				if(! this.nodes[j].type)	// review this code 
					continue;
				this.nodes[i].neighbors.push(new Node(this.nodes[j]));
			}

			/* measure distances */
			this.nodes[i].measureDistances(this.areas, this.rooms);

			/* sort by distances */
			this.nodes[i].sortByDistance();

			/* Guess type */
			console.log(this.nodes[i].guessType(this.k));
		}
	}
}

NodeList.prototype.calculateRanges = function(){		//this method is used to normalize the graph
	this.areas = {min: 1000000, max: 0}
	this.rooms = {min: 1000000, max: 0}

	for (var i in this.nodes){
		if(this.nodes[i].rooms < this.rooms.min){		//it sees if the current node (data point)'s area and # of rooms is compared to 
			this.rooms.min = this.nodes[i].rooms;		//the max and min and then sets those maximum and minimum values
		}
		if(this.nodes[i].rooms > this.rooms.max){
			this.rooms.max = this.nodes[i].rooms;
		}
		if(this.nodes[i].area < this.areas.min){
			this.areas.min = this.nodes[i].area;
		}
		if(this.nodes[i].area > this.areas.max){
			this.areas.max = this.nodes[i].area;
		}
	}
}

Node.prototype.measureDistances = function(area_range_obj, rooms_range_obj){
	var rooms_range = rooms_range_obj.max - rooms_range_obj.min;
	var area_range = area_range_obj.max - area_range_obj.min;

	for(var i in this.neighbors){
		var delta_rooms = this.neighbors[i].rooms - this.rooms;
		delta_rooms = delta_rooms / rooms_range;
		var delta_area = this.neighbors[i].area - this.area;
		delta_area = delta_area / area_range;

		this.neighbors[i].distance = Math.sqrt(delta_rooms*delta_rooms + delta_area*delta_area);
	}
}

Node.prototype.sortByDistance = function (){
	this.neighbors.sort(function (a,b)){
		return a.distance - b.distance; 
	}
}

Node.prototype.guessType = function(k){
	var types = {};

	for (var i in this.neighbors.slice(0,k)){
		var neighbor = this.neighbors[i]; // this shortens the syntax

		if (! types[neighbor.type]){
			types[neighbor.type] = 0;
		}
		types[neighbor.type] += 1;
	}

	var guess = {type: false, count: 0};
	for (var type in types){
		if(types[type] > guess.count){
			guess.type = type;
			guess.count = types[type];
		}
	}

	this.guess = guess;

	return types; 
}

NodeList.prototype.draw = function(canvas_id) {  
    var rooms_range = this.rooms.max - this.rooms.min;
    var areas_range = this.areas.max - this.areas.min;

    var canvas = document.getElementById(canvas_id);
    var ctx = canvas.getContext("2d");
    var width = 400;
    var height = 400;
    ctx.clearRect(0,0,width, height);

    for (var i in this.nodes)
    {
        ctx.save();

        switch (this.nodes[i].type)
        {
            case 'apartment':
                ctx.fillStyle = 'red';
                break;
            case 'house':
                ctx.fillStyle = 'green';
                break;
            case 'flat':
                ctx.fillStyle = 'blue';
                break;
            default:
                ctx.fillStyle = '#666666';
        }

        var padding = 40;
        var x_shift_pct = (width  - padding) / width;
        var y_shift_pct = (height - padding) / height;

        var x = (this.nodes[i].rooms - this.rooms.min) * (width  / rooms_range) * x_shift_pct + (padding / 2);
        var y = (this.nodes[i].area  - this.areas.min) * (height / areas_range) * y_shift_pct + (padding / 2);
        y = Math.abs(y - height);


        ctx.translate(x, y);
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI*2, true);
        ctx.fill();
        ctx.closePath();


        /* 
         * Is this an unknown node? If so, draw the radius of influence
         */

        if ( ! this.nodes[i].type )
        {
            switch (this.nodes[i].guess.type)
            {
                case 'apartment':
                    ctx.strokeStyle = 'red';
                    break;
                case 'house':
                    ctx.strokeStyle = 'green';
                    break;
                case 'flat':
                    ctx.strokeStyle = 'blue';
                    break;
                default:
                    ctx.strokeStyle = '#666666';
            }

            var radius = this.nodes[i].neighbors[this.k - 1].distance * width;
            radius *= x_shift_pct;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI*2, true);
            ctx.stroke();
            ctx.closePath();

        }

        ctx.restore();

    }

};

var run = function() {  
    nodes = new NodeList(3);
    for (var i in data)
    {
        nodes.add( new Node(data[i]) );
    }
    var random_rooms = Math.round( Math.random() * 10 );
    var random_area = Math.round( Math.random() * 2000 );
    nodes.add( new Node({rooms: random_rooms, area: random_area, type: false}) );

    nodes.determineUnknown();
    nodes.draw("canvas");
};

window.onload = function() {  
    setInterval(run, 5000);
    run();
};


var data = [
    {rooms: 1, area: 350, type: 'apartment'},
    {rooms: 2, area: 300, type: 'apartment'},
    {rooms: 3, area: 300, type: 'apartment'},
    {rooms: 4, area: 250, type: 'apartment'},
    {rooms: 4, area: 500, type: 'apartment'},
    {rooms: 4, area: 400, type: 'apartment'},
    {rooms: 5, area: 450, type: 'apartment'},

    {rooms: 7,  area: 850,  type: 'house'},
    {rooms: 7,  area: 900,  type: 'house'},
    {rooms: 7,  area: 1200, type: 'house'},
    {rooms: 8,  area: 1500, type: 'house'},
    {rooms: 9,  area: 1300, type: 'house'},
    {rooms: 8,  area: 1240, type: 'house'},
    {rooms: 10, area: 1700, type: 'house'},
    {rooms: 9,  area: 1000, type: 'house'},

    {rooms: 1, area: 800,  type: 'flat'},
    {rooms: 3, area: 900,  type: 'flat'},
    {rooms: 2, area: 700,  type: 'flat'},
    {rooms: 1, area: 900,  type: 'flat'},
    {rooms: 2, area: 1150, type: 'flat'},
    {rooms: 1, area: 1000, type: 'flat'},
    {rooms: 2, area: 1200, type: 'flat'},
    {rooms: 1, area: 1300, type: 'flat'},
];





