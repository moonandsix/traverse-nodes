var btns=document.getElementsByTagName("button"),
depthTr=btns[0],spanTr=btns[1],depthSea=btns[2],spanSea=btns[3];
var input=document.getElementsByTagName("input")[0];
var c1=document.getElementsByClassName("c1")[0];
var c2=document.getElementsByClassName("c2")[1];
var c3=document.getElementsByClassName("c3")[1];
var select=document.getElementsByTagName("select")[0];
var del=document.getElementById("delete");
var ad=document.getElementById("add");
var addtext=document.getElementById("addtext");
var nodeList=[];
var timer=null;
function dT(){
	reset();
	depthTraversal(c1);
	console.log(nodeList)
	rendertraversal(nodeList);
	
}
function sT(){
	reset();
	spanTraversal(c1);
	rendertraversal(nodeList);
}
function dS(){
	reset();
	depthTraversal(c1);
	console.log(nodeList)
	rendersearch(nodeList);
}
function sS(){
	reset();
	spanTraversal(c1);
	rendersearch(nodeList);
}

function depthTraversal(node){
	if (node!=null)
	{
		nodeList.push(node);
		for (var i=0;i<node.children.length;i++)
		{
			depthTraversal(node.children[i])
		}
	}
	 
}

function spanTraversal(node) 
{
	var arr=[];
    arr.push(node);
    while (arr.length>0) 
	{
        node=arr.shift();
        nodeList.push(node);
        if (node.children.length>0) 
		{
            for (var i=0;i<node.children.length;i++) 
			{
                arr.push(node.children[i]);
            }
        }
    }
} 

function rendertraversal(){
	var i=0;
	nodeList[0].style.background="red";
	timer=setInterval(function(){
		i++;
		if (i<nodeList.length)
		{
			nodeList[i-1].style.background="white";
			nodeList[i].style.background="red";
			
		}else{
			clearInterval(timer);
			nodeList[i-1].style.background="white";
		}
	},select.value);	
}

function rendersearch(){
	var value=input.value;
	var i=0;
	var flag = 0;
	nodeList[0].style.background="red";
	if (nodeList[i].firstChild.nodeValue == value) {  
        nodeList[i].style.background = 'blue';  
        flag = 1;  
    } 
	timer=setInterval(function(){
		i++;
		if (i<nodeList.length)
		{
			/*nodeList[i-1].style.background="white";
			nodeList[i].style.background="yellow";*///原代码
			if (nodeList[i - 1].firstChild.nodeValue.trim() != value)
			{	
                nodeList[i - 1].style.background = 'white';
			}
			nodeList[i].style.background = 'red'; 
            if (nodeList[i].firstChild.nodeValue.trim() == value)
			{  
                nodeList[i].style.background = 'blue';  
                flag = 1;  
            }  
		}else{
			/*clearInterval(timer);
			nodeList[i-1].style.background="white";*///原代码
			nodeList[ nodeList.length - 1].style.background = 'white';  
            if (flag == 0)
			{
                alert("Not found!");
			}
            clearInterval(timer);  
            return;  
		}
	},select.value);
	console.log(select.value);

	
}

function reset(){
	clearInterval(timer);
	for (var i=0;i<nodeList.length;i++)
	{
		nodeList[i].style.background="white";
	}
	nodeList=[];
}

window.onload=function(){
	depthTr.addEventListener("click",function(){
		dT();
	})
	spanTr.addEventListener("click",function(){
		sT();
	})
	depthSea.addEventListener("click",function(){
		dS();
	})
	spanSea.addEventListener("click",function(){
		sS();
	})
	c1.addEventListener("click",function(event){
		stylewhole(event);
	})
	del.addEventListener("click",function(){
		dele();
	})
	ad.addEventListener("click",function(){
		add();
	})

}
var eventbox;
function stylewhole(event){
	depthTraversal(c1);
	for (var r=0;r<nodeList.length;r++)
	{
		if (event.target==nodeList[r])
		{
			event.target.style.background="yellow";
			eventbox=event.target;
		}else{
			nodeList[r].style.background="white";
		}
	}
	nodeList=[];
}

function dele(){
	eventbox.parentNode.removeChild(eventbox);
}

function add(){
	var div=document.createElement("div");
	div.innerHTML=addtext.value;
	div.setAttribute("class","c5");
	eventbox.appendChild(div);
}