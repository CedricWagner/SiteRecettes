include docker.mk

.PHONY: test

DRUPAL_VER ?= 9
PHP_VER ?= 8.1

test:
	cd ./tests/$(DRUPAL_VER) && PHP_VER=$(PHP_VER) ./run.sh

openfolder:
	xdg-open .

openlocalurl:
	xdg-open http://site_recettes.docker.localhost:8000/ 

openstagingurl:
	xdg-open http://les-veganeries-de-dodo.cedric-wagner.fr/

reactdev:
	cd react_app && npm start

reacttest:
	cd react_app && npm run test
