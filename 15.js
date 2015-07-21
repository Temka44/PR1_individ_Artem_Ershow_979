var arr = [], box, ei,ej;						
function swap(arr,i1,j1,i2,j2){	//функция которая будет менять местами два элемента массива с заданными индексами
	t = arr[i1][j1];
	arr[i1][j1] = arr[i2][j2];
	arr[i2][j2] = t;
}
window.onload = function() {				
	box = document.getElementById("box");
	newGame();				
	document.getElementById("reset").onclick = newGame;						
}
function cellClick(event) {
	var event = event || window.event,
		el = event.srcElement || event.target,

//получаем номер строки и столбца, на пересечении которых расположена ячейка

		i = el.id.charAt(0),
		j = el.id.charAt(2);
		//Если пустая ячейка расположена в одном стобце или строкес ячейкой, по которой кликнули, и расстояние между этими ячейками 1, то меняем их содержимое местами
	if((i == ei && Math.abs(j - ej) == 1) || (j == ej && Math.abs(i - ei) == 1)){					
		document.getElementById(ei + " " + ej).innerHTML = el.innerHTML;
		el.innerHTML = "";
		//	//Запоминаем положение пустой ячейки
		ei = i;
		ej = j;
		var q = true;
		////Проверяем не в выигрышной ли комбинации находятся ячейки
		for(i = 0; i < 4; ++i)
			for(j = 0; j < 4; ++j)
				if(i + j != 6 && document.getElementById(i + " " + j).innerHTML != i*4 + j + 1){
					q = false;
					break;
				}
				if(q) alert("Вы прошли игру!");
			}
}
function newGame(){  // Для хранения номеров будет использоваться массив. Забьём его по порядку числами от одного до пятнадцати, а значение последнего элемента установим равным пустой строке. 
	for(i = 0; i < 4; ++i){
		arr[i] = []
		for(j = 0; j < 4; ++j){
			if(i + j != 6)
				arr[i][j] = i*4 + j + 1;
			else
				arr[i][j] = "";
		}
	}  //код, который перемешивает кости
	ei = 3; //запоминает индекс элемента массива в котором записана пустая строка
	ej = 3;
	for(i = 0; i < 2015; ++i)
		switch(Math.round(3*Math.random())){ //рандомно выбираем число от 0 до 3
	/*
	 * 0 соответсвует верхней соседней костяшке, 1 - правой  и т.д.
	 *  обмен местами, например, с верхней костяшкой возможен
	 *  если "пустое место"не ноходится у верхней границы игрового поля.
	 *  Аналогично и для других соседних костяшек.
	 * При обмене изменяем переменные ei и ej.
	 */
			case 0: if(ei != 0) swap(arr,ei,ej,--ei,ej); break; // up
			case 1: if(ej != 3) swap(arr,ei,ej,ei, ++ej); break; // right
			case 2: if(ei != 3) swap(arr,ei,ej,++ei,ej); break; // down
			case 3: if(ej != 0) swap(arr,ei,ej,ei,--ej); // left
		}
	var table = document.createElement("table"),  //сформируем таблицу, в ячейках которой будут располагаться уже перемешанные элементы массива arr
		tbody = document.createElement("tbody");					
	table.appendChild(tbody);
	for(i = 0; i < 4; ++i){
		var row = document.createElement("tr");
		for(j = 0; j < 4; ++j){
			var cell = document.createElement("td");
				cell.id = i + " " + j;
				cell.onclick = cellClick;
				cell.innerHTML = arr[i][j];
				row.appendChild(cell);
		}
		tbody.appendChild(row);					
	}
	if(box.childNodes.length == 1)
		box.removeChild(box.firstChild);	
	box.appendChild(table);	
}
