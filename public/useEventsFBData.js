function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

window.onload = function() {
        var eventsGet = httpGet('/events');
        var infoGet = httpGet('/info');
        var info = JSON.parse(infoGet);
        var events = JSON.parse(eventsGet);
        
        //make div objects
        var key = 0;
        var toAdd = document.createDocumentFragment();
        events.data.reverse();
        for(key in events.data){
           var holder = events.data[key].name;
           //eliminate blank event names from showing up
           if (undefined !== holder && holder.length > 1){
           //title = name of event; info = location and time; message = description
                   var div = document.createElement('div');
                   var title = document.createElement('h2');
                   var info = document.createElement('p');
                   var message = document.createElement('p');
                   div.className = 'blog-header';
                   title.className = 'blog-post-title';
                   info.className = 'blog-post-meta';
                   title.textContent = events.data[key].name;
                   var timeCheck = events.data[key].start_time
                   var date = new Date(timeCheck);
                   var currentDate = new Date();
                   //only show current/upcoming events
                   if (Number(date) >= Number(currentDate)){
                           var location = events.data[key].location;
                           var owner = events.data[key].owner.name;
                           if (timeCheck.indexOf(':') === -1) {
                                info.textContent = 'By: ' + owner + ' at: ' + location + ' on ' + date.toDateString();
                           } else {
                                info.textContent = 'By: ' + owner + ' at: ' + location + ' on ' + date.toDateString() + ' at ' + date.toTimeString().split(' ')[0] + ' EST';
                           }
                           message.textContent = events.data[key].description;
                           message.style.display = 'none';
                           div.appendChild(title);
                           div.appendChild(info);
                           
                           var eventButton = document.createElement('input');
                           eventButton.type = 'button';
                           eventButton.value = 'Show/Hide Description';
                           eventButton.style.background = 'rgba(0,0,255,0.3)';
                              //needed to make it equal to a function otherwise only the last description box would show/hide
                              eventButton.onclick = (function(divCom) {
                                return function() {
                                    if (divCom.style.display !== 'none') {
                                        divCom.style.display = 'none';
                                        divCom.style.background = 'rgba(0,0,255,0.3)';
                                    }
                                    else {
                                        divCom.style.display = 'block';
                                        divCom.style.background = 'rgba(192,192,192,0.3)';
                                    }
                                };
                              })(message);
                          div.appendChild(eventButton);                   
                          div.appendChild(message);
                          toAdd.appendChild(div);
                  }
           }
        }
        document.getElementById("eventsDiv").insertBefore(toAdd, document.getElementById("eventsDiv").childNodes[0]);
}