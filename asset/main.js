window.onload = init();

var newHeight;

function init(){
    creatDiv();
}

document.querySelector('#update').addEventListener('click',()=>{
    upDate();
});

function creatDiv(){
    var fatherNode = document.querySelector('#content-div');
    var WinHeight = parseInt(window.screen.height);
    var updateHeight = parseInt(getComputedStyle(document.querySelector('#update'),null)['height']);
    var headerHeight = parseInt(getComputedStyle(document.querySelector('#header'),null)['height']);
    var oldHeight = WinHeight -updateHeight - headerHeight;
    var newHeight = oldHeight;
    console.log('newHeight='+newHeight);

    while (newHeight>0){
        var div = document.createElement('div');
        var p = document.createElement('p');
        div.className = 'content-box';   
        fatherNode.appendChild(div);
        div.appendChild(p);
        getAPI(p);

        var fatherNodeHeight = fatherNode.clientHeight;
        console.log('fatherNodeHeight='+fatherNodeHeight);

        newHeight = oldHeight - fatherNodeHeight;
        console.log('newHeight='+newHeight);
        if (newHeight<0){
            var lastNode = fatherNode.lastChild;
            fatherNode.removeChild(lastNode);
            break;
        }
    }
}

// function getDiv(){
//     var BoxArr = document.querySelectorAll('#content-div>.content-box');
//     for (let box of BoxArr){
//         getAPI(box);
//     }    
// }

function getAPI(div){
    fetch("https://cn1.api.wfblog.net/163.comment.php")
    .then(res => res.json())
    .then(res => div.innerText=`${res.data.comment}————歌名：《${res.data.song}》`);
}

function upDate(){
    getDiv();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}