function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

window.onload = function() {
        //***Used for testing locally
        //var messagesGet = httpGet('http://localhost:3000/messages');
        //var infoGet = httpGet('http://localhost:3000/info');
        var messagesGet = httpGet('http://nhnfb.mybluemix.net/messages');
        var infoGet = httpGet('http://nhnfb.mybluemix.net/info');
        var messages = JSON.parse(messagesGet);
        
        //make div objects
        var key = 0;
        var toAdd = document.createDocumentFragment();
        for(key in messages.data){
           var key2 = 0;
           var holder = messages.data[key].message;
           //eliminate pictures since they show up blank
           if (undefined !== holder && holder.length > 1){
                   var div = document.createElement('div');
                   var title = document.createElement('h2');
                   var info = document.createElement('p');
                   var message = document.createElement('p');
                   div.className = 'blog-header';
                   title.className = 'blog-post-title';
                   info.className = 'blog-post-meta';
                   title.textContent = messages.data[key].from.name;
                   var date = new Date(messages.data[key].created_time);
                   info.textContent = date.toDateString();
                   message.textContent = messages.data[key].message;
                   div.appendChild(title);
                   div.appendChild(info);
                   div.appendChild(message);
                   
                   var comments = document.createElement('div');
                   comments.id = 'content' + key;
                   var commentButton = document.createElement('input');
                   commentButton.type = 'button';
                   commentButton.id = 'box' + key;
                   commentButton.value = 'Show/Hide Comments';
                   var commentData = messages.data[key].comments;
                   //loop through the list of comments
                   if (commentData && commentData.data){
                           for(key2 in commentData.data){
                                var commentInfo = document.createElement('p');
                                commentInfo.textContent = commentData.data[key2].from.name + ': ' + commentData.data[key2].message;  
                                comments.appendChild(commentInfo);
                           }
                      comments.style.display = 'none';
                      commentButton.style.background = 'rgba(0,0,255,0.3)';
                      //needed to make it equal to a function otherwise only the last comment box would show/hide
                      commentButton.onclick = (function(divCom) {
                        return function() {
                            if (divCom.style.display !== 'none') {
                                divCom.style.display = 'none';
                            }
                            else {
                                divCom.style.background = 'rgba(192,192,192,0.3)';
                                divCom.style.display = 'block';
                            }
                        };
                      })(comments);
                  div.appendChild(commentButton);
                  }                                 
                   div.appendChild(comments);
                   toAdd.appendChild(div);
           }
        }
        document.getElementById("update").insertBefore(toAdd, document.getElementById("update").childNodes[0]);
}