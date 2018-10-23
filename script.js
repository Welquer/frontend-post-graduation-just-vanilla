function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = window[elmnt.getAttribute("include-html")];
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};

var getParams = function (url) {
  var params = {};
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};


function submitForm() {
  console.log('hey');
}
// Get parameters from the current URL
var page = getParams(window.location.href).page;
if (page) {
  if (page === 'faq') {
    page = 'faq.html';
  } else {
    page = 'skeleton.html';
  }
} else {
  page = 'login.html';
}

var subpage = getParams(window.location.href).page;
function setCurrentPage() {
  setTimeout(() => {
    document.querySelectorAll('.menu-item-selected').forEach((element) => {
      element.classList.remove('menu-item-selected');
    });
    switch (subpage) {
      case 'captura-problema':
        document.getElementById('info-uc').textContent = 'Captura Problema';
        document.getElementById('menu-captura-problema').classList.add('menu-item-selected');
        break;
      case 'consulta-problema':
        document.getElementById('info-uc').textContent = 'Consulta Problema';
        document.getElementById('menu-consulta-problema').classList.add('menu-item-selected');
        break;
    }
  }, 300);
}
setCurrentPage();

function previewFile(){
  var preview = document.getElementById('img-preview'); //selects the query named img
  var file    = document.querySelector('input[type=file]').files[0]; //sames as here
  var reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file); //reads the data as a URL
  } else {
    preview.src = "";
  }
}

// setTimeout(() => {
//   previewFile();  //calls the function named previewFile()
// }, 1000);
