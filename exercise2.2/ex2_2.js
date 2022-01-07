const N3 = require('n3');
const {DataFactory} = N3;
const {namedNode, literal, blankNode, quad} = DataFactory;
const http = require("http");

const quads = []; // Will contain all quads.
const id = namedNode('https://new-u.tech/gwen/#me');
const foaf = 'http://xmlns.com/foaf/0.1/';
const vl = 'https://data.vlaanderen.be/ns/persoon#';
const rdf = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';

main();

async function main() {
// Is a person
  quads.push(quad(
    id,
    namedNode(rdf + 'type'),
    namedNode(foaf + 'Person')
  ));

// First name
  quads.push(quad(
    id,
    namedNode(foaf + 'givenName'),
    literal('Gwendolyne')
  ));

// Family name
  quads.push(quad(
    id,
    namedNode(foaf + 'familyName'),
    literal('Stacy')
  ));

// Nickname
  quads.push(quad(
    id,
    namedNode(vl + 'alternatieveNaam'),
    literal('Gwen')
  ));

// Website
  quads.push(quad(
    id,
    namedNode(foaf + 'homepage'),
    namedNode('https://new-u.tech/gwen')
  ));

// Email
  quads.push(quad(
    id,
    namedNode(foaf + 'mbox'),
    literal('gwen@new-u.tech')
  ));

// Picture
  quads.push(quad(
    id,
    namedNode(foaf + 'img'),
    namedNode('https://static.wikia.nocookie.net/marveldatabase/images/e/e7/Symbiote_Spider-Man_Vol_1_1_Artgerm_Virgin_Variant.jpg/revision/latest/scale-to-width-down/856?cb=20190125221031')
  ));

// Organization
  const org = blankNode();

  quads.push(quad(
    org,
    namedNode(rdf + 'type'),
    namedNode(foaf + 'Organization')
  ));

// Member
  quads.push(quad(
    id,
    namedNode(foaf + 'member'),
    org
  ));

// Name
  quads.push(quad(
    org,
    namedNode(foaf + 'name'),
    literal('New U Technologies')
  ));

// Website
  quads.push(quad(
    org,
    namedNode(foaf + 'homepage'),
    namedNode('https://new-u.tech')
  ));

  const turtle = await getRDFasTurtle(quads);
  runServer(turtle);
}

function getRDFasTurtle(quads) {
  return new Promise(((resolve, reject) => {
    const writer = new N3.Writer({
      prefixes: {
        foaf: 'http://xmlns.com/foaf/0.1/',
        vl: 'https://data.vlaanderen.be/ns/persoon#'
      }
    });
    writer.addQuads(quads);
    writer.end((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }));
}

function runServer(turtle) {
  const host = 'localhost';
  const port = 8080;

  const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/turtle");
    res.writeHead(200);
    res.end(turtle);
  };

  const server = http.createServer(requestListener);
  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
}