var works = [ 
    {id: 2, title:"Aeneid", uri:"http://data.perseus.org/citations/urn:cts:latinLit:phi0690.phi003.perseus-lat1:1.1"},
    {id:4, title:"Georgicon", uri:"http://data.perseus.org/citations/urn:cts:latinLit:phi0690.phi002.perseus-lat1:1.1"},
    {id:6, first:"Ecloga", uri:"http://data.perseus.org/citations/urn:cts:latinLit:phi0690.phi001.perseus-lat1:1"}
];

var equals = function(field, val, obj) { return obj[field] == val };

var equalsId = equals.bind(undefined, "id");

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving work: ' + id);

    var found = works.filter(equalsId.bind(undefined, id))[0];
    res.send(found ? {work:found} : null);
};
 
exports.findAll = function(req, res) {
    res.send({ works : works });
};
 
exports.addWork = function(req, res) {
    var work = req.body.work;
    work.id = 1 + Math.max.apply(0, works.map(function(f){return f.id;}));
    console.log('Adding work: ' + JSON.stringify(work));
    works.push(work);
    res.send({work : work });
}
 
exports.updateWork = function(req, res) {
    var id = req.params.id;
    var work = req.body.work;
    console.log('Updating work: ' + id);
    console.log(JSON.stringify(work));
    var found = works.filter(equalsId.bind(undefined, id))[0];
    for (var k in work)
        found[k] = work[k];
    res.send({work : found});
}
 
exports.deleteWork = function(req, res) {
    var id = req.params.id;
    console.log('Deleting work: ' + id);
    var found = works.filter(equalsId.bind(undefined, id))[0];
    works.splice(works.indexOf(found),1);
    res.end();
}
