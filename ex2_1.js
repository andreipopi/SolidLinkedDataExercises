
const N3 = require('n3');

const writer = new N3.Writer({ prefixes: { 
    foaf: 'http://xmlns.com/foaf/0.1/#',
    org: 'http://www.w3.org/ns/org' } 
    });
   
main();

async function main (){ 

    const { DataFactory } = N3;
    const { namedNode, literal, defaultGraph, quad } = DataFactory;

    writer.addQuad(namedNode("me"), namedNode("a"), namedNode("foaf:Person") );
    writer.addQuad(namedNode("me"), namedNode("foaf:name"), literal("Andrei Poopescu") );
    writer.addQuad(namedNode("me"), namedNode("org:memberOf"), namedNode("KNoWS") );
    writer.addQuad(namedNode("KNoWS"), namedNode("a"), namedNode("org:Organization") );
    writer.addQuad(namedNode("KNoWS"), namedNode("foaf:homepage"), namedNode("https://knows.idlab.ugent.be") );

    writer.end((error, result) => console.log(result));

}


