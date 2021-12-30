import { isMobile } from 'react-device-detect';
import { NO_DEPICT_VALUES } from '../consts';

const getUserMediaSparlq = (data) => `
  SELECT ?file ?fileLabel ?thumb ?fileOrig ?encoding (GROUP_CONCAT(?depictID; separator = ';') AS ?depictIDs) (GROUP_CONCAT(?depictLabel; separator = ';') AS ?depictLabels)
  WITH {
    SELECT ?file ?fileLabel ?thumb ?fileOrig ?encoding WHERE {
      BIND('${data}' AS ?username) .
      ?file (p:P170/pq:P4174) ?username.
      
      ?file schema:contentUrl ?url .
      ?file schema:encodingFormat ?encoding .

      SERVICE wikibase:label {
        bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".
        ?file rdfs:label ?fileLabel.
      }

      bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)), "?width=${isMobile ? 100 : 200}")) AS ?thumb)
      bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)))) AS ?fileOrig)
    } LIMIT 1000
  } as %files
  
  WITH {
    SELECT ?file ?depict WHERE {
      INCLUDE %files .
      OPTIONAL { ?file wdt:P180 ?depict . }
      BIND(IF(BOUND(?depict), ?depict, "${NO_DEPICT_VALUES}") AS ?depict).
    }
  } AS %file_depicts
  
  WITH {
    SELECT ?file ?depict WHERE {
      INCLUDE %file_depicts .
    }
  } AS %top_file_depicts
  
  WITH {
    SELECT DISTINCT ?depict WHERE {
      INCLUDE %file_depicts .
    }
  } AS %distinct_depicts
  
  WITH {
    SELECT ?depict ?depictLabel ?depictID WHERE {
      INCLUDE %distinct_depicts .

      BIND(?depict as ?depictURL) .
      service wikibase:label {
        bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" .
        ?depictURL rdfs:label ?depictID .
      }

      service <https://query.wikidata.org/sparql> {
        service wikibase:label {
          bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".
          ?depict rdfs:label ?depictLabel.
        }
      }
    }
  } AS %depictLabels
  
  WHERE {
    INCLUDE %files .
    INCLUDE %top_file_depicts .
    INCLUDE %depictLabels .
  } GROUP BY ?file ?fileLabel ?thumb ?fileOrig ?encoding
`;

export default getUserMediaSparlq;
