/*Parse your solution of exercise 1.1 in JavaScript using the library jsonld.js and

Print an RDF representation of the JSON-LD data.
Extract organization information using a frame.
*/
import jsonld from 'jsonld';

const context = {
    "foaf": "http://xmlns.com/foaf/0.1/",
    "org": "http://www.w3.org/ns/org"
};

const doc = {
    "@id": "https://new-u.tech/gwen/#me",
    "@type": "foaf:Person",

    "foaf:name": "Gwendolyne",
    "foaf:lastName": "Stacy",
    "foaf:nick": "Gwen",
    "foaf:homepage": "https://new-u.tech/gwen",
    "foaf:email": "gwen@new-u.tech",
    "foaf:img": "image",
    "org:memberOf": {
        "@type": "org:Organization",
        "foaf:name": "New U Technologies",
        "foaf:homepage": "https://new-u.tech"
    }
};



const nquads =  await jsonld.toRDF(doc, {format: 'application/n-quads'});

console.log(nquads);
