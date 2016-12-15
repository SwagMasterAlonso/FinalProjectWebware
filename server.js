var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , port = 8080
  , s = require('string') //stringjs.com
  , qs = require('querystring')
var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url)
      switch( uri.pathname ) {
        case '/getStudent':
          getStudent(req, res)
          break
        case '/':
          sendFile(res, 'index.html', 'text/html')
          break
        case '/index.html':
          sendFile(res, 'index.html', 'text/html')
          break
        case '/admin.html':
          sendFile(res, 'admin.html', 'text/html')
          break
        case '/studentAdmin.html':
            sendFile(res, 'studentAdmin.html', 'text/html')
          break
        case '/Admin/script.js':
          sendFile(res, '/Admin/script.js', 'text/javascript')
          break
        case '/updateStudent':
          updateStudent(req, res)
          break
        case '/getStudentList':
          getStudentList(req, res)
          break
        case '/removeStudent':
          removeStudent(req, res)
          break
        case '/addStudent':
          addStudent(req, res)
          break
        case '/updateRequirements':
          updateRequirements(req, res)
          break
        case '/getRequirements':
          getRequirements(req, res)
          break
        case '/editRequirements':
          editRequirements(req, res)
          break
        case '/README.md':
          sendFile(res, 'README.md', 'text/markdown')
          break
        case '/style.css':
          sendFile(res, 'style.css', 'text/css')
          break
        case '/js/scripts.js':
          sendFile(res, 'scripts.js', 'text/javascript')
          break

	case '/node_modules/uvcharts/dist/uvcharts.js':
          sendFile(res, './node_modules/uvcharts/dist/uvcharts.js', 'text/javascript')
          break



        default:
          res.end('404 not found')
      }
})

server.listen(process.env.PORT || port)
console.log('listening on 8080')

function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html'

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })

}

function getRequirements(req, res) {
  var contentType = 'text/html'
  if(req.method == 'POST') {
    res.writeHead(405, {'Content-type': contentType})
    res.end("You need to use GET.")
  } else {
    var requirementList = fs.readFileSync('requirements.json');
    //console.log(requirementList)
    res.end(requirementList)
  }
}

function editRequirements(req, res) {
  var contentType = 'text/html'
  if(req.method == 'POST'){
    res.writeHead(200, {'Content-type': contentType})
    var body = ' ';
    req.on('data', function (data) {
      body+= data;
      if(body.length > 1e6) {
        req.connection.destroy();
      }
    })
    req.on('end', function (data) {
      //console.log(body);
      var fixedBody = body
      fixedBody = s(fixedBody).strip('editReqs=').s
      //console.log(fixedBody)
      fs.writeFileSync('requirements.json', fixedBody)
      res.end("OK")
    })
  } else {
    res.writeHead(405, {'Content-type': contentType})
    res.end("You need to use POST.")
  }
}

function updateRequirements(req, res) {
  var contentType = 'text/html'
  if(req.method == 'POST'){
    res.writeHead(200, {'Content-type': contentType})
    var body = ' ';
    req.on('data', function (data) {
      body+= data;
      if(body.length > 1e6) {
        req.connection.destroy();
      }
    });
      req.on('end', function() {
        // console.log(body);
        var fixedBody = body
        fixedBody = s(fixedBody).strip('newclass=').s
        // console.log(fixedBody)
        newReqs = JSON.parse(fixedBody)
        var requirementList = JSON.parse(fs.readFileSync('requirements.json'));
        for(var attribute in newReqs) {
          if(requirementList.hasOwnProperty(attribute)) {
            requirementList[attribute].total += newReqs[attribute].total
            newReqs[attribute].courses.forEach(function (classObject){
              requirementList[attribute].courses.push(classObject)
            })
          } else {
            requirementList[attribute] = {};
            requirementList[attribute].courses = []
            requirementList[attribute].total = newReqs[attribute].total
            newReqs[attribute].courses.forEach(function (classObject){
              requirementList[attribute].courses.push(classObject)
            })
          }
        }
        // console.log(JSON.stringify(requirementList))
        fs.writeFileSync('requirements.json', JSON.stringify(requirementList))
        res.end("OK")
      })
  } else {
    res.writeHead(405, {'Content-type': contentType})
    res.end("You need to use POST.")
  }
}

