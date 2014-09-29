	// Jquery ready
	$(document).ready(function() {
	var total  = 0;
	var json;
	var isPicked = true;
	var loop = true;
	var picked = [];

	function menuPrices(selected) {
			price = parseFloat(selected.price);
			if (total + price > 8.75) {
				var warning= confirm("If you add this you will go over 8.75! OK to continue");
				if(warning === false) {
					total = total;
				}
				else {
					total += price;
					picked[picked.length] = selected.name;
				}
			}
			else if ((total + price) == 8.75) {
				alert("You've made $8.75! If you add anything else, you will use another meal or flex.");
				total += price;
				picked[picked.length] = selected.name;
			}
			else {
				total += price;
				picked[picked.length] = selected.name;
			}
			
			console.log(picked[picked.length - 1]);
			isPicked	= true;
			setList(picked);
			setTotal(total);
			updateList(picked);
			updateTotal(total);
			console.log(total);
	}
	function updateTotal(total) {
		document.getElementById("js").innerHTML = toCAD(total);
	}

	function toCAD(number) {
    var number = number.toString(), 
    dollars = number.split('.')[0], 
    cents = (number.split('.')[1] || '') +'00';
    dollars = dollars.split('').reverse().join('')
        .replace(/(\d{3}(?!$))/g, '$1,')
        .split('').reverse().join('');
    return '$' + dollars + '.' + cents.slice(0, 2);
	}
		
	$.ajax({                                      
      url: 'api.php',                  //the script to call to get data          
      data: "",                        //you can insert url argumnets here to pass to api.php
                                       //for example "id=5&parent=6"
      dataType: 'json',                //data format      
      success: function(data)          //on recieve of reply
      {
      	json = data;
      	window.json = json;
		for (var i = 0; i < json.length; i++) {
			if (json[i].category == 'Drink'){
				$("#drinks_list").append("<li class = \"odd\"> <a id = item" + i + ">" + json[i].name + "</a></li>");
				$("#drinks_list").append("<li class = \"odd\"> <a id = item" + i + ">" + json[i].name + ": $" + json[i].price + "</a></li>");
			}
			else if (json[i].category === 'Sandwich' || json[i].category === 'sandwiches'){
				$("#sandwiches_list").append("<li class = \"odd\"> <a id = item" + i + ">" + json[i].name + ": $" + json[i].price + "</a></li>");
			}
			else if (json[i].category === 'Breakfast'){
				$("#breakfast_list").append("<li class = \"odd\"> <a id = item" + i + ">" + json[i].name + ": $" + json[i].price + "</a></li>");
			}
		}
      } 
    });

	$.getJSON("prices.json", function(json) {
		window.json = json;
		for (var i = 0; i < json.length; i++) {
			if (json[i].category == 'drinks'){
				$("#drinks_list").append("<li class = \"odd\"> <a id = item" + i + ">" + json[i].name + "</a></li>");
			}
			else if (json[i].category === 'snacks' || json[i].category === 'sandwiches'){
				$("#sandwiches_list").append("<li class = \"odd\"> <a id = item" + i + ">" + json[i].name + "</a></li>");
			}
			else if (json[i].category === 'breakfast'){
				$("#drinks_list").append("<li class = \"odd\"> <a id = item" + i + ">" + json[i].name + "</a></li>");
			}
		}
	});

	$(document).on('click','a', function() {
			var json = window.json;
			var id = $(this).attr('id').slice(4);
			var selected = json[id];
	        menuPrices(selected);  
	    });
	});

	function updateList(list) {
		var updatedString = "";
		for (word in list){
			updatedString += list[word] + '<button onclick="deleteItem(' + word + ')">X</button>' + "<br>";
		}
		document.getElementById("list").innerHTML = updatedString;
	}

	function setList (list) {
		picked = list;
	}

	function getList(){
		return picked;
	}

	function setTotal(nTotal){
		total = nTotal;
	}

	function getTotal(){
		return total;
	}

	function updateTotalTwo(total) {
		document.getElementById("js").innerHTML = toCADTwo(total);
	}

	function toCADTwo(number) {
    var number = number.toString(), 
    dollars = number.split('.')[0], 
    cents = (number.split('.')[1] || '') +'00';
    dollars = dollars.split('').reverse().join('')
        .replace(/(\d{3}(?!$))/g, '$1,')
        .split('').reverse().join('');
    return '$' + dollars + '.' + cents.slice(0, 2);
	}

	function deleteItem(word){
		var array = getList();
		var netTotal = getTotal();
		var new_price = 0;

		for (index in json){
			if (array[word] === json[index].name){
				new_price = json[index].price;
			}
		}

		console.log("NetTotal " + netTotal);


		array.splice(word, 1);
		updateList(array);
		updateTotalTwo(total - new_price);
		setTotal(999);
		console.log("total " + total);
	}


