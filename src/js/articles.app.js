var articlesApp = (function() {

    function viewArticles(){
  
      let uri = `${window.location.origin}/api/articles`;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', uri);
  
      xhr.setRequestHeader(
        'Content-Type',
        'application/json; charset=UTF-8'
      );
  
      xhr.send();
  
      xhr.onload = function(){
        let app = document.getElementById('app');
        let data = JSON.parse(xhr.response);
        let articles = data.articles;
        let table = '';
        let rows = '';
  
        //Loop each article record into it's own HTML table row, each article should
        //have a link a article view
        for (let i=0; i<articles.length; i++) {
          rows = rows + `<tr>
            <td>
              <a href="#view-${articles[i]['slug']}">${articles[i]['title']}</a>
            </td>
            <td>${articles[i]['description']}</td>
            <td>${articles[i]['keywords']}</td>
            <td>${articles[i]['body']}</td>
            <td>${articles[i]['published']}</td>
            <td>${articles[i]['created']}</td>
            <td>${articles[i]['modified']}</td>

          </tr>`;
        }
  
        //Create a articles panel, add a table to the panel, inject the rows into the
        //table
        table = `<div class="card">
          <div class="card-header clearfix">
            <h2 class="h3 float-left">Articles</h2>
            <div class="float-right">
              <a href="#create" class="btn btn-primary">New Article</a>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <td>Title</td>
                  <td>Dsescription</td>
                  <td>Published</td>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>`;
  
        //Append the HTML to the #app
        app.innerHTML = table;
      }
    }

    function createArticle() {
        var app = document.getElementById('app');
    
        var form = `
        <div class="card">
            <div class="card-header clearfix">
            <h2 class="h3 float-left">Create a New Article</h2>
            <div class="float-right">
                <a href="#" class="btn btn-primary">Cancel</a>
            </div>
            </div>
            <div class="card-body">
            <form id="createArticle" class="card-body">
                <div id="formMsg" class="alert alert-danger text-center">Your form has errors</div>
    
                <div class="row">
                <div class="form-group col-md-6">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" class="form-control" required>
                </div>
    
                <div class="form-group col-md-6">
                    <label for="description">Description</label>
                    <input type="text" id="description" name="description" class="form-control" required>
                </div>
                </div>    
                <div class="text-right">
                <input type="submit" value="Submit" class="btn btn-lg btn-primary btn-sm-block">
                </div>
            </form>
            </div>
        </div>
    `;
    
        app.innerHTML = form;
    }

    function viewArticle(slug) {

        let uri = `${window.location.origin}/api/articles/${slug}`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', uri);
    
        xhr.setRequestHeader(
          'Content-Type',
          'application/json; charset=UTF-8'
        );
    
        xhr.send();
    
        xhr.onload = function () {
          let app = document.getElementById('app');
          let data = JSON.parse(xhr.response);
          let card = '';
    
          card = `<div class="card">
        <div class="card-header clearfix">
            <h2 class="h3 float-left">${data.article.title}</h2>
            <div class="float-right">
            <a href="#edit-${data.article.slug}" class="btn btn-primary">Edit</a>
            </div>
        </div>
        <div class="card-body">
            <div>${data.article.description}</div>
        </div>
        </div>`;
    
          app.innerHTML = card;
        }
    }
    
    function processRequest(formId, url, method) {
        let form = document.getElementById(formId);
        form.addEventListener('submit', function (e) {
          e.preventDefault();
    
          let formData = new FormData(form);
          let uri = `${window.location.origin}${url}`;
          let xhr = new XMLHttpRequest();
          xhr.open(method, uri);
    
          xhr.setRequestHeader(
            'Content-Type',
            'application/json; charset=UTF-8'
          );
    
          let object = {};
          formData.forEach(function (value, key) {
            object[key] = value;
          });
    
          xhr.send(JSON.stringify(object));
          xhr.onload = function () {
            let data = JSON.parse(xhr.response);
            if (data.success === true) {
              window.location.href = '/';
            } else {
              document.getElementById('formMsg').style.display = 'block';
            }
          }
        });
    }
    
    return {
        load: function(){
          let hash = window.location.hash;
          let hashArray = hash.split('-');
    
          switch(hashArray[0]){
            case '#create':
              createArticle();
              processRequest('createArticle', '/api/articles', 'POST');

              break;
    
            case '#view':
            viewArticle(hashArray[1]);
            break;
    
            case '#edit':
              console.log('EDIT');
              break;
    
            case '#delete':
              console.log('DELETE');
              break;
    
            default:
              viewArticles();
              break;
          }
        }
    }
      
  })();
  
  articlesApp.load();

  window.addEventListener("hashchange", function(){
    articlesApp.load();
  });