import { isMobile } from 'react-device-detect';
import { SEPERATOR } from '../consts';

const getMediaSubclassSparlq = (mediaLimit, searchValue) => `
  SELECT DISTINCT ?item ?itemLabel ?file ?thumb ?fileOrig ?fileLabel ?encoding ?creator (GROUP_CONCAT(?depictID; separator = '${SEPERATOR}') AS ?depictIDs) (GROUP_CONCAT(?depictLabel; separator = '${SEPERATOR}') AS ?depictLabels) WITH { 
    SELECT ?item ?itemLabel WHERE {
      SERVICE <https://query.wikidata.org/sparql> {
        ?item wdt:P279 wd:${searchValue} .
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". ?item rdfs:label ?itemLabel . }
      }
    }
  } AS %Wikidataitems

  WITH {
    SELECT ?file ?thumb ?fileOrig ?fileLabel ?encoding ?creator {
      INCLUDE %Wikidataitems .
      ?file wdt:P180 ?item.
      ?file schema:contentUrl ?url .
      ?file schema:encodingFormat ?encoding .

      OPTIONAL {
        ?file p:P170/pq:P4174 ?creator .
      }

      SERVICE wikibase:label {
        bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".
        ?file rdfs:label ?fileLabel.
      }

      bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)), "?width=${isMobile ? 100 : 200}")) AS ?thumb)
      bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)))) AS ?fileOrig)
    } limit ${mediaLimit}
  } AS %files

  WITH {
    SELECT ?file ?depict WHERE {
      INCLUDE %files .
      ?file wdt:P180 ?depict .
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
          bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" .
          ?depict rdfs:label ?depictLabel .
        }
      }
    }
  } AS %depictLabels

  WHERE {
    INCLUDE %files .
    INCLUDE %top_file_depicts .
    INCLUDE %depictLabels .
  } GROUP BY ?item ?itemLabel ?file ?thumb ?fileOrig ?fileLabel ?encoding ?creator
`;

export default getMediaSubclassSparlq;
