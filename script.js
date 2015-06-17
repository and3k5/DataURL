// File upload
var inputFile = document.querySelector("input[type=file]"); {
    inputFile.onchange = function (e) {
        try {
            e.stopPropagation();
            e.preventDefault();
            
            var files = e.target.files;
            
            for (var i=0;i<files.length;i++) {
                GetFile(files[i]);
            }
            
            
            return false;
        }
        catch (e) {
            console.error(e);
        }
    };
}

// Drag and drop feature
var element = document.body; {
    element.draggable = false;
    element.ondragover = function (e) {
        e.preventDefault();
        return false;
    };
    element.ondragleave = element.ondragend = function (e) {
        return false;
    };
    element.ondrop = function (e) {
        try {
            e.preventDefault();
            
            var files = e.dataTransfer.files;
            
            for (var i=0;i<files.length;i++) {
                GetFile(files[i]);
            }
            
            
            return false;
        }
        catch (e) {
            console.error(e);
        }
    }
}

function fileReaderLoad(e,inStorage) {
    var wrap = document.createElement("div");
    wrap.classList.add("filerow");
    if (e.target.result.indexOf("image/")===5) {
        // image
        var img=wrap.appendChild(document.createElement("div"));
        img.classList.add("img");
        img.style.backgroundImage="url('"+e.target.result+"')";
    }else if (e.target.result.indexOf("audio/")===5) {
        // audio
        var aud = wrap.appendChild(new Audio());
        aud.setAttribute("controls","true");
        aud.classList.add("col1");
        aud.src = e.target.result;
    }else{
        var fill=wrap.appendChild(document.createElement("div"));
        fill.classList.add("fill");
    }
    
    var info=wrap.appendChild(document.createElement("div"));
    var link = info.appendChild(document.createElement("a"));
        link.textContent="direct link";
        link.href=e.target.result;
    
    info.appendChild(document.createElement("br"));
    
    document.querySelector(".preview").appendChild(wrap);
    
    if (sessionStorage && !inStorage) {
        sessionStorage["file_"+Date.now().toString(36)]=e.target.result;
    }
    
}

function GetFile(f) {
    var fileReader = new FileReader();
    fileReader.onload = fileReaderLoad;
    fileReader.readAsDataURL(f);
}

document.querySelector("#clearBtn").addEventListener("click",function () {
    document.querySelector(".preview").innerHTML="";
    if (sessionStorage) {
        for (var i in sessionStorage) {
            if (i.indexOf("file_")===0) {
                sessionStorage.removeItem(i);
            }
        }
    }
})

window.addEventListener("load",function () {
    if (sessionStorage) {
        for (var i in sessionStorage) {
            if (i.indexOf("file_")===0) {
                // Show the previous loaded files.
                // Might not be the smartest way to do this.
                fileReaderLoad({target:{result:sessionStorage[i]}},true);
            }
        }
    }
});
