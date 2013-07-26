var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('pokemondb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'pokemondb' database");
        db.collection('pokemons', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'pokemons' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }						
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving pokemon: ' + id);
    db.collection('pokemons', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('pokemons', function(err, collection) {				
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addPokemon = function(req, res) {
    var pokemon = req.body;
    console.log('Adding pokemon: ' + JSON.stringify(pokemon));
    db.collection('pokemons', function(err, collection) {
        collection.insert(pokemon, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updatePokemon = function(req, res) {
    var id = req.params.id;
    var pokemon = req.body;
    delete pokemon._id;
    console.log('Updating pokemon: ' + id);
    console.log(JSON.stringify(pokemon));
    db.collection('pokemons', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, pokemon, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating pokemon: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(pokemon);
            }
        });
    });
}

exports.deletePokemon = function(req, res) {
    var id = req.params.id;
    console.log('Deleting pokemon: ' + id);
    db.collection('pokemons', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var pokemons = [
    {
        name: "Pikachu",
        level: "12"        
    },
    {
        name: "Raichu",
        level: "24"      
    },
		{
        name: "Ponyta",
        level: "12"        
    },
    {
        name: "Galopa",
        level: "22"      
    }];

    db.collection('pokemons', function(err, collection) {
        collection.insert(pokemons, {safe:true}, function(err, result) {});
    });

};