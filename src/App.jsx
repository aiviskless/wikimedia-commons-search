import './App.css';
import React, { Children, useEffect, useState } from 'react';

class SPARQLQueryDispatcher {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  query(sparqlQuery) {
    const fullUrl = `${this.endpoint}?query=${encodeURIComponent(sparqlQuery)}`;
    const headers = { Accept: 'application/sparql-results+json' };

    return fetch(fullUrl, { headers }).then((body) => body.json());
  }
}

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const endpointUrl = 'https://wcqs-beta.wmflabs.org/sparql';
    const sparqlQuery = `#colors of roses
    #defaultView:ImageGrid
    
    prefix commons: <http://commons.wikimedia.org/wiki/Special:FilePath/>
    
    select ?colorName ?image with {
      select ?color (iri(replace(str(sample(?photo)), "^.*/", str(commons:))) as ?image) where {
        [a schema:ImageObject] schema:contentUrl ?photo;
                                p:P180 [
                                  ps:P180 wd:Q102231;
                                  pq:P462 ?color
                                ].
      }
      group by ?color
    } as %roses where {
      include %roses.
    
      service <https://query.wikidata.org/sparql> {
        service wikibase:label {
          bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".
          ?color rdfs:label ?colorName.
        }
      }
    }`;

    const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
    queryDispatcher.query(sparqlQuery)
      .then(({ results }) => setImages(results.bindings.map((bind) => bind.image.value)));
  }, []);

  return (
    <div className="App">
      {images.length ? (
        Children.toArray(images.map((img) => (
          <img
            src={img}
            alt=""
            style={{ width: 300, height: 'auto', margin: 10 }}
          />
        )))
      ) : <h1>No images</h1>}
    </div>
  );
}

export default App;