function addStudent(req, res) {
  var contentType = 'text/html'
  if(req.method == 'POST'){
    res.writeHead(200, {'Content-type': contentType})
    var studentObj = JSON.parse(fs.readFileSync('students.json'));
    var body = ' ';
    req.on('data', function (data) {
      body+= data;
      if(body.length > 1e6) {
        req.connection.destroy();
      }
    });
    req.on('end', function() {
      var bodyRep = s(body).replaceAll('&','\n').s;
      var bodyLines = s(bodyRep).lines();
      var cutBody = s(bodyLines[0]).strip('newStudent=').s
      var newStudent = JSON.parse(cutBody)
      for(attribute in newStudent) {
        studentObj[attribute] = newStudent[attribute]
      }
      fs.writeFileSync('students.json', JSON.stringify(studentObj))
      res.end("OK");
    })
  } else {
    res.writeHead(405, {'Content-type': contentType})
    res.end("You need to use POST.")
  }
}

function getStudentList(req, res) {
  //console.log("sent")
  var contentType = 'text/html'
  if(req.method == 'POST') {
    res.writeHead(405, {'Content-type': contentType})
    res.end("You need to use GET.")
  } else {
    res.writeHead(200, {'Content-type': contentType})
    var studentList = []
    var studentObj = JSON.parse(fs.readFileSync('students.json'));
    //console.log(studentObj)
    for (var attribute in studentObj) {
      studentList.push(attribute)
    }
    var studentListObj = {"list" : studentList}
    res.end(JSON.stringify(studentListObj))
  }
}

function removeStudent(req, res) {
  var contentType = 'text/html'
  if(req.method == 'GET') {
    res.writeHead(405, {'Content-type': contentType})
    res.end("You need to use POST.")
  } else {
    res.writeHead(200, {'Content-type': contentType})
    var studentObj = JSON.parse(fs.readFileSync('students.json'));
    var body = ' ';
    req.on('data', function (data) {
      body+= data;
      if(body.length > 1e6) {
        req.connection.destroy();
      }
    });
      req.on('end', function() {
        var fixedBody = body
        var studentID = s(fixedBody).strip('studentID=').s
        studentID = s(studentID).trimLeft().s;
        delete studentObj[studentID]
        fs.writeFileSync('students.json', JSON.stringify(studentObj))
        var studentList = []
        for (var attribute in studentObj) {
          studentList.push(attribute)
        }
        var studentListObj = {"list" : studentList}
        res.end(JSON.stringify(studentListObj))
        })
  }
}

function getStudent(req, res) {
var contentType = 'text/html'
if(req.method == 'POST'){
  res.writeHead(200, {'Content-type': contentType})
  var body = ' ';
  req.on('data', function (data) {
    body+= data;
    if(body.length > 1e6) {
      req.connection.destroy();
    }
  });
  req.on('end', function() {
    // console.log(body)
    var fixedBody = body
    var studentID = s(fixedBody).strip('studentID=').s
    studentID = s(studentID).trimLeft().s;
    // console.log(studentID)
    var studentList = JSON.parse(fs.readFileSync('students.json'));
    console.log(JSON.stringify(studentList))
    if(studentList.hasOwnProperty(studentID)) {
      var student = JSON.stringify(studentList[studentID])
      res.end('found=true&student=' + student)
    } else {
      res.end('found=false&student=\'\'')
    }


  })
} else {
  res.writeHead(405, {'Content-type': contentType})
  res.end("You need to use POST.")
}
}
